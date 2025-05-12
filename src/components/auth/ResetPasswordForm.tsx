// src/components/auth/ResetPasswordForm.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";
import { resetEmailSchema } from "@/lib/validators/reset";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const validation = resetEmailSchema.safeParse({ email });
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message || "Email invalide");
      setLoading(false);
      return;
    }

    try {
      await authClient.forgetPassword({
        email,
        redirectTo: "/reinitialiser-mdp/nouveau",
      });
      toast.success("Lien de réinitialisation envoyé");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Erreur inattendue");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleReset} className="space-y-4">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Button type="submit" disabled={loading}>
          Réinitialiser le mot de passe
        </Button>
      </form>
      <p className="text-sm text-zinc-600">
        Vous vous souvenez de votre mot de passe ?{" "}
        <Link href="/connexion" className="underline">
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
