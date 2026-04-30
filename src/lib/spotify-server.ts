import { cookies } from "next/headers";
import { fetchSpotifyApi } from "./spotify";

export async function getSpotifyData(endpoint: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_access_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  return fetchSpotifyApi(endpoint, token, options);
}
