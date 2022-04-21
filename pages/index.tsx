import styled from '@emotion/styled';
import { Text } from '@chakra-ui/react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import useCards from 'services/useCards';
import InfiniteScroll from 'components/layout/InfiniteScroll';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '@chakra-ui/react';
import Card from 'models/Card';
import { GetServerSideProps } from 'next/types';
import { useRouter } from 'next/router';

const Title = styled(Text)`
  font-family: 'Lobster';
  font-size: 40px;
`;

interface HomeProps {
  cards: Array<Card>;
}

const Home = ({ cards }: HomeProps) => {
  const router = useRouter();
  const [currentCards, setCurrentCards] = useState<Array<Card>>(cards);

  useMemo(() => {
    setCurrentCards(oldArray => [...oldArray, ...currentCards]);
  }, [currentCards]);

  const nextPage = () => {
    if (!router.query.page) {
      return router.push(`/?page=2`);
    }

    router.push(
      `/?page=${parseInt(String(router.query.page)) + 1}`,
      undefined,
      {
        scroll: false,
      }
    );
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
  };

  if (!currentCards) return <>b</>;

  return (
    <>
      <Title>Cards</Title>
      <Input onChange={onSearch} placeholder="Search" />
      <InfiniteScroll data={currentCards} filters={{}} nextPage={nextPage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const cards = await fetch(
    `http://localhost:3000/api/cards?page=${query.page || 1}`
  );
  const cardsJson = await cards.json();

  if (query.page) {
    return {
      props: {
        cards: cardsJson,
      },
    };
  }

  return {
    props: {
      cards: cardsJson,
    },
  };
};

export default Home;
