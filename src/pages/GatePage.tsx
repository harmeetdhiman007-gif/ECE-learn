import { Link } from 'react-router-dom';
import { GATE_MODULES } from '../lib/gate/index.js';

export default function GatePage() {
  return (
    <div className="page">
      <div className="page-head">
        <h1>🎓 GATE ECE Prep</h1>
        <p className="page-sub">
          A separate study track for GATE Electrical &amp; Electronics
          Engineering — syllabus modules plus pattern-based practice questions.
          Each correct answer banks +10 XP.
        </p>
      </div>

      <div className="gate-note">
        📚 The syllabus below mirrors the standard GATE ECE subject list. The
        questions are original, written in the GATE style — great for reps, not
        a reproduction of past papers.
      </div>

      <div className="gate-grid">
        {GATE_MODULES.map((m) => (
          <Link key={m.id} to={`/gate/${m.id}`} className="gate-card">
            <span className="gate-emoji">{m.emoji}</span>
            <span className="gate-meta">
              <span className="gate-name">{m.name}</span>
              <span className="gate-sub">
                {m.weight} · {m.questions.length} practice questions
              </span>
            </span>
            <span className="gate-arrow">→</span>
          </Link>
        ))}
      </div>

      <div className="gate-syllabus">
        <h2>What the track covers</h2>
        {GATE_MODULES.map((m) => (
          <details key={m.id} className="syllabus-item">
            <summary>
              <span>
                {m.emoji} {m.name}
              </span>
              <span className="syllabus-weight">{m.weight}</span>
            </summary>
            <ul>
              {m.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}