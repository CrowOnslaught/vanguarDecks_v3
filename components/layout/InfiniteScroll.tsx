import Card from "models/Card";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import StyledCardDescription from "components/StyledCardDescription";
interface ContentProps {
  data: Array<Card>;
  filters: any;
  nextPage: () => void;
  className?: string;
}

const CardTitle = styled(Text)`
  font-weight: 700;
`;

const CardDescrition = styled(StyledCardDescription)`
  position: absolute;
  opacity: 0;
  top: 100%;
  transition: all 0.5s ease-in;
  padding: ${(p: any) => p.theme.space[4]};
  background-color: #0000007d;

  width: 100%;
  height: 100%;
`;

const CardItem = styled(GridItem)`
  position: relative;

  :hover {
    .cardImage {
      filter: blur(2px);
      transition: all 0.5s;
    }

    .floatingText {
      top: 0;
      opacity: 1;
    }
  }
`;

const Content = ({ data, filters, nextPage, className }: ContentProps) => {
  const [hasMore, setHasMore] = useState(true);

  if (!data) return <>no cards</>;

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={nextPage}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
        className={className}>
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={2}
          autoColumns="min-content">
          {data.map((card, index) => (
            <CardItem key={card.id + index}>
              <div>
                <Image
                  src={card.image}
                  alt={card.name}
                  layout="responsive"
                  width={350}
                  height={510}
                  placeholder="blur"
                  blurDataURL={card.image}
                  className="cardImage"
                />
                <CardDescrition
                  className="floatingText"
                  fontSize="md"
                  align="justify"
                  text={card.description}
                />

                <CardTitle fontSize="lg" align="center">
                  {card.id}
                </CardTitle>
                <Text fontSize="md" align="center">
                  {card.name}
                </Text>
              </div>
            </CardItem>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default Content;
