import { ChainId, useNetwork, useNFTDrop } from "@thirdweb-dev/react";
import { useNetworkMismatch } from "@thirdweb-dev/react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Theme.module.css";

// Put Your NFT Drop Contract address from the dashboard here
const myNftDropContractAddress = "0x322067594DBCE69A9a9711BC393440aA5e3Aaca1";

const Home: NextPage = () => {
  const nftDrop = useNFTDrop(myNftDropContractAddress);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [claiming, setClaiming] = useState<boolean>(false);

  const [contractMetadata, setMetadata] = useState<{
    name: string;
    description?: string | undefined;
    image?: string | undefined;
  }>();

  const [totalSupply, setTotalSupply] = useState<number>();
  const [claimedSupply, setClaimedSupply] = useState<number>();

  useEffect(() => {
    (async () => {
      const claimed = await nftDrop?.totalClaimedSupply();
      const totalsupply = await nftDrop?.totalSupply();

      setClaimedSupply(claimed?.toNumber());
      setTotalSupply(totalsupply?.toNumber());

      // Load NFT Drop Contract metadata
      const metadata = await nftDrop?.metadata.get();
      setMetadata(metadata);
    })();
  }, [nftDrop]);

  // Loading state while we fetch the metadata
  if (!nftDrop || !contractMetadata) {
    return <div className={styles.container}>Loading...</div>;
  }

  // Function to mint/claim an NFT
  async function mint() {
    if (!address) {
      connectWithMetamask();
      return;
    }

    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Mumbai);
      return;
    }

    setClaiming(true);

    try {
      const minted = await nftDrop?.claim(1);
      console.log(minted);
      alert(`Successfully minted NFT!`);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setClaiming(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.mintInfoContainer}>
        <div className={styles.infoSide}>
          {/* Title of your NFT Collection */}
          <h1>{contractMetadata?.name}</h1>
          {/* Description of your NFT Collection */}
          <p className={styles.description}>{contractMetadata?.description}</p>
        </div>

        <div className={styles.imageSide}>
          {/* Image Preview of NFTs */}
          <img
            className={styles.image}
            src={contractMetadata?.image}
            alt={`${contractMetadata?.name} preview image`}
          />

          {/* Amount claimed so far */}
          <div className={styles.mintCompletionArea}>
            <div className={styles.mintAreaLeft}>
              <p>Total Minted</p>
            </div>
            <div className={styles.mintAreaRight}>
              {claimedSupply && totalSupply ? (
                <p>
                  <b>{claimedSupply}</b>
                  {" / "}
                  {totalSupply}
                </p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          {address ? (
            <button className={styles.mainButton} onClick={mint}>
              Mint
            </button>
          ) : (
            <button className={styles.mainButton} onClick={connectWithMetamask}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
