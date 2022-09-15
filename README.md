# Customizable NFT Drop Minting Page

In this example, you can create your own NFT Drop minting page just by customising the template with your branding, and plugging in your NFT Drop contract address.

## Tools

- [**NFT Drop**](https://portal.thirdweb.com/pre-built-contracts/nft-drop): to create a lazy-minted ERC721 NFT Collection that our users can claim.
- [**React SDK**](https://docs.thirdweb.com/react): to enable users to connect their wallets with the [useMetamask](https://portal.thirdweb.com/react/react.usemetamask) hook, and access hooks such as [useNFTDrop](https://portal.thirdweb.com/react/react.usenftdrop) to interact with the NFT drop contract.
- [**TypeScript SDK**](https://docs.thirdweb.com/typescript): to view the claimed supply, total supply, and mint NFTs from the drop.

## Using This Repo

To create your own version of this template, you can use the following steps:

Run this command from the terminal to clone this project:

```bash
npx thirdweb create --template nft-drop
```

### 1. Deploy Your Own NFT Drop on thirdweb

Head to the thirdweb dashboard and create your own NFT Drop contract.

You can learn how to do that with our guide [Release an NFT drop on your own site without writing any code](https://portal.thirdweb.com/guides/release-an-nft-drop-with-no-code#create-a-drop-contract).

Be sure to configure a **name**, **description**, and **image** for your NFT drop in the dashboard.

### 2. Configure the styles to your branding

You can fully customize the colors and style of this template by editing the values in the [`globals.css`](/styles/globals.css) file.

You can configure:

- The color of the background with `--background-color`
- The color of the text with `--text-color`
- The color of the button (is a gradient from primary to secondary color) with `--color-primary` and `--color-secondary`
- The font with `--font`
- The border colors with `--border-color`

### 3. Plug in your NFT Drop contract address

Replace the value of the `myNftDropContractAddress` inside [`index.tsx`](/pages/index.tsx) with your NFT Drop contract address you can find in the dashboard.

### 4. Configure Your Network

Inside [`_app.tsx`](/pages/_app.tsx) you can configure the network you want to use:

```jsx
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
