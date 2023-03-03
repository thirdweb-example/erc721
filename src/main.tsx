import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { getChainByChainId } from "@thirdweb-dev/chains";
import "./styles/globals.css";

const urlParams = new URL(window.location.toString()).searchParams;
const network = urlParams.get("network") || "";
const activeChain = getChainByChainId(parseInt(network))

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
