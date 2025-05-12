// src/app/(auth)/reinitialiser-mdp/nouveau/page.tsx
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import NewPasswordForm from "@/components/auth/NewPasswordForm";

export default function NouveauMotDePasse() {
  return (
    <AuthFormWrapper title="Nouveau mot de passe">
      <NewPasswordForm />
    </AuthFormWrapper>
  );
}