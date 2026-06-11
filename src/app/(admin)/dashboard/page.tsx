import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import DashboardClient from "./dashboard-client";

async function DashboardContent() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  interface SessionUser {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    role?: string;
  }

  if (!session || (session.user as SessionUser).role !== "admin") {
    redirect("/");
  }

  return <DashboardClient />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}