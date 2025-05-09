export default function SimulationResult({
  tjm,
  totalRevenue,
}: {
  tjm: number;
  totalRevenue: number;
}) {
  return (
    <div className="p-4 bg-zinc-200 rounded-md">
      <p className="text-sm text-zinc-600">
        Revenu brut nécessaire : <strong>{totalRevenue} €</strong>
      </p>
      <p className="text-lg font-bold mt-2">TJM recommandé : {tjm} €</p>
    </div>
  );
}
