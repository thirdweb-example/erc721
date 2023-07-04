import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { Toaster } from "./components/ui/Toaster";
import { getGasless } from "./utils/getGasless";
import {
  biconomyApiIdConst,
  biconomyApiKeyConst,
  chainConst,
  customIpfsGateway,
  relayerUrlConst,
} from "./consts/parameters";
import { getCustomStorageInterface } from "./utils/getCustomIpfsGateway";

const container = document.getElementById("root");
const root = createRoot(container!);
const urlParams = new URL(window.location.toString()).searchParams;

const chain =
  (urlParams.get("chain") && JSON.parse(String(urlParams.get("chain")))) ||
  chainConst;
const relayerUrl = urlParams.get("relayUrl") || relayerUrlConst || "";
const biconomyApiKey =
  urlParams.get("biconomyApiKey") || biconomyApiKeyConst || "";
const biconomyApiId =
  urlParams.get("biconomyApiId") || biconomyApiIdConst || "";
const sdkOptions = getGasless(relayerUrl, biconomyApiKey, biconomyApiId);

/* Use this when every embed changes to new embeds
const network = urlParams.get("network") || "ethereum";
const activeChain = getChainBySlug(network); */

// Use your own custom IPFS gateway
const ipfsGateway =
  urlParams.get("customIpfsGateway") || customIpfsGateway || "";

const storageInterface = getCustomStorageInterface(ipfsGateway);

root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={chain}
      sdkOptions={sdkOptions}
      storageInterface={storageInterface}
    >
      <Toaster />
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);
