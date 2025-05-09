import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl shadow-sm">
      {children}
    </div>
  );
}
