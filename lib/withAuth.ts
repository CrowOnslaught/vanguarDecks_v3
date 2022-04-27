import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { sessionConfig } from "config/sessionConfig";
import { publicPaths } from "config/publicPaths";

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionConfig);
}

function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext,
    session?: any
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const tokens = req.session.tokens;
    const isPublicPath = publicPaths.find(path => path.route === req.url);

    if (!tokens && !isPublicPath) {
      return await {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }

    if (tokens && new Date(tokens.access.expires) < new Date()) {
      await req.session.destroy();
      return await {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }

    if (tokens && isPublicPath && isPublicPath.policy === "notLogged") {
      return await {
        redirect: {
          destination: "/",
          statusCode: 302,
        },
      };
    }

    return await handler(context, tokens);
  };
}

export function withAuth<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext,
    session?: any
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  //@ts-ignore
  return withIronSessionSsr(withSessionSsr(handler), sessionConfig);
}
