import {
  ConnectWallet,
  MediaRenderer,
  ThirdwebNftMedia,
  useContract,
  useContractMetadata,
} from '@thirdweb-dev/react';
import { DropSvg } from './components/DropSvg';
import { HeadingImage } from './components/HeadingImage';

const contractAddress = '0x7226c20Ae822b6724536C661579a2269A07b2711';

export default function Home() {
  const contractQuery = useContract(contractAddress);
  const contractMetadata = useContractMetadata(contractQuery.contract);

  console.log({ contractMetadata, contractQuery, contractAddress });

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 h-screen">
        <div className="w-full h-full items-center hidden md:flex">
          <HeadingImage src={contractMetadata.data?.image} />
        </div>
        <div className="w-full h-full flex items-center">
          <div className="md:border p-12 rounded-xl md:border-gray-800 flex flex-col gap-4">
            <div className="w-1/2 flex md:hidden">
              <HeadingImage src={contractMetadata.data?.image} />
            </div>
            <p>
              <span className="text-gray-500 text-2xl font-bold tracking-wider">
                1333
              </span>{' '}
              <span className="text-2xl font-bold  tracking-wider">/ 7777</span>
            </p>
            <h1 className="text-4xl font-bold">
              {contractMetadata.isLoading
                ? 'Loading...'
                : contractMetadata.data?.name}
            </h1>
            {contractMetadata.data?.description ||
            contractMetadata.isLoading ? (
              <p className="text-gray-500">
                {contractMetadata.isLoading
                  ? 'Loading Description...'
                  : contractMetadata.data?.description}
              </p>
            ) : null}
            <div className="flex gap-4 ">
              <ConnectWallet accentColor="white" />
              <div className="flex flex-col gap-1 justify-center">
                <p className="uppercase text-gray-500 text-sm">Price</p>
                <p className="text-sm">0.01 ETH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
