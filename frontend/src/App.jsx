import { useState, useRef } from 'react';
import { 
  BarChart3, Upload, FileText, Send, 
  Terminal, Activity, CheckCircle2, AlertCircle, X, ChevronDown, ChevronUp
} from 'lucide-react';
import './index.css';

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showCode, setShowCode] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    if (selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.xlsx')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a CSV or Excel file.");
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const runAnalysis = async () => {
    if (!file) {
      setError("Please upload a dataset first.");
      return;
    }
    if (!query.trim()) {
      setError("Please enter a query to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('query', query);

    try {
      // In production, point to your API URL
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <Activity size={28} color="#6366f1" />
        <h1>Dataviz AI</h1>
      </header>

      <main className="main-content">
        {/* Sidebar / Configuration Panel */}
        <aside className="sidebar">
          <div className="glass-panel">
            <h2 className="section-title">
              <FileText size={20} /> Data Source
            </h2>
            
            {!file ? (
              <div 
                className="upload-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={32} className="upload-icon" />
                <p className="upload-text">Drag & drop CSV/Excel here</p>
                <p className="upload-text" style={{ fontSize: '0.8rem', marginTop: '4px' }}>or click to browse</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept=".csv,.xlsx"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="file-selected">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <CheckCircle2 size={18} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}>
                    {file.name}
                  </span>
                </div>
                <button onClick={clearFile} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}>
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="glass-panel">
            <h2 className="section-title">
              <Terminal size={20} /> Analysis Query
            </h2>
            <div className="input-group">
              <textarea 
                className="modern-input"
                placeholder="E.g. Clean missing values and plot total sales by region as a bar chart..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="glass-panel" style={{ borderColor: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--danger)' }}>
                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{error}</span>
              </div>
            </div>
          )}

          <button 
            className="btn" 
            onClick={runAnalysis} 
            disabled={isLoading || !file || !query.trim()}
          >
            {isLoading ? (
              <Activity size={18} className="spinner" />
            ) : (
              <Send size={18} />
            )}
            {isLoading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </aside>

        {/* Main Content / Results Panel */}
        <section className="content-area">
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            
            {isLoading ? (
              <div className="loader-overlay">
                <Activity size={48} className="spinner" />
                <p>Agent is inspecting data and writing code...</p>
              </div>
            ) : result ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Agent Summary & Plot */}
                <div className="result-grid">
                  <div>
                    <h2 className="section-title"><CheckCircle2 size={20} color="var(--success)" /> Agent Insights</h2>
                    <div className="markdown-body">
                      {/* Simple formatting for the analysis text */}
                      {result.analysis.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="section-title"><BarChart3 size={20} /> Visualization</h2>
                    {result.plot ? (
                      <div className="plot-container">
                        <img 
                          src={`data:image/png;base64,${result.plot}`} 
                          alt="Generated Visualization" 
                          className="plot-image" 
                        />
                      </div>
                    ) : (
                      <div className="empty-state" style={{ minHeight: '200px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                        <p>No visualization generated.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Generated Code Expander */}
                {result.generated_code && (
                  <div style={{ marginTop: 'auto' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ justifyContent: 'space-between' }}
                      onClick={() => setShowCode(!showCode)}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Terminal size={18} /> View Generated Code
                      </span>
                      {showCode ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    
                    {showCode && (
                      <div style={{ marginTop: '16px', animation: 'fadeIn 0.3s ease' }}>
                        <div className="code-header">
                          <span className="code-title">Python (pandas/matplotlib)</span>
                        </div>
                        <div className="code-content">
                          {result.generated_code}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
              </div>
            ) : (
              <div className="empty-state">
                <BarChart3 size={64} />
                <h3 style={{ fontSize: '1.25rem', color: '#e2e8f0', margin: '8px 0' }}>Ready for Analysis</h3>
                <p style={{ maxWidth: '400px', lineHeight: '1.6' }}>
                  Upload a dataset from the sidebar and describe what you want to discover. 
                  The AI will automatically generate Python code, execute it, and provide insights.
                </p>
              </div>
            )}
            
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
