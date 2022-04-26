import { extendTheme } from "@chakra-ui/react";
import { injectGlobal } from '@emotion/css';
import emotionNormalize from 'emotion-normalize';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  }
})

export const GlobalStyle = () =>  injectGlobal`
  ${emotionNormalize};

  html, body {
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


export { theme };
