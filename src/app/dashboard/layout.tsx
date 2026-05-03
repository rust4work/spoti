import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AutoRedirect } from "@/components/auth/AutoRedirect";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_access_token");
  const refreshToken = cookieStore.get("spotify_refresh_token");

  if (!token && refreshToken) {
    return <AutoRedirect to="/api/auth/refresh?returnTo=/dashboard" />;
  }

  if (!token && !refreshToken) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
