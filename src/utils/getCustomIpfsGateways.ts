export function getCustomIpfsGateways(gateways: string): string[] | undefined {
  if (!gateways) return undefined;
  const customGateways = gateways.split(",").filter((url) => {
    if (!url) return null;

    // Check if the URL is valid
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  });
  if (!customGateways || !customGateways.length) return undefined;
  return customGateways;
}
