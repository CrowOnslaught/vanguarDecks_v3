import { apiHandler } from "./apiHandler";
import { APIFilters } from "./types";
import { filtersToQuery } from "./filtersHandler";

const getToken = async ({ email, password }:{ email: string;
 password: string;}) => {
     try {
        const tokenRes = await apiHandler('auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                email: email,
                password: password
            })});
            return tokenRes.tokens;
     } catch(err:any) {
        if (err.message.includes('Unexpected token')) {
            throw new Error('Something went wrong. Please try again.');
        }

        throw new Error(err);
     }
    
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