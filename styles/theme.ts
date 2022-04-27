import { extendTheme } from "@chakra-ui/react";
import { injectGlobal } from "@emotion/css";
import emotionNormalize from "emotion-normalize";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  spaces: {
    _050: "4px",
    _100: "8px",
    _200: "16px",
    _300: "24px",
    _400: "32px",
    _500: "40px",
    _600: "48px",
    _700: "56px",
    _800: "64px",
    _900: "72px",
  },
  sizes: {
    _100: "8px",
    _200: "10px",
    _300: "12px",
    _400: "14px",
    _500: "16px",
    _600: "18px",
    _700: "20px",
    _800: "22px",
    _900: "24px",
  },
  fonts: {
    title: "Lobster",
    text: "'Open Sans', sans-serif",
  },
});

export const GlobalStyle = () => injectGlobal`
  ${emotionNormalize};

  html, body {
    width: 100%;
    height: 100%;
  }

  button:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  @font-face {
    font-family: 'Lobster';
    src: url('/fonts/Lobster-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
`;

export { theme };
