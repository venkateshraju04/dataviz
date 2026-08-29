import { useEffect, useState } from "react";

const STEPS = [
  { label: "Reading your data…", icon: "📂" },
  { label: "Generating analysis code…", icon: "🧠" },
  { label: "Running the code…", icon: "⚡" },
  { label: "Summarizing results…", icon: "📝" },
];

/**
 * Multi-step loading indicator that cycles through AI pipeline stages
 * to keep the user engaged during the 5-15 second analysis.
 */
export default function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-rise flex flex-col items-center justify-center py-16">
      {/* Pulsing loader */}
      <div className="relative">
        <div className="size-16 rounded-2xl bg-accent/10 animate-pulse" />
        <span className="absolute inset-0 grid place-items-center text-2xl">
          {STEPS[currentStep].icon}
        </span>
      </div>

      {/* Current step label */}
      <p className="mt-6 font-display text-lg font-medium text-ink">
        {STEPS[currentStep].label}
      </p>
      <p className="mt-2 text-sm text-soft">This usually takes 5–15 seconds</p>

      {/* Step indicators */}
      <div className="mt-8 flex items-center gap-3">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`flex size-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-500 ${
                i < currentStep
                  ? "bg-accent text-white"
                  : i === currentStep
                    ? "bg-accent/15 text-accent ring-2 ring-accent/30"
                    : "bg-line/60 text-soft"
              }`}
            >
              {i < currentStep ? (
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-6 rounded-full transition-colors duration-500 ${
                  i < currentStep ? "bg-accent" : "bg-line"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Shimmer bars */}
      <div className="mt-10 w-full max-w-sm space-y-3">
        <div className="h-3 animate-pulse rounded-full bg-line/60" style={{ width: "85%" }} />
        <div className="h-3 animate-pulse rounded-full bg-line/40" style={{ width: "65%", animationDelay: "200ms" }} />
        <div className="h-3 animate-pulse rounded-full bg-line/30" style={{ width: "45%", animationDelay: "400ms" }} />
      </div>
    </div>
  );
}
