"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { newPasswordSchema } from "@/lib/validators/reset-password";

export default function NewPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      toast.error("Lien invalide ou expiré.");
      return;
    }

    const result = newPasswordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Erreur de validation");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.resetPassword({
        token,
        newPassword: result.data.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Mot de passe mis à jour !");
        router.push("/connexion");
      }
    } catch {
      toast.error("Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <div className="relative">
        <Input
          id="new-password"
          name="newPassword"
          type={show ? "text" : "password"}
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-zinc-500"
          onClick={() => setShow((s) => !s)}
        >
          {show ? "Cacher" : "Voir"}
        </button>
      </div>
      <Input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        Réinitialiser
      </Button>
    </form>
  );
}
