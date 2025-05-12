// src/app/(auth)/reinitialiser-mdp/page.tsx
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ReinitialiserMdpPage() {
  return (
    <AuthFormWrapper title="Mot de passe oublié">
      <ResetPasswordForm />
    </AuthFormWrapper>
  );
}
