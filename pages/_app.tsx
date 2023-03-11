import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";
import ThirdwebGuideFooter from "../components/GitHubLink";

// This is the chainId your dApp will work on.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Head>
        <title>thirdweb NFT Drop Minting Customizable Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Learn How To Use Thirdweb's NFT Drop contract and create a customizable NFT Drop minting page"
        />
        <meta
          name="keywords"
          content="Thirdweb, thirdweb NFT drop, how to make thirdweb nft drop, how to make nft collection thirdweb"
        />
      </Head>
      <Component {...pageProps} />
      <ThirdwebGuideFooter />
    </ThirdwebProvider>
  );
}

export default MyApp;
