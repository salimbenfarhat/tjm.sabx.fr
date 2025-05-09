"use client";

import { useState } from "react";
import SimulationResult from "./SimulationResult";
import { useGuestId } from "@/lib/useGuestId";

export default function TJMSimulator() {
  const guestId = useGuestId();

  const [data, setData] = useState({
    revenueGoal: 50000,
    workDays: 220,
    charges: 25,
    tax: 15,
  });

  const [showResult, setShowResult] = useState(false);
  const [isLimited, setIsLimited] = useState(false);
  const [error, setError] = useState("");

  const handleChange =
    (field: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLimited || showResult) return;
      setData({ ...data, [field]: Number(e.target.value) });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestId) return;

    const res = await fetch("/api/tjm/submit", {
      method: "POST",
    });

    if (res.status === 403) {
      setError(
        "Tu as déjà fait une simulation aujourd’hui. Connecte-toi pour en faire plus."
      );
      setIsLimited(true);
      return;
    }

    if (!res.ok) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    // ✅ CAS RÉUSSI — 1ʳᵉ simulation autorisée
    setShowResult(true);
    setIsLimited(true); // ← important
    setError("Tu as utilisé ton essai gratuit aujourd’hui. Connecte-toi pour en faire plus.");

    // Nettoie l’URL s’il y a un ?
    const url = new URL(window.location.href);
    window.history.replaceState({}, "", url.pathname);
  };

  const gross = data.revenueGoal / (1 - data.tax / 100);
  const total = gross / (1 - data.charges / 100);
  const tjm = Math.round(total / data.workDays);

  const disabled = isLimited || showResult;

  return (
    <section className="card space-y-6">
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        {[
          ["Salaire net souhaité (€/an)", "revenueGoal"],
          ["Jours facturables/an", "workDays"],
          ["Charges sociales (%)", "charges"],
          ["Impôts (%)", "tax"],
        ].map(([label, key]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="number"
              className="input"
              value={data[key as keyof typeof data]}
              onChange={handleChange(key as keyof typeof data)}
              disabled={disabled}
            />
          </div>
        ))}

        <button
          type="submit"
          className="btn col-span-full w-full cursor-pointer disabled:cursor-not-allowed"
          disabled={disabled || !guestId}
        >
          {isLimited ? "Limite atteinte" : "Calculer"}
        </button>

        {error && (
          <p className="text-sm text-red-600 mt-2 col-span-full text-center">
            {error}
            {isLimited && (
              <>
                <br />
                <a href="/login" className="underline">
                  Connecte-toi
                </a>{" "}
                ou{" "}
                <a href="/upgrade" className="underline">
                  passe en premium
                </a>{" "}
                pour débloquer.
              </>
            )}
          </p>
        )}
      </form>

      {showResult && (
        <div>
          <SimulationResult tjm={tjm} totalRevenue={Math.round(total)} />
        </div>
      )}
    </section>
  );
}
