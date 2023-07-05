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
  relayerUrlConst,
} from "./consts/parameters";
import { Chain, getChainBySlug } from "@thirdweb-dev/chains";

const container = document.getElementById("root");
const root = createRoot(container!);
const urlParams = new URL(window.location.toString()).searchParams;

const relayerUrl = urlParams.get("relayUrl") || relayerUrlConst || "";
const biconomyApiKey =
  urlParams.get("biconomyApiKey") || biconomyApiKeyConst || "";
const biconomyApiId =
  urlParams.get("biconomyApiId") || biconomyApiIdConst || "";
const sdkOptions = getGasless(relayerUrl, biconomyApiKey, biconomyApiId);

const chain = (urlParams.get("chain") && urlParams.get("chain")?.startsWith("{")) ? JSON.parse(String(urlParams.get("chain"))) : urlParams.get("chain") || chainConst;
const tempChain = getChainBySlug(typeof chain === "string" ? chain : chain.slug);
const activeChain: Chain | string = typeof chain === "string" ? chain : { ...chain, icon: tempChain.icon };

root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain} sdkOptions={sdkOptions}>
      <Toaster />
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);
