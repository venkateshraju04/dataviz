import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import FileUpload from "../components/FileUpload";
import DataPreview from "../components/DataPreview";
import AnalysisResults from "../components/AnalysisResults";
import LoadingState from "../components/LoadingState";
import { analyzeData, type AnalysisResult } from "../lib/api";

export const Route = createFileRoute("/analyze")({
  component: AnalyzePage,
  head: () => ({
    meta: [
      { title: "Analyze — DataViz" },
      {
        name: "description",
        content:
          "Upload your dataset and ask plain-English questions. DataViz AI generates charts and insights instantly.",
      },
    ],
    links: [{ rel: "canonical", href: "/analyze" }],
  }),
});

const EXAMPLE_QUERIES = [
  "Plot total sales by region as a bar chart",
  "Show the distribution of ages as a histogram",
  "Calculate average revenue per category and visualize it",
  "Clean missing values and plot a correlation heatmap",
  "Show the monthly trend of signups over time",
];

function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!file || !query.trim()) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await analyzeData(file, query.trim());
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [file, query]);

  const handleClear = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
  }, []);

  const canRun = file !== null && query.trim().length > 0 && !isLoading;

  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased selection:bg-accent/15">
      {/* Header */}
      <header className="border-b border-line">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-md bg-accent">
              <span className="size-2 rounded-sm bg-paper" />
            </span>
            <span className="font-display text-[17px] font-semibold tracking-tight">DataViz</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-soft">
            <Link to="/" className="transition-colors hover:text-ink">Home</Link>
            <span className="text-line">/</span>
            <span className="font-medium text-ink">Analysis</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* ---- Left panel: Inputs ---- */}
          <aside className="lg:col-span-4 xl:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* File upload */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-soft">
                  Dataset
                </label>
                <FileUpload file={file} onFileSelect={setFile} onClear={handleClear} />
              </div>

              {/* Data preview */}
              {file && <DataPreview file={file} />}

              {/* Query input */}
              <div>
                <label
                  htmlFor="query-input"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-soft"
                >
                  Your question
                </label>
                <textarea
                  id="query-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Plot the distribution of ages…"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-soft/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Example queries */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-soft">
                  Try an example
                </p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_QUERIES.map((eq) => (
                    <button
                      key={eq}
                      onClick={() => setQuery(eq)}
                      className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs text-soft transition-all hover:border-accent/40 hover:text-ink hover:bg-accent/[0.03]"
                    >
                      {eq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Run button */}
              <button
                onClick={handleAnalyze}
                disabled={!canRun}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
                  canRun
                    ? "bg-accent text-white ring-1 ring-inset ring-accent/40 hover:bg-accent/90 active:scale-[0.98]"
                    : "cursor-not-allowed bg-line text-soft"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Analyzing…
                  </>
                ) : (
                  <>
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                    Run Analysis
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* ---- Right panel: Results ---- */}
          <main className="lg:col-span-8 xl:col-span-8">
            {/* Loading */}
            {isLoading && <LoadingState />}

            {/* Results */}
            {!isLoading && result && <AnalysisResults result={result} />}

            {/* Error */}
            {!isLoading && error && !result && (
              <div className="animate-rise rounded-xl border border-red-200 bg-red-50 p-6">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-100">
                    <svg className="size-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-red-800">Analysis failed</p>
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                    <button
                      onClick={handleAnalyze}
                      className="mt-3 rounded-md bg-red-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !result && !error && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="grid size-20 place-items-center rounded-2xl bg-accent/5 ring-1 ring-accent/10">
                  <svg className="size-10 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <h2 className="mt-6 font-display text-xl font-semibold text-ink">Ready to analyze</h2>
                <p className="mt-2 max-w-[32ch] text-sm text-soft">
                  Upload a dataset and ask a question to generate charts and insights instantly.
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-soft">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent/50" />
                    CSV & Excel
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent/50" />
                    Plain English
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent/50" />
                    AI-powered
                  </span>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
