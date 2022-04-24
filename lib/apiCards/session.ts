
import { getToken, renewToken} from 'lib/apiCards/services'

export const session = async (session:any) => {
    if (!session.token) {
        const token = await getToken();
        session.token = token.access;
        session.refreshtoken = token.refresh;
        await session.save();
        return token.access;
    }

    if (new Date() > new Date(session.token.expires)) {
        const token = await getToken();
        session.token = token.access;
        session.refreshtoken = token.refresh;
        await session.save();
        return token.access;
    }

    return {
        token: session.token
    };
}