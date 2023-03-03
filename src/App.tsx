import {
  useClaimedNFTSupply,
  useContract,
  useContractMetadata,
  useUnclaimedNFTSupply,
} from '@thirdweb-dev/react';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { ERC721ClaimButton } from './components/Erc721ClaimButton';
import { HeadingImage } from './components/HeadingImage';

const urlParams = new URL(window.location.toString()).searchParams;
const contractAddress = urlParams.get('contractAddress') || '';

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

  const isLoading = unclaimedSupply.isLoading || claimedSupply.isLoading;

  if (!contractAddress) {
    return (
      <div className="flex justify-center items-center h-full">
        No contract address provided
      </div>
    )
  }

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-screen">
        <div className="w-full h-full items-center justify-center hidden lg:flex lg:col-span-5 lg:px-12">
          <HeadingImage src={contractMetadata.data?.image} isLoading={isLoading} />
        </div>
        <div className="w-full h-full flex items-center justify-center col-span-1 lg:col-span-7">
          <div className="lg:border p-12 rounded-xl lg:border-gray-800 flex flex-col gap-4">
            <div className="w-full flex lg:hidden mb-8">
              <HeadingImage src={contractMetadata.data?.image} isLoading={isLoading} />
            </div>
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <div
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                >
                  <div className="w-full">
                    <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                  </div>
                </div>
              ) : (
                <p>
                  <span className="text-gray-500 text-2xl font-bold tracking-wider">
                    {numberClaimed}
                  </span>{' '}
                  <span className="text-2xl font-bold tracking-wider">
                    / {numberTotal} minted
                  </span>
                </p>
              )}
              <h1 className="text-4xl font-bold line-clamp-1">
                {contractMetadata.isLoading ? (
                  <div
                    role="status"
                    className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                  >
                    <div className="w-full">
                      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  contractMetadata.data?.name
                )}
              </h1>
              {contractMetadata.data?.description ||
              contractMetadata.isLoading ? (
                <p className="text-gray-500 line-clamp-2">
                  {contractMetadata.isLoading ? (
                    <div
                      role="status"
                      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                    >
                      <div className="w-full">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    contractMetadata.data?.description
                  )}
                </p>
              ) : null}
            </div>
            <div className="flex gap-4 w-full">
              <ERC721ClaimButton contract={contractQuery.contract} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
