import Card from 'models/Card';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useCards from 'services/useCards';
import Image from 'next/image';
import { Grid, GridItem } from '@chakra-ui/react';

const Content = ({ data, filters }: any) => {
  const [currentCards, setCurrentCards] = useState<Array<Card>>(data);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { cards, updateCards } = useCards();

  const getMoreCards = async () => {
    const nextPage = currentPage + 1;
    const res = (await updateCards({ page: nextPage })) as unknown;
    setCurrentPage(nextPage);

    try {
      if (res) {
        const nextCards = [...currentCards, ...(res as Card[])];
        setCurrentCards(nextCards);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentCards) return <>a</>;

  return (
    <>
      <InfiniteScroll
        dataLength={currentCards.length}
        next={getMoreCards}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {currentCards.map(data => (
            <GridItem key={data.id}>
              <div>
                <Image
                  src={data.photo}
                  alt={data.name}
                  layout="responsive"
                  width={350}
                  height={510}
                  placeholder="blur"
                  blurDataURL={data.photo}
                />
                <strong> {data.id}</strong> {data.name}
              </div>
              {data.effect}
            </GridItem>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default Content;
