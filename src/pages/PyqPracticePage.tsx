import { Link, useParams } from 'react-router-dom';
import {
  PRACTICE_SET_SIZE,
  PYQ_TIER_LABEL,
  getPyqTrack,
  makePracticePaper,
  subjectsWithTiers,
} from '../lib/pyq/index.js';
import type { PyqDifficulty } from '../lib/pyq/index.js';
import { PyqQuiz } from './PyqQuizPage.js';

const TIERS: PyqDifficulty[] = ['easy', 'medium', 'hard'];

export default function PyqPracticePage() {
  const { track: trackId, subject, tier } = useParams();
  const meta = getPyqTrack(trackId);
  if (!meta) {
    return (
      <div className="empty-state">
        <h1>🤖 Track not found</h1>
        <Link to="/pyq" className="btn-primary">All PYQ columns →</Link>
      </div>
    );
  }

  if (subject && (tier === 'easy' || tier === 'medium' || tier === 'hard')) {
    const paper = makePracticePaper(meta.id, subject, tier);
    if (!paper) {
      return (
        <div className="empty-state">
          <h1>⚠️ No questions found</h1>
          <Link to={`/pyq/${meta.id}/practice`} className="btn-primary">
            Pick another subject →
          </Link>
        </div>
      );
    }
    return <PyqQuiz paper={paper} />;
  }

  const rows = subjectsWithTiers(meta.id);

  if (subject) {
    const row = rows.find((r) => r.subject === subject);
    return (
      <div className="page">
        <div className="page-head">
          <h1>
            {meta.emoji} Practice — {subject}
          </h1>
          <p className="page-sub">
            Pick a tier for a fresh {PRACTICE_SET_SIZE}-question set. Every run is
            re-shuffled, so repeat as much as you want. +10 XP per correct answer.
          </p>
        </div>
        <div className="pyq-grid">
          {(row ? row.tiers : TIERS).map((t) => (
            <Link
              key={t}
              to={`/pyq/${meta.id}/practice/${encodeURIComponent(subject)}/${t}`}
              className="pyq-year"
            >
              <span className="pyq-year-num">
                {t === 'easy' ? '🌱' : t === 'medium' ? '📖' : '🔥'}
              </span>
              <span className="pyq-year-meta">
                <span className="pyq-year-label">{PYQ_TIER_LABEL[t]} tier</span>
                <span className="pyq-year-sub">
                  {PRACTICE_SET_SIZE} unique questions · AI explainer
                </span>
              </span>
              <span className="pyq-year-arrow">→</span>
            </Link>
          ))}
        </div>
        <Link to={`/pyq/${meta.id}`} className="text-link">
          ← Back to {meta.exam} {meta.paperWord.toLowerCase()}s
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>
          {meta.emoji} {meta.title} — Subject practice
        </h1>
        <p className="page-sub">
          Sharpen one subject at a time. Each subject offers Easy, Medium and
          Hard sets that are freshly generated on demand — the deeper you want
          to go, the higher you jump.
        </p>
      </div>

      <div className="pyq-columns">
        {rows.map((row) => (
          <div key={row.subject} className="pyq-subject-card">
            <Link to={`/pyq/${meta.id}/practice/${encodeURIComponent(row.subject)}`}>
              <span className="pyq-subject-title">{row.subject}</span>
            </Link>
            <div className="practice-tiers">
              {row.tiers.map((t) => (
                <Link
                  key={t}
                  to={`/pyq/${meta.id}/practice/${encodeURIComponent(row.subject)}/${t}`}
                  className={`practice-tier diff-${t}`}
                >
                  {PYQ_TIER_LABEL[t]}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link to={`/pyq/${meta.id}`} className="text-link">
        ← Back to {meta.exam} {meta.paperWord.toLowerCase()}s
      </Link>
    </div>
  );
}