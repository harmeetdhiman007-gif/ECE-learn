import { Link } from 'react-router-dom';
import { GATE_TRACKS, PYQ_TRACKS, countTrackQuestions } from '../lib/pyq/index.js';

export default function PyqPage() {
  return (
    <div className="page">
      <div className="page-head">
        <h1>🎓 GATE PYQs</h1>
        <p className="page-sub">
          AI-powered GATE practice for ECE and CSE/IT. Each track banks 20
          papers × 65 questions (1300+) plus on-demand subject practice,
          generated from a multi-thousand-question bank. Every question is
          tiered Easy / Medium / Hard so you can jump straight to a harder set,
          and every answer is followed by an AI explainer. +10 XP per correct
          answer.
        </p>
      </div>

      <div className="pyq-note">
        ⚠️ These columns contain original questions written in the GATE paper
        pattern (same sections, mark style, and trap choices) so you can run
        full practice papers — they are practice items, not verbatim copies of
        official IIT papers.
      </div>

      <div className="pyq-columns">
        {GATE_TRACKS.map((id) => {
          const t = PYQ_TRACKS[id];
          const n = countTrackQuestions(id);
          return (
            <Link key={id} to={`/pyq/${id}`} className="pyq-column">
              <span className="pyq-col-emoji">{t.emoji}</span>
              <span className="pyq-col-head">
                <span className="pyq-col-title">GATE {t.exam}</span>
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

      <Link to="/pyq/ece/practice" className="practice-banner">
        <span className="practice-banner-title">⚡ Jump by difficulty</span>
        <span className="practice-banner-sub">
          Straight into subject practice — pick a subject, pick Easy / Medium /
          Hard, get a fresh set now. No year-paper needed.
        </span>
      </Link>

      <Link to="/studio" className="text-link">
        🛠️ Looking for PCB or VLSI? Open the Design Studios →
      </Link>
    </div>
  );
}