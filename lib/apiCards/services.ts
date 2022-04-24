import { apiHandler } from "./apiHandler";
import { APIFilters } from "./types";
import { filtersToQuery } from "./filtersHandler";

const getToken = async () => {
    const tokenRes = await apiHandler('auth/login',
    {
        method: 'POST',
        headers: {
            'Accept': 'text/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            email: process.env.API_USERNAME,
            password: process.env.API_PASSWORD
        })});

    return tokenRes.tokens;
}

const getCards = async (token:string, filters?:APIFilters) => {
    let filtersQuery;
    if (filters) filtersQuery = filtersToQuery(filters);
    const cardsRes = await apiHandler('cards',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return cardsRes;
}

export {
    getToken,
    getCards
}