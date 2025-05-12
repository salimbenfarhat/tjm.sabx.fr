// src/components/auth/AuthFormWrapper.tsx
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

export default function AuthFormWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Container>
      <Card>
        <h1 className="text-xl font-semibold mb-4">{title}</h1>
        {children}
      </Card>
    </Container>
  );
}
