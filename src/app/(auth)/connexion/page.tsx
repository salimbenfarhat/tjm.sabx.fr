// src/app/(auth)/connexion/page.tsx
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import AuthForm from "@/components/auth/AuthForm";

export default function ConnexionPage() {
  return (
    <AuthFormWrapper title="Connexion">
      <AuthForm initialMode="login" />
    </AuthFormWrapper>
  );
}