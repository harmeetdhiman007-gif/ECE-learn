import { Link, useParams } from 'react-router-dom';
import {
  QUESTIONS_PER_PAPER,
  basePathForTrack,
  getPyqSubjects,
  getPyqTrack,
  pyqDifficultyMix,
} from '../lib/pyq/index.js';

export default function PyqTrackPage() {
  const { track } = useParams();
  const meta = getPyqTrack(track);
  if (!meta) {
    return (
      <div className="empty-state">
        <h1>Track not found</h1>
        <p>
          That track doesn’t exist — pick GATE ECE or CSE/IT.
        </p>
        <Link to="/pyq" className="btn-primary">All GATE tracks →</Link>
      </div>
    );
  }

  const base = basePathForTrack(meta.id);
  const unit = meta.paperWord.toLowerCase();
  const mix = pyqDifficultyMix(meta.id);
  const subjects = getPyqSubjects(meta.id);

  return (
    <div className="page">
      <div className="page-head">
        <h1>
          {meta.emoji} {meta.gate ? `GATE ${meta.exam}` : meta.title}
          {meta.gate ? ' — PYQ AI' : ' — Studio'}
        </h1>
        <p className="page-sub">
          {meta.years.length} {unit}s · {QUESTIONS_PER_PAPER} questions each.
          Every question is tagged Easy / Medium / Hard so you can slice a {unit}
          by tier, or drill one subject. +10 XP per correct answer.
        </p>
        <div className="tier-bar" aria-label="Paper difficulty mix">
          <span className="tier-pill diff-easy">🌱 Easy {mix.easy}</span>
          <span className="tier-pill diff-medium">📖 Medium {mix.medium}</span>
          <span className="tier-pill diff-hard">🔥 Hard {mix.hard}</span>
        </div>
      </div>

      <Link to={`${base}/${meta.id}/practice`} className="practice-banner">
        <span className="practice-banner-title">⚡ Subject practice</span>
        <span className="practice-banner-sub">
          {subjects.length} subjects · Easy / Medium / Hard sets, freshly
          generated each run →
        </span>
      </Link>

      <div className="pyq-grid">
        {meta.years.map((y) => (
          <Link key={y} to={`${base}/${meta.id}/${y}`} className="pyq-year">
            <span className="pyq-year-num">{y}</span>
            <span className="pyq-year-meta">
              <span className="pyq-year-label">
                {meta.exam} {meta.paperWord} {y}
              </span>
              <span className="pyq-year-sub">
                {QUESTIONS_PER_PAPER} questions · Easy/Medium/Hard tiers
              </span>
            </span>
            <span className="pyq-year-arrow">→</span>
          </Link>
        ))}
      </div>

      <Link to={base} className="text-link">
        ← All {meta.gate ? 'GATE tracks' : 'studios'}
      </Link>
    </div>
  );
}