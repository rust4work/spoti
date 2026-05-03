import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("spotify_access_token");
  cookieStore.delete("spotify_refresh_token");
  cookieStore.delete("spotify_code_verifier");
  cookieStore.delete("spotify_auth_state");

  return NextResponse.redirect(new URL("/", req.url));
}
