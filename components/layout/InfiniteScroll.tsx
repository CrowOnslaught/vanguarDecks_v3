import Card from "models/Card";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import CardDisplay from "components/CardDisplay";
import { CardDisplayModes } from "components/CardDisplay";
import { FiltersModal } from "components/FiltersModal";
import { APIFilters } from "helpers/filters";

interface ContentProps {
  data: Array<Card>;
  filters: APIFilters;
  nextPage: () => void;
  setFilter: (key: string, value: string) => void;
  className?: string;
  hasMore: boolean;
  types: string[];
  clans: string[];
}

const Content = ({
  data,
  filters,
  nextPage,
  setFilter,
  className,
  hasMore,
  types,
  clans,
}: ContentProps) => {
  const [mode, setMode] = useState<CardDisplayModes>(CardDisplayModes.Grid);

  if (!data) return <>no cards</>;

  return (
    <>
      <Flex my="4" justify="space-between">
        <FiltersModal
          types={types}
          clans={clans}
          filters={filters}
          setFilter={setFilter}
        />
        <Flex gap="2">
          <Button onClick={() => setMode(CardDisplayModes.Grid)}>Grid</Button>
          <Button onClick={() => setMode(CardDisplayModes.List)}>List</Button>
        </Flex>
      </Flex>

      <Box minH="100vh">
        <InfiniteScroll
          dataLength={data.length}
          next={nextPage}
          hasMore={hasMore}
          loader={<Button onClick={nextPage}>More cards</Button>}
          endMessage={<h4>Nothing more to show</h4>}
          className={className}>
          <Grid
            overflow="hidden"
            templateColumns={
              mode === CardDisplayModes.List
                ? "1fr"
                : "repeat( auto-fit, minmax(150px, 1fr) )"
            }
            gap={2}
            autoColumns="min-content">
            {data.map((card, index) => (
              <CardDisplay card={card} key={index} mode={mode} />
            ))}
          </Grid>
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default Content;
