import Card from 'models/Card';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import { Grid, GridItem, Text } from '@chakra-ui/react';

interface ContentProps {
  data: Array<Card>;
  filters: any;
  nextPage: () => void;
  className?: string;
}

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
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {data.map(card => (
            <GridItem key={card.id}>
              <div>
                <Image
                  src={card.photo}
                  alt={card.name}
                  layout="responsive"
                  width={350}
                  height={510}
                  placeholder="blur"
                  blurDataURL={card.photo}
                />
                <Text fontSize="sm" as="strong" align="center">
                  {card.id}
                </Text>
                <Text fontSize="xs" align="center">
                  {card.name}
                </Text>
              </div>
            </GridItem>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default Content;
