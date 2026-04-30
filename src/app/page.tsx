import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LandingPageContent } from "./LandingPageContent";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_access_token");

  if (token) {
    redirect("/dashboard");
  }

  return <LandingPageContent />;
}
