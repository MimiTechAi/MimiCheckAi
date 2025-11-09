import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const titleRef = useRef(null);

  // Step 1 fields
  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [geburtsdatum, setGeburtsdatum] = useState('');

  // Step 2 fields
  const [wohnart, setWohnart] = useState('');

  // Step 3 fields
  const [zustimmung, setZustimmung] = useState(false);

  const totalSteps = 3;

  const step1RequiredCount = useMemo(() => {
    let c = 0;
    if (vorname.trim()) c++;
    if (nachname.trim()) c++;
    if (geburtsdatum.trim()) c++;
    return c;
  }, [vorname, nachname, geburtsdatum]);

  const canNext = useMemo(() => {
    if (step === 1) return step1RequiredCount === 3;
    if (step === 2) return !!wohnart;
    if (step === 3) return !!zustimmung;
    return false;
  }, [step, step1RequiredCount, wohnart, zustimmung]);

  const selectWohnartRef = useRef(null);

  useEffect(() => {
    if (step === 2 && selectWohnartRef.current) {
      // focus first field on step change
      selectWohnartRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 ref={titleRef} tabIndex={-1} className="text-2xl font-bold">Onboarding</h1>
          <div data-testid="progress-steps">Schritt {step} von {totalSteps}</div>
        </header>

        {step === 1 && (
          <section aria-labelledby="step-1-title" className="space-y-4">
            <h2 id="step-1-title" className="text-xl font-semibold">Basisdaten</h2>
            <div className="grid gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="vorname">Vorname</label>
                <input
                  id="vorname"
                  data-testid="input-vorname"
                  type="text"
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                  aria-invalid={!vorname}
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="nachname">Nachname</label>
                <input
                  id="nachname"
                  data-testid="input-nachname"
                  type="text"
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                  aria-invalid={!nachname}
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="geburtsdatum">Geburtsdatum</label>
                <input
                  id="geburtsdatum"
                  data-testid="input-geburtsdatum"
                  type="date"
                  value={geburtsdatum}
                  onChange={(e) => setGeburtsdatum(e.target.value)}
                  aria-invalid={!geburtsdatum}
                  className="border rounded px-3 py-2"
                />
              </div>
            </div>
            <div data-testid="progress-fields" className="text-sm text-slate-600">
              {step1RequiredCount} von 3 Feldern ausgefüllt
            </div>
          </section>
        )}

        {step === 2 && (
          <section aria-labelledby="step-2-title" className="space-y-4">
            <h2 id="step-2-title" className="text-xl font-semibold">Lebenssituation</h2>
            <div className="flex flex-col gap-1">
              <label htmlFor="wohnart">Wohnart</label>
              <select
                id="wohnart"
                data-testid="select-wohnart"
                ref={selectWohnartRef}
                value={wohnart}
                onChange={(e) => setWohnart(e.target.value)}
                aria-invalid={!wohnart}
                className="border rounded px-3 py-2"
              >
                <option value="">Bitte wählen</option>
                <option value="miete">Miete</option>
                <option value="eigentum">Eigentum</option>
              </select>
            </div>
          </section>
        )}

        {step === 3 && (
          <section aria-labelledby="step-3-title" className="space-y-4">
            <h2 id="step-3-title" className="text-xl font-semibold">Zustimmung</h2>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                data-testid="checkbox-datenschutz"
                checked={zustimmung}
                onChange={(e) => setZustimmung(e.target.checked)}
                aria-invalid={!zustimmung}
              />
              <span>Datenschutz und Bedingungen akzeptieren</span>
            </label>
          </section>
        )}

        <footer className="flex items-center justify-end gap-3">
          {step > 1 && (
            <button
              type="button"
              data-testid="btn-prev"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="px-4 py-2 rounded border"
            >
              Zurück
            </button>
          )}
          <button
            type="button"
            data-testid="btn-next"
            onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
            disabled={!canNext}
            className={`px-4 py-2 rounded text-white ${canNext ? 'bg-blue-600' : 'bg-slate-400 cursor-not-allowed'}`}
          >
            Weiter
          </button>
        </footer>
      </div>
    </div>
  );
}
