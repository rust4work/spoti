import { cookies } from "next/headers";
import { fetchSpotifyApi } from "./spotify";
import { redirect } from "next/navigation";

export async function getSpotifyData(endpoint: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_access_token")?.value;

  if (!token) {
    redirect("/api/auth/login");
  }

  try {
    return await fetchSpotifyApi(endpoint, token, options);
  } catch (error) {
    console.error("Server fetch error:", error);
    redirect("/api/auth/login");
  }
}
