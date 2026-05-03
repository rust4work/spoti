import { NextRequest, NextResponse } from "next/server";
import { SPOTIFY_TOKEN_URL, SPOTIFY_CLIENT_ID } from "@/lib/spotify";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value;
  const returnTo = req.nextUrl.searchParams.get("returnTo");
  const redirectTarget = returnTo?.startsWith("/") ? returnTo : "/dashboard";

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  const params = new URLSearchParams();
  params.append("client_id", SPOTIFY_CLIENT_ID);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  try {
    const res = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to refresh token" }, { status: 400 });
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

    return NextResponse.redirect(new URL(redirectTarget, req.url));
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }
}
