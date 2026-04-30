import { NextRequest, NextResponse } from "next/server";
import { fetchSpotifyApi } from "@/lib/spotify";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_access_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const userProfile = await fetchSpotifyApi("/me", token);
    return NextResponse.json({ authenticated: true, user: userProfile });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Invalid token" }, { status: 401 });
  }
}
