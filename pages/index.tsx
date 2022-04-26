import styled from "@emotion/styled";
import { withIronSessionSsr } from "iron-session/next";
import { Heading, theme } from "@chakra-ui/react";
import InfiniteScroll from "components/layout/InfiniteScroll";
import { useMemo, useState } from "react";
import { Input } from "@chakra-ui/react";
import Card from "models/Card";
import { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import { getCards } from "services/apiCards";
import { getSession } from "helpers/getSession";
import { sessionConfig } from "config/sessionConfig";

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
      <Heading size="2xl">Cards</Heading>
      <Input onChange={onSearch} placeholder="Search" />
      <HomeInfiniteScroll
        data={currentCards}
        filters={{}}
        nextPage={nextPage}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, resolvedUrl }) => {
    const tokens = getSession(req, res, resolvedUrl);
    const cards = await getCards(tokens?.access.token || "");

    return {
      props: {
        cards: cards.results,
      },
    };
  },
  sessionConfig
);

export default Home;
