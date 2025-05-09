export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-center py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-100 via-white to-white dark:from-zinc-900 dark:via-black dark:to-black opacity-60 animate-pulse" />

      <div className="container max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Calcule ton{" "}
          <span className="text-black dark:text-white">TJM freelance</span>
        </h1>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
          Estime ton taux journalier idéal en fonction de ton revenu souhaité,
          des jours facturables, des charges sociales et des impôts.
        </p>
      </div>
    </section>
  );
}
