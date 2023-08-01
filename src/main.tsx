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
  customIpfsGateways,
  relayerUrlConst,
} from "./consts/parameters";
import { getCustomIpfsGateways } from "./utils/getCustomIpfsGateways";

const container = document.getElementById("root");
const root = createRoot(container!);
const urlParams = new URL(window.location.toString()).searchParams;

const relayerUrl = urlParams.get("relayUrl") || relayerUrlConst || "";
const biconomyApiKey =
  urlParams.get("biconomyApiKey") || biconomyApiKeyConst || "";
const biconomyApiId =
  urlParams.get("biconomyApiId") || biconomyApiIdConst || "";
const { gasless } = getGasless(relayerUrl, biconomyApiKey, biconomyApiId);

const chain =
  urlParams.get("chain") && urlParams.get("chain")?.startsWith("{")
    ? JSON.parse(String(urlParams.get("chain")))
    : urlParams.get("chain") || chainConst;

const ipfsGateways =
  urlParams.get("customIpfsGateways") || customIpfsGateways.join(",") || "";
const gatewayUrls = getCustomIpfsGateways(ipfsGateways);

const sdkOptions = { gasless, gatewayUrls };

root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={chain} sdkOptions={sdkOptions}>
      <Toaster />
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);
