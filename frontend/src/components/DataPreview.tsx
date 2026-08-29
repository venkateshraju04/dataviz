import { useMemo } from "react";

interface DataPreviewProps {
  file: File;
}

/**
 * Parses the first `maxRows` rows of a CSV string (handles basic quoting).
 * Not a full RFC-4180 parser — good enough for a quick preview.
 */
function parseCsvPreview(text: string, maxRows = 5): { headers: string[]; rows: string[][] } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };

  const split = (line: string) =>
    line.split(",").map((cell) => cell.replace(/^"|"$/g, "").trim());

  const headers = split(lines[0]);
  const rows = lines.slice(1, 1 + maxRows).map(split);
  return { headers, rows };
}

export default function DataPreview({ file }: DataPreviewProps) {
  const preview = useMemo(() => {
    // Only parse CSV on the client
    if (!file.name.toLowerCase().endsWith(".csv")) {
      return null;
    }

    // We read only the first 64 KB for a lightweight preview
    const reader = new FileReader();
    const promise = new Promise<{ headers: string[]; rows: string[][]; totalHint: string }>((resolve) => {
      reader.onload = () => {
        const text = reader.result as string;
        const totalLines = text.split(/\r?\n/).filter((l) => l.trim()).length - 1; // minus header
        const { headers, rows } = parseCsvPreview(text);
        resolve({ headers, rows, totalHint: `${totalLines} rows × ${headers.length} columns` });
      };
    });
    reader.readAsText(file.slice(0, 65_536));
    return promise;
  }, [file]);

  // Render via a simple hook-based approach with state
  return <DataPreviewInner promise={preview} fileName={file.name} />;
}

// --------------------------------------------------------------------------

import { useEffect, useState } from "react";

function DataPreviewInner({
  promise,
  fileName,
}: {
  promise: Promise<{ headers: string[]; rows: string[][]; totalHint: string }> | null;
  fileName: string;
}) {
  const [data, setData] = useState<{ headers: string[]; rows: string[][]; totalHint: string } | null>(null);

  useEffect(() => {
    if (!promise) return;
    let cancelled = false;
    promise.then((d) => {
      if (!cancelled) setData(d);
    });
    return () => {
      cancelled = true;
    };
  }, [promise]);

  if (!promise) {
    // Non-CSV file — show a basic info card
    return (
      <div className="animate-rise rounded-xl border border-line bg-white p-4">
        <p className="text-xs text-soft">
          Preview not available for Excel files — the AI will still read the full dataset.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="animate-rise rounded-xl border border-line bg-white p-4">
        <div className="h-24 animate-pulse rounded-lg bg-line/50" />
      </div>
    );
  }

  return (
    <div className="animate-rise rounded-xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-soft">Data preview</span>
        <span className="text-xs text-soft">{data.totalHint}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-line bg-paper/60">
              {data.headers.map((h, i) => (
                <th key={i} className="whitespace-nowrap px-4 py-2 font-medium text-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-line/60 last:border-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="whitespace-nowrap px-4 py-2 text-soft">
                    {cell || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
