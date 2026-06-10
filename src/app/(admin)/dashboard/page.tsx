import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
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
