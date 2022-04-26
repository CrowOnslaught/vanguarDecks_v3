import 'styles/globals.css';
import type { AppProps } from 'next/app';
import initAuth from 'helpers/initAuth';
import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from 'components/layout/MainLayout';
import { GlobalStyle, theme } from 'styles/theme';

GlobalStyle();
initAuth();
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
