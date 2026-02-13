import React, { useState } from "react";
import axios from "axios";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const res = await axios.post("http://localhost:8000/api/upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setResult(res.data);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Processing..." : "Upload"}
      </button>

      {result && (
        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold">Summary</h2>
            <pre>{result.materials.summary}</pre>
          </div>

          <div>
            <h2 className="text-xl font-bold">Flashcards</h2>
            {result.materials.flashcards.map((c: any, i: number) => (
              <div key={i} className="border p-2 my-2">
                <b>Q:</b> {c.question} <br />
                <b>A:</b> {c.answer}
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-bold">Quiz</h2>
            {result.materials.quiz.map((q: any, i: number) => (
              <div key={i} className="border p-2 my-2">
                <b>{q.question}</b>
                <ul>
                  {q.options.map((o: string, j: number) => (
                    <li key={j}>{o}</li>
                  ))}
                </ul>
                <p><b>Answer:</b> {q.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
