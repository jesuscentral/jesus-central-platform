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
