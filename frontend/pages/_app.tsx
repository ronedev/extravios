import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./../theme";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ChakraProvider theme={theme}>
        <NextNProgress color="#29D" />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
