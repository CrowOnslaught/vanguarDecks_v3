import { getToken } from "./services";

export const apiHandler = async (url:string, options:any ):Promise<any> => {
    try {
        const res = await fetch(`${process.env.API_CARDS_URL}/v1/${url}`, options).then(res => res.json());
        
        if (res.code === 401) {
            const token:{
                tokens: {
                    access: {
                        token: string
                    }
                }
            } = await getToken();
            return await apiHandler(url, {...options, headers: {...options.headers, Authorization: `Bearer ${token.tokens.access.token}`}});
        }

        if (res.code) {
            throw new Error(res.message);
        }
        
        return res;
    } catch (error) {
        
    }
    
};