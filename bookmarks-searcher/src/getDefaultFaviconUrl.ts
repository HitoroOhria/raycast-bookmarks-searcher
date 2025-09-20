export function getDefaultFaviconUrl(url: string): string {
  const { origin } = new URL(url);
  return `${origin}/favicon.ico`;
}
