/**
 * API client for the DataViz FastAPI backend.
 *
 * Sends multipart/form-data (file + query) to POST /api/analyze
 * and returns a typed AnalysisResult.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AnalysisResult {
  success: boolean;
  analysis: string;
  generated_code: string;
  /** Base-64 encoded PNG, or null when no plot was generated. */
  plot: string | null;
  error: string | null;
}

export interface ApiError {
  detail: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const API_BASE_URL: string =
  (import.meta as Record<string, Record<string, string>>).env
    ?.VITE_API_BASE_URL ?? "http://localhost:8000";

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Upload a dataset file and a plain-English query to the AI analysis pipeline.
 *
 * @param file  - CSV or Excel file to analyse.
 * @param query - Natural-language question about the data.
 * @returns       The backend's analysis result.
 * @throws        An `Error` whose message is the backend `detail` string on failure.
 */
export async function analyzeData(
  file: File,
  query: string,
  signal?: AbortSignal,
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("query", query);

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    body: formData,
    signal,
    // Do NOT set Content-Type — the browser sets the correct multipart boundary.
  });

  if (!response.ok) {
    let message = `Analysis failed (${response.status})`;
    try {
      const body = (await response.json()) as ApiError;
      if (body.detail) message = body.detail;
    } catch {
      // response body wasn't JSON — keep generic message
    }
    throw new Error(message);
  }

  return (await response.json()) as AnalysisResult;
}
