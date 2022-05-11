export type APIFilters = {
  sort?: string;
  limit?: number;
  page?: number | string;
  search?: string;
};

const filtersToQuery = (obj: APIFilters) => {
  const query = Object.entries(obj)
    .map(value => {
      return `${value[0]}=${value[1]}`;
    })
    .join("&");
  return query;
};

const queryToFilters = (query: string) => {
  const filters = {};
  const queryArr = query.split("&");
  queryArr.map(value => {
    const [keyName, keyValue] = value.split("=");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    filters[keyName] = keyValue;
  });
  return filters as APIFilters;
};

export { filtersToQuery, queryToFilters };
