import 'styles/globals.css';
import type { AppProps } from 'next/app';
import initAuth from 'helpers/initAuth';
import { ChakraProvider } from '@chakra-ui/react';

initAuth();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
