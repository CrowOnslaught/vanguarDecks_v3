import "styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "helpers/initAuth";
import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react";
import MainLayout from "components/layout/MainLayout";
import { injectGlobal } from "@emotion/css";
import emotionNormalize from "emotion-normalize";
import { adaptiveColor } from "styles/mixins";
import { jsx, ThemeProvider } from "@emotion/react";

injectGlobal`
  ${emotionNormalize};
  
  html, body {
    width: 100%;
    height: 100%;
    ${adaptiveColor(
      "background-color",
      theme.colors.white,
      theme.colors.black
    )};
    ${adaptiveColor("color", theme.colors.black, theme.colors.white)};
    
    * {
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      /* Track */
      ::-webkit-scrollbar-track {
        background: ${theme.colors.purple[700]};
      }
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.teal[300]};
        border-radius: 10px;
      }
    }
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  @font-face {
    font-family: 'Lobster';
    src: url('/fonts/Lobster-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
