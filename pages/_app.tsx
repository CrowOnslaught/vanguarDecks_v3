import "styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "components/layout/MainLayout";
import { GlobalStyle, theme } from "styles/theme";
import { getCookie } from "cookies-next";
import { NextPageContext } from "next";
import User from "models/User";
import { ProfileProvider } from "contexts/profileContext";

interface MyAppProps extends AppProps {
  profile: User | null;
}

GlobalStyle();
function MyApp({ Component, pageProps, profile }: MyAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ProfileProvider profile={profile}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProfileProvider>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  try {
    const profile = await getCookie("profile", { req: ctx.req, res: ctx.res });
    if (!profile) {
      throw new Error();
    }

    return {
      profile: JSON.parse(String(profile)),
    };
  } catch (error) {
    return {};
  }
};

export default MyApp;
