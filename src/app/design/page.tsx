export default function Home() {
  return (
    <div className="container py-16 space-y-12">
      <section>
        <h1 className="text-3xl font-bold">Design System – Aperçu</h1>
        <p className="text-zinc-500 text-sm mt-2">
          Voici un aperçu visuel des styles globaux appliqués avec Tailwind v4.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Typographie</h2>
        <p className="text-sm">Texte de base (text-sm)</p>
        <p className="text-base">Texte normal (text-base)</p>
        <p className="text-lg font-medium">
          Texte plus gros (text-lg font-medium)
        </p>
        <p className="text-2xl font-bold">Titre (text-2xl font-bold)</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Couleurs</h2>
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded bg-background text-foreground border border-zinc-200">
            Fond : <code>bg-background</code> / Texte :{" "}
            <code>text-foreground</code>
          </div>
          <div className="p-4 rounded bg-zinc-100 text-black border border-zinc-200">
            bg-zinc-100 / Texte noir
          </div>
          <div className="p-4 rounded bg-zinc-900 text-white">
            bg-zinc-900 / Texte blanc
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Exemple de Layout</h2>
        <div className="p-6 bg-zinc-100 rounded-lg">
          <p className="text-sm text-zinc-600">
            Boîte de contenu avec padding, fond clair et arrondis.
          </p>
        </div>
      </section>
    </div>
  );
}
