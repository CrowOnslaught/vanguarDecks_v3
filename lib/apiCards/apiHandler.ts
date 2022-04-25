export const apiHandler = async (url:string, options:any ):Promise<any> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_CARDS_URL}/v1/${url}`, options);
    const resJson = await res.json();
        if (resJson.code) {
            throw new Error(resJson.message);
        }
        
        return resJson; 
};