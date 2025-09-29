export const getAppUrl = () => {
  return process.env.VERCEL_URL ?? "http://localhost:3000";
};
