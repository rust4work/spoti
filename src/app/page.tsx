import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LandingPageContent } from "./LandingPageContent";
import { AutoRedirect } from "@/components/auth/AutoRedirect";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_access_token");
  const refreshToken = cookieStore.get("spotify_refresh_token");

  if (token) {
    redirect("/dashboard");
  }

  if (refreshToken) {
    return <AutoRedirect to="/api/auth/refresh?returnTo=/dashboard" />;
  }

  return <LandingPageContent />;
}
