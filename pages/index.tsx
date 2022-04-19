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
import { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import Card from 'models/Card';
import { GetServerSideProps } from 'next/types';

const Title = styled(Text)`
  font-family: 'Lobster';
  font-size: 40px;
`;

interface HomeProps {
  cards: Array<Card>;
}

const Home = ({ cards }: HomeProps) => {
  const [currentCards, setCurrentCards] = useState<Array<Card>>(cards);

  useEffect(() => {
    setCurrentCards(cards);
    console.log('hola', cards);
  }, [cards]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
  };

  if (!currentCards) return <>b</>;

  return (
    <>
      <Title>Cards</Title>
      <Input onChange={onSearch} placeholder="Search" />
      <InfiniteScroll data={currentCards} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {};

export default Home;
