import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AnalysisResult } from "../lib/api";
import { toast } from "sonner";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <div className="space-y-5">
      {/* Error banner */}
      {result.error && (
        <div className="animate-rise rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100/60 p-6">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-red-100 ring-1 ring-red-200/60">
              <svg className="size-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-red-800">Analysis encountered an error</p>
              <p className="mt-1 text-xs leading-relaxed text-red-600 whitespace-pre-wrap">{result.error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Analysis summary — rendered as Markdown */}
      {result.analysis && (
        <div
          className="animate-rise rounded-2xl border border-line bg-white ring-1 ring-black/[0.03]"
          style={{ animationDelay: "50ms" }}
        >
          {/* Card header */}
          <div className="flex items-center gap-2.5 border-b border-line/70 px-6 py-4">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent/15 to-accent/5 ring-1 ring-accent/10">
              <svg className="size-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </span>
            <h3 className="font-display text-sm font-semibold tracking-tight text-ink">Analysis Summary</h3>
          </div>

          {/* Markdown body */}
          <div className="px-6 py-5">
            <div className="prose-dataviz">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {result.analysis}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {result.plot && (
        <div
          className="animate-rise rounded-2xl border border-line bg-white ring-1 ring-black/[0.03]"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex items-center justify-between border-b border-line/70 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 ring-1 ring-emerald-500/10">
                <svg className="size-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-ink">Visualization</span>
            </div>
            <DownloadButton base64={result.plot} />
          </div>
          <div className="p-5">
            <div className="overflow-hidden rounded-xl bg-paper/60 p-3 ring-1 ring-black/[0.03]">
              <img
                src={`data:image/png;base64,${result.plot}`}
                alt="Generated chart"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Generated code */}
      {result.generated_code && (
        <CodeBlock code={result.generated_code} />
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// Sub-components
// --------------------------------------------------------------------------

function DownloadButton({ base64 }: { base64: string }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${base64}`;
    link.download = "dataviz-chart.png";
    link.click();
    toast.success("Chart downloaded");
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-soft ring-1 ring-line transition-all hover:bg-paper hover:text-ink hover:ring-ink/15"
    >
      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      Download
    </button>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="animate-rise rounded-2xl border border-line bg-white ring-1 ring-black/[0.03]"
      style={{ animationDelay: "200ms" }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-paper/60"
      >
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500/15 to-violet-500/5 ring-1 ring-violet-500/10">
            <svg className="size-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink">Generated Code</span>
        </div>
        <svg
          className={`size-4 text-soft transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isExpanded && (
        <div className="border-t border-line/70">
          <div className="flex justify-end px-5 py-2.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-soft ring-1 ring-line transition-all hover:bg-paper hover:text-ink hover:ring-ink/15"
            >
              {copied ? (
                <>
                  <svg className="size-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="mx-5 mb-5 overflow-hidden rounded-xl bg-[#1e1e2e] ring-1 ring-black/10">
            <pre className="overflow-x-auto p-5 text-[13px] leading-[1.7] text-[#cdd6f4]">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
