import {
  type IpfsUploadBatchOptions,
  ThirdwebStorage,
  StorageDownloader,
  IpfsUploader,
} from "@thirdweb-dev/storage";

export function getCustomStorageInterface(
  gateway?: string,
): ThirdwebStorage<IpfsUploadBatchOptions> | undefined {
  if (!gateway) return undefined;

  // Configure a custom ThirdwebStorage instance
  const gatewayUrls = {
    "ipfs://": [
      gateway,
      "https://gateway.ipfscdn.io/ipfs/",
      "https://cloudflare-ipfs.com/ipfs/",
      "https://ipfs.io/ipfs/",
    ],
  };
  const downloader = new StorageDownloader();
  const uploader = new IpfsUploader();
  const storage = new ThirdwebStorage({
    uploader,
    downloader,
    gatewayUrls,
  });
  return storage;
}
