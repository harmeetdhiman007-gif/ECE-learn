import { Link } from 'react-router-dom';
import { PYQ_TRACKS, countTrackQuestions } from '../lib/pyq/index.js';
import type { PyqTrackId } from '../lib/pyq/index.js';

export default function PyqPage() {
  const tracks: PyqTrackId[] = ['ece', 'cse', 'pcb'];
  return (
    <div className="page">
      <div className="page-head">
        <h1>🤖 PYQ AI Columns</h1>
        <p className="page-sub">
          Three AI-powered practice columns — GATE ECE, GATE CSE/IT, and the
          PCB Design Studio. Each track banks 20 papers × 65 questions (1300+)
          spanning 2005–2024, generated from a 1000+ question bank. Every
          answer is followed by an AI-style explainer that shows the concept
          and why the distractors are wrong. Each correct answer banks +10 XP.
        </p>
      </div>

      <div className="pyq-note">
        ⚠️ These columns contain original questions written in the GATE paper
        pattern (same sections, mark style, and trap choices) so you can run
        full practice papers — they are practice items, not verbatim copies of
        official IIT papers.
      </div>

      <div className="pyq-columns">
        {tracks.map((id) => {
          const t = PYQ_TRACKS[id];
          const n = countTrackQuestions(id);
          return (
            <Link key={id} to={`/pyq/${id}`} className="pyq-column">
              <span className="pyq-col-emoji">{t.emoji}</span>
              <span className="pyq-col-head">
                <span className="pyq-col-title">
                  {t.gate ? `GATE ${t.exam}` : t.title}
                </span>
                <span className="pyq-col-sub">{t.title}</span>
              </span>
              <span className="pyq-col-blurb">{t.blurb}</span>
              <span className="pyq-col-foot">
                <span>
                  {t.years.length} {t.paperWord.toLowerCase()}s · {n} questions
                </span>
                <span className="pyq-col-cta">Open the AI column →</span>
              </span>
            </Link>
          );
        })}
      </div>

      <Link to="/gate" className="text-link">
        ← Back to GATE ECE Prep
      </Link>
    </div>
  );
}