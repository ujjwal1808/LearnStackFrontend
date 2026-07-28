import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import url from "../../lib/url";

// ─── initial blank form ───────────────────────────────────────────────────────
const BLANK = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "",
};

// ─── small helper: label colours ─────────────────────────────────────────────
const OPTION_META = [
  { key: "optionA", label: "A", color: "bg-blue-50 border-blue-200" },
  { key: "optionB", label: "B", color: "bg-purple-50 border-purple-200" },
  { key: "optionC", label: "C", color: "bg-amber-50  border-amber-200" },
  { key: "optionD", label: "D", color: "bg-rose-50   border-rose-200" },
];

export default function CreateAssessment() {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();
  const {courseId} = useParams();   // passed from chapter creation redirect

  const [form,    setForm]    = useState(BLANK);
  const [saved,   setSaved]   = useState([]);   // questions saved in this session
  const [loading, setLoading] = useState("");   // "more" | "done" | ""
  const [error,   setError]   = useState("");

  // guard: courseId must be present
  useEffect(() => {
    if (!courseId) {
      setError("No courseId found in URL. Please start from the course creation flow.");
    }
  }, [courseId]);

  // ── field change ─────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // ── validate ─────────────────────────────────────────────────────────────
  const validate = () => {
    if (!form.question.trim())      return "Question is required.";
    if (!form.optionA.trim())       return "Option A is required.";
    if (!form.optionB.trim())       return "Option B is required.";
    if (!form.optionC.trim())       return "Option C is required.";
    if (!form.optionD.trim())       return "Option D is required.";
    if (!form.correctAnswer)        return "Please select the correct answer.";
    return null;
  };

  // ── shared POST call ──────────────────────────────────────────────────────
  const postAssessment = async () => {
    const payload = { ...form, courseId: Number(courseId) };
    const res = await axios.post(`${url}assessment/create`, payload);
    return res.data;   // returns saved Assessment from backend
  };

  // ── "Save & Add More" ─────────────────────────────────────────────────────
  const handleSaveAndAddMore = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setLoading("more");
    try {
      const saved_item = await postAssessment();
      setSaved((prev) => [...prev, saved_item]);
      setForm(BLANK);   // clear form → instructor can type next question immediately
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to save. Please try again.");
    } finally {
      setLoading("");
    }
  };

  // ── "Save" (final) ────────────────────────────────────────────────────────
  const handleSave = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setLoading("done");
    try {
      await postAssessment();
      // All questions saved — redirect instructor to dashboard or course list
      navigate("/instructor/dashboard");
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to save. Please try again.");
      setLoading("");
    }
  };

  // ── skip (instructor already done before filling this last form) ──────────
  const handleSkip = () => {
    if (saved.length === 0) {
      setError("Please create at least one assessment question before finishing.");
      return;
    }
    navigate("/instructor/dashboard");
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <p className="text-sm text-indigo-600 font-semibold uppercase tracking-widest mb-1">
            Step 3 of 3
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Create Assessment</h1>
          <p className="text-gray-500 mt-1">
            Add one question at a time. Use <strong>Save &amp; Add More</strong> to keep going,
            or <strong>Save</strong> when you're done.
          </p>
        </div>

        {/* ── Progress pill: questions saved this session ── */}
        {saved.length > 0 && (
          <div className="mb-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              {saved.length} question{saved.length > 1 ? "s" : ""} saved
            </span>
          </div>
        )}

        {/* ── Form card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          {/* Question */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question <span className="text-red-500">*</span>
            </label>
            <textarea
              name="question"
              value={form.question}
              onChange={handleChange}
              rows={3}
              placeholder="Type your question here..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          {/* Options */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Options <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {OPTION_META.map(({ key, label, color }) => (
                <div key={key} className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${color}`}>
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-current text-xs font-bold text-gray-600 shrink-0">
                    {label}
                  </span>
                  <input
                    type="text"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    placeholder={`Option ${label}`}
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correct Answer <span className="text-red-500">*</span>
            </label>
            <select
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Select correct option --</option>
              <option value={form.optionA}>A — {form.optionA || "(fill option A first)"}</option>
              <option value={form.optionB}>B — {form.optionB || "(fill option B first)"}</option>
              <option value={form.optionC}>C — {form.optionC || "(fill option C first)"}</option>
              <option value={form.optionD}>D — {form.optionD || "(fill option D first)"}</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Save & Add More */}
            <button
              onClick={handleSaveAndAddMore}
              disabled={loading !== ""}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl px-5 py-3 text-sm hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "more" ? (
                <Spinner />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
              )}
              Save &amp; Add More
            </button>

            {/* Save (final) */}
            <button
              onClick={handleSave}
              disabled={loading !== ""}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold rounded-xl px-5 py-3 text-sm hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "done" ? (
                <Spinner white />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              )}
              Save
            </button>

          </div>

          {/* Skip link — only show if at least 1 question already saved */}
          {saved.length > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
              >
                I'm done — go to dashboard without saving this form
              </button>
            </div>
          )}

        </div>

        {/* ── Saved questions preview (collapsible list) ── */}
        {saved.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Questions added this session
            </h2>
            <div className="space-y-3">
              {saved.map((q, i) => (
                <div key={q.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4">
                  <p className="text-sm font-semibold text-gray-800">
                    Q{i + 1}. {q.question}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-500">
                    <span>A. {q.optionA}</span>
                    <span>B. {q.optionB}</span>
                    <span>C. {q.optionC}</span>
                    <span>D. {q.optionD}</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-green-600">
                    ✓ Correct: {q.correctAnswer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── tiny spinner ──────────────────────────────────────────────────────────────
function Spinner({ white }) {
  return (
    <svg
      className={`w-4 h-4 animate-spin ${white ? "text-white" : "text-indigo-600"}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
  );
}
