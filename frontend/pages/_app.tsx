import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./../theme";
import NextNProgress from "nextjs-progressbar";
import Layout from "../components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <NextNProgress color="#29D" />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
