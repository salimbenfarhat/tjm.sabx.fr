// src/app/(auth)/inscription/page.tsx
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import AuthForm from "@/components/auth/AuthForm";

export default function InscriptionPage() {
  return (
    <AuthFormWrapper title="Créer un compte">
      <AuthForm initialMode="signup" />
    </AuthFormWrapper>
  );
}