import { cookies } from "next/headers";
import { fetchSpotifyApi, SpotifyApiError } from "./spotify";

export type SpotifyDataResult<T> =
  | { status: "success"; data: T }
  | { status: "unauthenticated"; canRefresh: boolean }
  | { status: "error"; statusCode?: number };

export async function getSpotifyData<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<SpotifyDataResult<T>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_access_token")?.value;
  const canRefresh = Boolean(cookieStore.get("spotify_refresh_token")?.value);

  if (!token) {
    return { status: "unauthenticated", canRefresh };
  }

  try {
    const data = await fetchSpotifyApi<T>(endpoint, token, options);
    return { status: "success", data };
  } catch (error) {
    console.error("Server fetch error:", error);

    if (error instanceof SpotifyApiError && error.status === 401) {
      return { status: "unauthenticated", canRefresh };
    }

    return {
      status: "error",
      statusCode: error instanceof SpotifyApiError ? error.status : undefined,
    };
  }
}
