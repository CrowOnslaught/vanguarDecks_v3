import Card from "models/Card";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import StyledCardDescription from "components/StyledCardDescription";
import CardDisplay from "components/CardDisplay";
interface ContentProps {
  data: Array<Card>;
  filters: any;
  nextPage: () => void;
  className?: string;
}

const InfiniteScrollGrid = styled(Grid)`
  overflow: hidden;
`;

const Content = ({ data, filters, nextPage, className }: ContentProps) => {
  const [hasMore, setHasMore] = useState(true);

  if (!data) return <>no cards</>;

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={() => {}}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
        className={className}>
        <InfiniteScrollGrid
          templateColumns="repeat(4, 1fr)"
          gap={2}
          autoColumns="min-content">
          {data.map((card, index) => (
            <CardDisplay card={card} key={index} />
          ))}
        </InfiniteScrollGrid>
      </InfiniteScroll>
    </>
  );
};

export default Content;
