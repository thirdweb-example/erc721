import {
  ConnectWallet,
  MediaRenderer,
  ThirdwebNftMedia,
  useClaimedNFTSupply,
  useContract,
  useContractMetadata,
  useUnclaimedNFTSupply,
} from '@thirdweb-dev/react';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { DropSvg } from './components/DropSvg';
import { ERC721ClaimButton } from './components/Erc721ClaimButton';
import { HeadingImage } from './components/HeadingImage';

const contractAddress = '0x7226c20Ae822b6724536C661579a2269A07b2711';

export default function Home() {
  const contractQuery = useContract(contractAddress);
  const contractMetadata = useContractMetadata(contractQuery.contract);

  const unclaimedSupply = useUnclaimedNFTSupply(contractQuery.contract);
  const claimedSupply = useClaimedNFTSupply(contractQuery.contract);

  const numberClaimed = useMemo(() => {
    return BigNumber.from(claimedSupply.data || 0).toString();
  }, [claimedSupply]);

  const numberTotal = useMemo(() => {
    return BigNumber.from(claimedSupply.data || 0)
      .add(BigNumber.from(unclaimedSupply.data || 0))
      .toString();
  }, [claimedSupply.data, unclaimedSupply.data]);

  console.log({ contractMetadata, contractQuery, contractAddress });

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12  h-screen grid-">
        <div className="w-full h-full items-center justify-center hidden lg:flex lg:col-span-5">
          <HeadingImage src={contractMetadata.data?.image} />
        </div>
        <div className="w-full h-full flex items-center justify-center col-span-1 lg:col-span-7">
          <div className="lg:border p-12 rounded-xl lg:border-gray-800 flex flex-col gap-4 ">
            <div className="w-1/2 flex lg:hidden">
              <HeadingImage src={contractMetadata.data?.image} />
            </div>
            <p>
              <span className="text-gray-500 text-2xl font-bold tracking-wider">
                {numberClaimed}
              </span>{' '}
              <span className="text-2xl font-bold tracking-wider">
                / {numberTotal} minted
              </span>
            </p>
            <h1 className="text-4xl font-bold line-clamp-1">
              {contractMetadata.isLoading
                ? 'Loading...'
                : contractMetadata.data?.name}
            </h1>
            {contractMetadata.data?.description ||
            contractMetadata.isLoading ? (
              <p className="text-gray-500 line-clamp-2">
                {contractMetadata.isLoading
                  ? 'Loading Description...'
                  : contractMetadata.data?.description}
              </p>
            ) : null}
            <div className="flex gap-4 w-full">
              {/*               <ConnectWallet colorMode='dark' /> */}
              <ERC721ClaimButton contract={contractQuery.contract} />
              {/*               <div className="flex flex-col gap-1 justify-center">
                <p className="uppercase text-gray-500 text-sm">Price</p>
                <p className="text-sm">0.01 ETH</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
