// src/components/auth/AuthForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";
import { signupSchema } from "@/lib/validators/user";
import { toast } from "sonner";

type Mode = "login" | "signup";
type Method = "credentials" | "magic";

export default function AuthForm({
  initialMode = "login",
}: {
  initialMode?: Mode;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [method, setMethod] = useState<Method>("credentials");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";
  const isMagic = method === "magic";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isMagic) {
        await authClient.signIn.magicLink({
          email,
          callbackURL: "/dashboard",
        });
        toast.success("Lien magique envoyé !");
      } else if (isLogin) {
        await authClient.signIn.email({
          email,
          password,
          callbackURL: "/dashboard",
        });
      } else {
        // ✅ Validation avec Zod
        const validation = signupSchema.safeParse({
          email,
          password,
        });

        if (!validation.success) {
          const firstError = validation.error.errors[0]?.message;
          toast.error(firstError || "Erreur de validation");
          return;
        }

        const { error } = await authClient.signUp.email({
          ...validation.data, // ✅ data déjà validée et typée
          name: "", // ✅ requis par l'API même si non affiché
          callbackURL: "/dashboard",
        });

        if (error) throw error;
        toast.success("Vérifiez votre email pour activer votre compte.");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Une erreur inconnue est survenue");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Switch Method */}
      <div className="flex gap-4">
        <Button
          type="button"
          onClick={() => setMethod("credentials")}
          className={
            method === "credentials"
              ? "bg-black text-white"
              : "bg-zinc-200 text-black"
          }
        >
          Email + mot de passe
        </Button>
        <Button
          type="button"
          onClick={() => setMethod("magic")}
          className={
            method === "magic"
              ? "bg-black text-white"
              : "bg-zinc-200 text-black"
          }
        >
          Lien magique
        </Button>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete={isMagic ? "email" : "username"}
          required
        />
        {!isMagic && (
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
          />
        )}
        <Button type="submit" disabled={loading}>
          {isMagic
            ? "Envoyer le lien magique"
            : isLogin
            ? "Se connecter"
            : "Créer un compte"}
        </Button>
      </form>

      {/* Liens */}
      {isLogin ? (
        <p className="text-sm text-zinc-600">
          Pas encore inscrit ?{" "}
          <Link
            href="/inscription"
            className="underline"
            onClick={() => setMode("signup")}
          >
            Créer un compte
          </Link>
        </p>
      ) : (
        <p className="text-sm text-zinc-600">
          Déjà inscrit ?{" "}
          <Link
            href="/connexion"
            className="underline"
            onClick={() => setMode("login")}
          >
            Se connecter
          </Link>
        </p>
      )}

      {isLogin && !isMagic && (
        <p className="text-sm text-zinc-600">
          Mot de passe oublié ?{" "}
          <Link href="/reinitialiser-mdp" className="underline">
            Réinitialiser
          </Link>
        </p>
      )}
    </div>
  );
}
