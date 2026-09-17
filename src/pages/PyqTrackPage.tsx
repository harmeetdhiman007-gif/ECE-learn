import { Link, useParams } from 'react-router-dom';
import { QUESTIONS_PER_PAPER, getPyqTrack } from '../lib/pyq/index.js';

export default function PyqTrackPage() {
  const { track } = useParams();
  const meta = getPyqTrack(track);
  if (!meta) {
    return (
      <div className="empty-state">
        <h1>🤖 Track not found</h1>
        <p>That AI column doesn’t exist — pick ECE, CSE/IT or PCB Design.</p>
        <Link to="/pyq" className="btn-primary">All PYQ columns →</Link>
      </div>
    );
  }

  const unit = meta.paperWord.toLowerCase();

  return (
    <div className="page">
      <div className="page-head">
        <h1>
          {meta.emoji} {meta.gate ? `GATE ${meta.exam}` : meta.title} — PYQ AI
        </h1>
        <p className="page-sub">
          {meta.years.length} {unit}s · {QUESTIONS_PER_PAPER} questions each.
          Pick one, answer the {unit}, and read the AI explainer after every
          question. +10 XP per correct answer.
        </p>
      </div>

      <div className="pyq-grid">
        {meta.years.map((y) => (
          <Link key={y} to={`/pyq/${meta.id}/${y}`} className="pyq-year">
            <span className="pyq-year-num">{y}</span>
            <span className="pyq-year-meta">
              <span className="pyq-year-label">
                {meta.exam} {meta.paperWord} {y}
              </span>
              <span className="pyq-year-sub">
                {QUESTIONS_PER_PAPER} questions · AI explainer included
              </span>
            </span>
            <span className="pyq-year-arrow">→</span>
          </Link>
        ))}
      </div>

      <Link to="/pyq" className="text-link">
        ← All PYQ columns
      </Link>
    </div>
  );
}