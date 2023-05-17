export function getGasless(
  relayerUrl?: string,
  biconomyApiKey?: string,
  biconomyApiId?: string,
) {
  return {
    gasless: relayerUrl
      ? {
          openzeppelin: { relayerUrl },
        }
      : biconomyApiKey && biconomyApiId
      ? {
          biconomy: {
            apiKey: biconomyApiKey,
            apiId: biconomyApiId,
          },
        }
      : undefined,
  };
}
