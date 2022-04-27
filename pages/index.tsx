import styled from "@emotion/styled";
import { Text, theme } from "@chakra-ui/react";
import InfiniteScroll from "components/layout/InfiniteScroll";
import { useMemo, useState } from "react";
import { Input } from "@chakra-ui/react";
import Card from "models/Card";
import { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import { getCards } from "services/apiCards";
import { withAuth } from "lib/withAuth";

const Title = styled(Text)`
  font-family: "Lobster";
  font-size: 40px;
`;

interface HomeProps {
  cards: Array<Card>;
}

const HomeInfiniteScroll = styled(InfiniteScroll)`
  margin-top: ${theme.space[4]};
  overflow: hidden;
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

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ req, res, resolvedUrl }, session) => {
    const cards = await getCards(session.access.token);

    return {
      props: {
        cards: cards.results,
      },
    };
  }
);

export default Home;
