import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { sessionConfig } from "config/sessionConfig";
import { publicPaths } from "config/publicPaths";
import { changeTimeZone } from "helpers/changeTimeZone";

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
    const { req, query } = context;
    const url = context.resolvedUrl.split("?")[0];
    const tokens = req.session.tokens;
    const isPublicPath = publicPaths.find(path => path.route === url);

    if (query.tokens && isPublicPath && isPublicPath.policy === "notLogged") {
      try {
        req.session.tokens = JSON.parse(String(query.tokens));
        await req.session.save();
      } catch (err) {
        return await {
          redirect: {
            destination: "/login",
            statusCode: 302,
          },
        };
      }

      await req.session.save();
      return await {
        redirect: {
          destination: "/",
          statusCode: 302,
        },
      };
    }

    if (!tokens && !isPublicPath) {
      return await {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }

    if (
      tokens &&
      changeTimeZone(tokens?.access.expires, "Europe/Paris") <
        changeTimeZone(new Date().toString(), "Europe/Paris")
    ) {
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
