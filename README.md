> [!Important]  
> This repository is referencing the `mumbai` chain.
> 
> `Mumbai` [is deprecated since 08/04/2024](https://blog.thirdweb.com/deprecation-of-mumbai-testnet/), meaning the code in this repository will no longer work out of the box.
>
> You can still use this repository, however you will have to switch any references to `mumbai` to another chain.

# ERC721 Drop Claim Page

In this example, you can create your own ERC721 Drop claim page just by customizing the template with your branding and plugging in your NFT Drop contract address.

This template works with the NFT Drop / Signature Drop contract from thirdweb or when using any of the Drop contract bases or if you implement these extensions:

- [ERC721ClaimConditions](https://portal.thirdweb.com/solidity/extensions/erc721claimconditions)
- [ERC721ClaimPhases](https://portal.thirdweb.com/solidity/extensions/erc721claimphases)

## Using This Repo

To create your own version of this template, you can use the following steps:

Run this command from the terminal to clone this project:

```bash
npx thirdweb create --template erc721
```

### 1. Deploy An NFT Drop on thirdweb

If you haven't already deployed your contract, head over to the thirdweb dashboard and create your own NFT Drop contract.

You can learn how to do that with our guide [Release an NFT drop on your own site without writing any code](https://portal.thirdweb.com/guides/release-an-nft-drop-with-no-code#create-a-drop-contract).

Be sure to configure a **name**, **description**, and **image** for your NFT drop in the dashboard.

### 2. Configure Parameters

Go to the [`parameters.ts`](/src/consts/parameters.ts) and update the following values:

1. `contractConst`: The smart contract address of your NFT drop.
2. `chainConst`: The name of the chain that your smart contract is deployed to.

If you are using one of thirdweb's [default supported chains](https://portal.thirdweb.com/react/react.thirdwebprovider#default-chains) You can use the chain name as string.

#### Example

```ts
export const chainConst = "ethereum";
```

If you are using any other chain, you need to provide the chain object from the `@thirdweb-dev/chains` package to `ThirdwebProvider`'s `activeChain` prop as mentioned [here](https://portal.thirdweb.com/react/react.thirdwebprovider#activechain-recommended).


#### Example

```ts
import { Sepolia } from '@thirdweb-dev/chains';

export const chainConst = Sepolia;
```

If your chain is not included in the `@thirdweb-dev/chains` package, you can provide the chain information yourself by creating an object as mentioned [here](https://portal.thirdweb.com/react/react.thirdwebprovider#custom-evm-chains)


### 3. Customize the Styling

You can change the theme and primary color of the page by updating `primaryColorConst` and `themeConst` in [`parameters.ts`](/src/consts/parameters.ts).

If you want to go further, you can also update the styles in the respective components by changing the [Tailwind](https://tailwindcss.com/) classes.

### 4. Optional: Add Gasless Transaction Support

If you want to sponsor the gas fees for your user, you can update the `relayerUrlConst` in [`parameters.ts`](/src/consts/parameters.ts) to point to your Open Zeppelin relayer or `biconomyApiKeyConst` and `biconomyApiIdConst` to use Biconomy.

Learn more: https://portal.thirdweb.com/glossary/gasless-transactions

## Deploying Your Site

### Deploying to IPFS

To deploy your site to IPFS, run the following command:

```bash
yarn deploy
```

This will deploy your site and output the IPFS hash of your site. You can then grab the IPFS hash and replace it with the one you get on the Embed tab on your contract on dashboard, so you get the updated version on your website once you copy it over.

### Deploying to a centralized server

You can also deploy it to any centralized server like any normal website.

## Join our Discord!

For any questions or suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
