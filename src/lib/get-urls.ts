const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const GRAPHQL_URL = `${BASE_URL}/api/graphql`;
export const REMOTE_IMAGES_URL = `https://rc80fe8z4e4e2uuc.public.blob.vercel-storage.com`;
