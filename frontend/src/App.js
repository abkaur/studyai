import React, { useMemo, useState } from "react";
import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filename = useMemo(() => (file ? file.name : ""), [file]);

  async function handleUpload() {
    setError("");
    setResult(null);

    if (!file) {
      setError("Please choose a PDF file first.");
      return;
    }

    // Optional safety check
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      // IMPORTANT: match your backend route
      const res = await fetch("http://127.0.0.1:8000/api/upload/upload/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Upload failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(
        "Upload failed. Check backend terminal logs. Details: " +
          (e?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  }

  const materials = result?.materials;

  return (
    <div className="page">
      <div className="bgGlow" />

      <header className="topbar">
        <div className="brand">
          <div className="logo">S</div>
          <div>
            <h1>StudyAI</h1>
            <p>Upload a PDF and get a summary, flashcards, and a quiz.</p>
          </div>
        </div>
        <span className="badge">V1.0</span>
      </header>

      <main className="container">
        <section className="card">
          <h2>Upload</h2>
          <p className="muted">
            Supported format: <b>.pdf</b>
          </p>

          <div className="uploadRow">
            <label className="fileBtn">
              Choose PDF
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            <button
              className="primaryBtn"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {filename && (
            <div className="filePill" title={filename}>
              <span className="dot" />
              {filename}
            </div>
          )}

          {error && <div className="errorBox">{error}</div>}
        </section>

        {materials && (
          <section className="grid">
            {/* Summary */}
            <div className="card section">
              <div className="sectionHeader">
                <h3>Summary</h3>
                <span className="chip">AI</span>
              </div>
              <div className="contentBox">
                <pre className="pre">{materials.summary}</pre>
              </div>
            </div>

            {/* Flashcards */}
            <div className="card section">
              <div className="sectionHeader">
                <h3>Flashcards</h3>
                <span className="chip">{materials.flashcards?.length || 0}</span>
              </div>

              <div className="stack">
                {(materials.flashcards || []).map((fc, i) => (
                  <details className="accordion" key={i}>
                    <summary>
                      <span className="qLabel">Q{i + 1}</span>
                      {fc.question}
                    </summary>
                    <div className="answer">{fc.answer}</div>
                  </details>
                ))}
              </div>
            </div>

            {/* Quiz */}
            <div className="card section full">
              <div className="sectionHeader">
                <h3>Quiz</h3>
                <span className="chip">{materials.quiz?.length || 0}</span>
              </div>

              <div className="stack">
                {(materials.quiz || []).map((q, i) => (
                  <div className="quizCard" key={i}>
                    <div className="quizQ">
                      <span className="qLabel">Q{i + 1}</span>
                      <b>{q.question}</b>
                    </div>

                    <ul className="options">
                      {(q.options || []).map((op, j) => (
                        <li key={j} className="optionItem">
                          {op}
                        </li>
                      ))}
                    </ul>

                    <div className="quizMeta">
                      <div className="ans">
                        <span>Answer</span>
                        <b>{q.answer}</b>
                      </div>
                      {q.explanation && (
                        <div className="exp">
                          <span>Explanation</span>
                          <div>{q.explanation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {!materials && (
          <section className="hint">
            <div className="hintCard">
              <h3>Tip</h3>
              <p>
                Upload a PDF lecture slide/notes file and you’ll see the results
                here.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <span>StudyAI • AI Study Assistant</span>
      </footer>
    </div>
  );
}
