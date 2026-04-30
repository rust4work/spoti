import { NextRequest, NextResponse } from "next/server";
import { generateRandomString, generateCodeChallenge, SPOTIFY_AUTH_URL, SPOTIFY_CLIENT_ID, REDIRECT_URI, SCOPES } from "@/lib/spotify";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store code_verifier in cookies to use it later in the callback
  const cookieStore = await cookies();
  cookieStore.set("spotify_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  const authUrl = new URL(SPOTIFY_AUTH_URL);
  authUrl.searchParams.append("client_id", SPOTIFY_CLIENT_ID);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.append("code_challenge_method", "S256");
  authUrl.searchParams.append("code_challenge", codeChallenge);
  authUrl.searchParams.append("scope", SCOPES);

  return NextResponse.redirect(authUrl.toString());
}
