// Spotify API Constants and Utilities

export const SPOTIFY_CLIENT_ID =
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
export const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://spoti-ten.vercel.app/api/auth/callback"
    : "http://127.0.0.1:3000/api/auth/callback";
export const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
].join(" ");

export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
export const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
export const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

/**
 * Generates a random alphanumeric string for PKCE
 */
export function generateRandomString(length: number): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

/**
 * Base64-url encodes a buffer
 */
function base64UrlEncode(buffer: ArrayBuffer): string {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Generates a PKCE code challenge from a code verifier
 */
export async function generateCodeChallenge(
  codeVerifier: string,
): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(digest);
}

/**
 * Spotify API fetch wrapper
 */
export async function fetchSpotifyApi(
  endpoint: string,
  token: string,
  options: RequestInit = {},
) {
  const res = await fetch(`${SPOTIFY_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.statusText}`);
  }

  if (res.status === 204) {
    return null; // No content
  }

  return res.json();
}
