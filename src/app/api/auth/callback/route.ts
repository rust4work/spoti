import { NextRequest, NextResponse } from "next/server";
import { SPOTIFY_TOKEN_URL, SPOTIFY_CLIENT_ID, REDIRECT_URI } from "@/lib/spotify";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  
  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("spotify_code_verifier")?.value;
  const storedState = cookieStore.get("spotify_auth_state")?.value;

  if (!codeVerifier) {
    return NextResponse.json({ error: "Missing code verifier" }, { status: 400 });
  }

  if (!state || !storedState || state !== storedState) {
    return NextResponse.json({ error: "Invalid auth state" }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.append("client_id", SPOTIFY_CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);
  params.append("code_verifier", codeVerifier);

  try {
    const res = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Spotify token error:", errorData);
      return NextResponse.json({ error: "Failed to fetch token" }, { status: 400 });
    }

    const data = await res.json();
    
    cookieStore.set("spotify_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in,
    });

    if (data.refresh_token) {
      cookieStore.set("spotify_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    }

    cookieStore.delete("spotify_code_verifier");
    cookieStore.delete("spotify_auth_state");

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
