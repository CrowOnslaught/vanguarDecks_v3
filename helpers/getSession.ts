import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { publicPaths } from 'config/publicPaths';
import { ServerResponse } from 'node:http';

export const getSession = (req:IncomingMessage & { cookies: NextApiRequestCookies; }, res:ServerResponse, path:string) => {
    if (publicPaths.includes(path)) {
        return;
    }

    if (!req.session.tokens) {
        res.writeHead(307, { Location: '/login' });
        res.end();
        return null;
    }

    return req.session.tokens;
};
