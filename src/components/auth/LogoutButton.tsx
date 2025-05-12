// src/components/auth/LogoutButton.tsx
'use client';

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/Button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/connexion");
    router.refresh();
  }

  return <Button onClick={handleLogout}>Se déconnecter</Button>;
}