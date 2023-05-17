# ERC721 Drop Claim Page

In this example, you can create your own ERC721 Drop claim page just by customizing the template with your branding and plugging in your NFT Drop contract address.

This template works with the NFT Drop / Signature Drop contract from thirdweb or when using any of the Drop contract bases or if you implement these extensions:

- [ERC721ClaimConditions](https://portal.thirdweb.com/solidity/extensions/erc721claimconditions)
- [ERC721ClaimPhases](https://portal.thirdweb.com/solidity/extensions/erc721claimphases)

## Using This Repo

To create your own version of this template, you can use the following steps:

Run this command from the terminal to clone this project:

```bash
npx thirdweb create --template nft-drop
```

### 1. Deploy An NFT Drop on thirdweb

If you haven't already deployed your contract, head over to the thirdweb dashboard and create your own NFT Drop contract.

You can learn how to do that with our guide [Release an NFT drop on your own site without writing any code](https://portal.thirdweb.com/guides/release-an-nft-drop-with-no-code#create-a-drop-contract).

Be sure to configure a **name**, **description**, and **image** for your NFT drop in the dashboard.

### 2. Configure Parameters

Go to the [`parameters.ts`](/src/consts/parameters.ts) and update the following values:

1. `contractConst`: The smart contract address of your NFT drop.
2.  `chainConst`: The name of the chain that your smart contract is deployed to.

### 3. Customize the Styling

You can change the theme and primary color of the page by updating `primaryColorConst` and `themeConst` in [`parameters.ts`](/src/consts/parameters.ts). 

If you want to go further, you can also update the styles in the respective components by changing the [Tailwind](https://tailwindcss.com/) classes.

### 4. Optional: Add Gasless Transaction Support

If you want to sponsor the gas fees for your user, you can update the `relayerUrlConst` in [`parameters.ts`](/src/consts/parameters.ts) to point to your Open Zeppelin relayer or `biconomyApiKeyConst` and `biconomyApiIdConst` to use Biconomy.

Learn more: https://portal.thirdweb.com/glossary/gasless-transactions

## Join our Discord!

For any questions or suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
