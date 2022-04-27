import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { sessionConfig } from "config/sessionConfig";
import { publicPaths } from "config/publicPaths";
import { changeTimeZone } from "helpers/changeTimeZone";
import { getUserInfo } from "services/apiCards";
import { setCookies } from "cookies-next";

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionConfig);
}

function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext,
    session?: any,
    profile?: any
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async (context: GetServerSidePropsContext) => {
    const { req, res, query } = context;
    const url = context.resolvedUrl.split("?")[0];
    const tokens = req.session.tokens;
    const profile = req.session.profile;
    const isPublicPath = publicPaths.find(path => path.route === url);

    if (query.tokens && isPublicPath && isPublicPath.policy === "notLogged") {
      try {
        req.session.tokens = JSON.parse(String(query.tokens));
        const userInfo = await getUserInfo(req.session.tokens.access.token);
        req.session.profile = userInfo;
        setCookies("profile", JSON.stringify(userInfo), {
          req,
          res,
          maxAge: 60 * 6 * 24,
        });
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

    return await handler(context, tokens, profile);
  };
}

export function withAuth<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext,
    session?: any,
    profile?: any
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return withIronSessionSsr(withSessionSsr(handler), sessionConfig);
}
