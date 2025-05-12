// src/app/dashboard/page.tsx
import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";


export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/connexion");
    return null;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-zinc-600">Bienvenue, {session.user.email}</p>

      <LogoutButton />
    </div>
  );
}