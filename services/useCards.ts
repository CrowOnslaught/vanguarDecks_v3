import fetcher from 'helpers/fetcher';
import { objectToQueryString } from 'helpers/utils';
import Card from 'models/Card';
import { useEffect } from 'react';
import useSWR from 'swr';

interface responseProps {
  data: Array<Card>;
  paging: {
    page: number;
    pagesize: number;
  };
}

export default function useCards(params?: Record<string, any>) {
  let qs = params ? { ...params } : {};
  qs.page = qs.page || '1';

  const queryString = objectToQueryString(qs);
  const {
    data: cards,
    error,
    isValidating,
    mutate: mutateCards,
  } = useSWR<responseProps>(`/api/cards/${queryString}`, fetcher);

  const updateCards = async (params?: Record<string, any>) => {
    let qs = params ? { ...params } : {};
    qs.page = qs.page || '1';

    const queryString = objectToQueryString(qs);
    const res = await fetch(
      `https://card-fight-vanguard-api.ue.r.appspot.com/api/v1/cards?${queryString}`
    );
    console.log(res.json());
    return mutateCards(res.json());
  };

  useEffect(() => {
    console.log('cards', cards, 'cards');
  }, [cards]);

  //   if (isValidating) return { cards: [], updateCards };

  return { cards, updateCards };
}
