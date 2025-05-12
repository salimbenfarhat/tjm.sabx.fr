import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/connexion");
    return null;
  }

  const user = session.user;
  console.log("isPremium value:", user.isPremium);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Dashboard{" "}
          {user.isPremium && (
            <span className="text-sm bg-yellow-400 text-black px-2 py-1 rounded ml-2">
              PREMIUM
            </span>
          )}
        </h1>
        <p className="text-zinc-600">Bienvenue, {session.user.email}</p>
      </div>

      <nav className="flex gap-4 text-sm">
        <Link href="/dashboard" className="underline">
          Dashboard
        </Link>
        <Link href="/dashboard/historiques" className="underline">
          Historiques
        </Link>
        <Link href="/dashboard/parametres" className="underline">
          Paramètres
        </Link>
      </nav>

      {user.isPremium ? (
        <p className="text-green-600 font-semibold">
          ✅ Abonnement Premium actif
        </p>
      ) : (
        <form action="/api/stripe/checkout" method="POST">
          <Button type="submit">🔓 Débloquer Premium</Button>
        </form>
      )}

      <LogoutButton />
    </div>
  );
}
