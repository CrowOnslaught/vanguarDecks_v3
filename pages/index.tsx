import styled from "@emotion/styled";
import { Box, Heading, Input, InputGroup, theme } from "@chakra-ui/react";
import InfiniteScroll from "components/layout/InfiniteScroll";
import { useMemo, useState } from "react";
import { InputLeftElement } from "@chakra-ui/react";
import Card from "models/Card";
import { GetServerSideProps } from "next/types";
import { getCards, searchCards, getTypes, getClans } from "services/apiCards";
import { withAuth } from "lib/withAuth";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";

interface HomeProps {
  cards: Array<Card>;
  page: number;
  hasNextPage?: boolean;
  totalDocs: number;
  types: string[];
  clans: string[];
}

const HomeInfiniteScroll = styled(InfiniteScroll)`
  margin-top: ${theme.space[4]};
  overflow: hidden;
`;

const Home = ({
  cards,
  page,
  hasNextPage,
  totalDocs,
  types,
  clans,
}: HomeProps) => {
  const router = useRouter();
  const [currentCards, setCurrentCards] = useState<Array<Card>>([]);
  const filters = router.query;

  useMemo(() => {
    setCurrentCards(oldArray => [...oldArray, ...cards]);
  }, [cards]);

  const nextPage = () => {
    if (hasNextPage) {
      router.push(
        {
          query: {
            ...router.query,
            page: page + 1,
          },
        },
        undefined,
        { scroll: false }
      );
    }
  };

  const setFilter = (key: string, value: string) => {
    setCurrentCards([]);

    router.push(
      {
        query: {
          ...router.query,
          [key]: value,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentCards([]);
    router.push(`/?search=${value}`);
  };

  if (!currentCards) return <>No cards displayed</>;

  return (
    <>
      <Heading size="2xl">Cards</Heading>
      <Heading>{totalDocs} results</Heading>
      <Box py="4">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<SearchIcon color="gray.300" />}
          />
          <Input onChange={onSearch} placeholder="Search..." />
        </InputGroup>
      </Box>

      <HomeInfiniteScroll
        data={currentCards}
        filters={filters}
        types={types}
        clans={clans}
        setFilter={setFilter}
        nextPage={nextPage}
        hasMore={hasNextPage}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ req, query }, session) => {
    try {
      let cards;

      if (query.search) {
        cards = await searchCards(session.access.token, query);
      } else {
        cards = await getCards(session.access.token, query);
      }
      const clans = await getClans(session.access.token);
      const types = await getTypes(session.access.token);

      return {
        props: {
          cards: cards.docs,
          clans,
          types,
          page: cards.page,
          hasNextPage: cards.hasNextPage,
          totalDocs: cards.totalDocs,
        },
      };
    } catch (err) {
      console.log(err);
      await req.session.destroy();
      return await {
        redirect: {
          destination: "/",
          statusCode: 302,
        },
      };
    }
  }
);

export default Home;
