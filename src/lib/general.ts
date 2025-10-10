export const getAppUrl = () => {
  return process.env.VERCEL_URL ?? "http://localhost:3000";
};

export const formatDate = (
  date: string,
  options: Intl.DateTimeFormatOptions
) => {
  return new Date(date).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  });
};

export function generateNextImageUrl(
  url: string,
  width: number,
  q = 75
): string {
  const encodedUrl = encodeURIComponent(url);
  const imageUrl = `/_next/image?url=${encodedUrl}&w=${width}&q=${q}`;
  return imageUrl;
}
