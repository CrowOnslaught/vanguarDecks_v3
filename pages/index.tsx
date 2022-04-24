import styled from '@emotion/styled';
import { withIronSessionSsr } from "iron-session/next";
import { Text, theme } from '@chakra-ui/react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import InfiniteScroll from 'components/layout/InfiniteScroll';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '@chakra-ui/react';
import Card from 'models/Card';
import { GetServerSideProps } from 'next/types';
import { useRouter } from 'next/router';
import { session } from 'lib/apiCards/session';
import { getCards } from 'lib/apiCards/services';


const Title = styled(Text)`
  font-family: 'Lobster';
  font-size: 40px;
`;

interface HomeProps {
  cards: Array<Card>;
}

const HomeInfiniteScroll = styled(InfiniteScroll)`
  margin-top: ${theme.space[4]};
`;

const Home = ({ cards }: HomeProps) => {
  const router = useRouter();
  const [currentCards, setCurrentCards] = useState<Array<Card>>(cards);

  useMemo(() => {
    setCurrentCards(oldArray => [...oldArray, ...currentCards]);
  }, [cards]);

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

  if (!currentCards) return <>No cards displayed</>;

  return (
    <>
      <Title>Cards</Title>
      <Input onChange={onSearch} placeholder="Search" />
      <HomeInfiniteScroll
        data={currentCards}
        filters={{}}
        nextPage={nextPage}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  const { token } = await session(req.session);
  const cards = await getCards(token.token);

  return {
    props: {
      cards: cards.results,
    },
  };
}, {
  cookieName: "varnguardecks_session",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
},)

export default Home;
