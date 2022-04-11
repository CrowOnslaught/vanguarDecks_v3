import Card from 'models/Card';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useCards from 'services/useCards';

const Content = ({ data, filters }: any) => {
  const [currentCards, setCurrentCards] = useState<Array<Card>>(data);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const { cards, updateCards } = useCards();

  const getMoreCards = async () => {
    const nextPage = currentPage + 1;
    const res = await updateCards({ page: nextPage });
    setCurrentPage(nextPage);

    console.log(1, res);
    const nextCards = [...currentCards];
    setCurrentCards(nextCards);
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
        {currentCards.map(data => (
          <div key={data.id}>
            <div className="back">
              <strong> {data.id}</strong> {data.name}
            </div>
            {data.effect}
          </div>
        ))}
      </InfiniteScroll>
      <style jsx>
        {`
          .back {
            padding: 10px;
            background-color: dodgerblue;
            color: white;
            margin: 10px;
          }
        `}
      </style>
    </>
  );
};

export default Content;
