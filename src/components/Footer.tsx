export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-12 text-sm text-center text-zinc-500">
      <p>
        © {new Date().getFullYear()} TJM.sabx.fr — conçu avec Next.js, Tailwind
        & Supabase.
      </p>
    </footer>
  );
}
