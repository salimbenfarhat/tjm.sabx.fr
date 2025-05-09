import TJMSimulator from "@/components/TJMSimulator";

export default function Home() {
  return (
    <>
      <div className="container space-y-20 pb-16">
        <TJMSimulator />

        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Pourquoi utiliser ce simulateur ?</h2>
          <ul className="text-zinc-600 dark:text-zinc-400 text-sm space-y-2">
            <li>✔️ 100% gratuit pour une simulation par jour</li>
            <li>✔️ Pas de compte ? C’est ok. Tu peux tester sans inscription</li>
            <li>✔️ Paiement unique, pas d’abonnement</li>
            <li>✔️ Historique et export PDF pour les freelances sérieux</li>
          </ul>
        </section>

        <section className="text-center">
          <a
            href="/upgrade"
            className="btn px-6 py-3 text-base font-medium inline-block"
          >
            Débloquer les fonctions premium →
          </a>
        </section>
      </div>
    </>
  );
}