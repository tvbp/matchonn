export interface StepDef {
  key: string;
  label: string;
}

export default function Stepper({ steps, currentKey }: { steps: StepDef[]; currentKey: string }) {
  const matchedIndex = steps.findIndex((s) => s.key === currentKey);
  // A key past the end of `steps` (e.g. a final "done" screen not listed as
  // its own step) means the whole sequence is complete — show every step
  // as done rather than resetting to "nothing started".
  const currentIndex = matchedIndex === -1 ? steps.length : matchedIndex;

  return (
    <ol className="mb-10 flex items-start">
      {steps.map((s, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <li key={s.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2 text-center">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isDone
                    ? "bg-brand-600 text-white"
                    : isCurrent
                      ? "border-2 border-brand-600 bg-white text-brand-600"
                      : "border-2 border-stone-200 bg-white text-stone-400"
                }`}
              >
                {isDone ? "✓" : i + 1}
              </span>
              <span
                className={`w-20 text-xs font-medium leading-tight ${
                  isDone || isCurrent ? "text-stone-700" : "text-stone-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className={`mx-2 h-0.5 flex-1 ${isDone ? "bg-brand-600" : "bg-stone-200"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
