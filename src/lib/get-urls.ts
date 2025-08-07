const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : `https://${process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL}/`;

const REMOTE_IMAGES_URL = `https://rc80fe8z4e4e2uuc.public.blob.vercel-storage.com/`;

export function getURL(type: "base" | "graphql" | "image" | "avatar", path?: string | null): string {
  switch (type) {
    case "base":
      return path ? new URL(path, BASE_URL).toString() : BASE_URL;
    case "graphql":
      return getURL("base", "api/graphql/");
    case "image":
      return path ? new URL(path, REMOTE_IMAGES_URL).toString() : REMOTE_IMAGES_URL;
    case "avatar":
      const avatarBase = getURL("image", "avatars/");
      return path ? new URL(path, avatarBase).toString() : avatarBase;
    default:
      throw new Error(`Unknown URL type: ${type}`);
  }
}
