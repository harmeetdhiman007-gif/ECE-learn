import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_LESSONS } from '../lib/lessons/catalog.js';
import { useStore, useCurrentHearts } from '../lib/state/store.js';
import { getLevel } from '../lib/state/levels.js';

export default function Home() {
  const xp = useStore((s) => s.xp);
  const streak = useStore((s) => s.streak);
  const hearts = useCurrentHearts();
  const completed = useStore((s) => s.completedLessonIds);
  const practiceQueue = useStore((s) => s.practiceQueue);
  const practiceDue = useStore((s) => s.practiceDue);
  const total = ALL_LESSONS.length;
  const done = completed.filter((id) => ALL_LESSONS.some((l) => l.id === id)).length;
  const navigate = useNavigate();

  const info = getLevel(xp);
  const nextLesson = ALL_LESSONS.find((l) => !completed.includes(l.id)) ?? ALL_LESSONS[0];
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);
  const due = practiceQueue.filter((id) => (practiceDue[id] ?? 0) <= now).length;

  return (
    <div className="home">
      <section className="mascot-hero">
        <div className="mascot-wrap">
          <div className="mascot">
            <svg viewBox="0 0 120 140" width="110" height="128">
              <circle cx="60" cy="52" r="40" fill="#141d2a" stroke="#00ff88" strokeWidth="3" />
              <circle cx="46" cy="46" r="6" fill="#00ff88" />
              <circle cx="74" cy="46" r="6" fill="#00ff88" />
              <path d="M48 64 Q60 72 72 64" stroke="#00ff88" strokeWidth="3" fill="none" strokeLinecap="round" />
              <g stroke="#00ff88" strokeWidth="3" strokeLinecap="round">
                <line x1="22" y1="34" x2="10" y2="24" />
                <line x1="98" y1="34" x2="110" y2="24" />
              </g>
              <rect x="42" y="94" width="36" height="20" rx="6" fill="#141d2a" stroke="#00ff88" strokeWidth="2" />
              <text x="60" y="109" fontSize="13" textAnchor="middle" fill="#00ff88" fontWeight="700">Si</text>
              <line x1="60" y1="114" x2="60" y2="126" stroke="#00ff88" strokeWidth="3" />
              <line x1="42" y1="130" x2="78" y2="130" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="bubble">
            Hey! I'm <strong>SiLo</strong>. Ready to spark some knowledge? ⚡
          </div>
        </div>
      </section>

      <section className="stat-row">
        <div className="stat-card">
          <span className="stat-num">🔥</span>
          <span className="stat-label">{streak} day streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">⚡</span>
          <span className="stat-label">{xp} XP</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">🎖️</span>
          <span className="stat-label">{info.title}</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">✅</span>
          <span className="stat-label">{done}/{total} lessons</span>
        </div>
      </section>

      {nextLesson && (
        <button
          className="btn-primary btn-big"
          onClick={() => navigate(`/lesson/${nextLesson.id}`)}
        >
          {done > 0 ? 'Continue learning' : 'Start your first lesson'} →
        </button>
      )}

      <section className="today-grid">
        {due > 0 && (
          <Link to="/practice" className="today-card">
            <span className="today-emoji">🔁</span>
            <span className="today-title">Practice due</span>
            <span className="today-sub">{due} question{due === 1 ? '' : 's'} ready — +5 XP each</span>
          </Link>
        )}
        <Link to="/charge" className="today-card">
          <span className="today-emoji">⚡</span>
          <span className="today-title">Daily Charge</span>
          <span className="today-sub">5 quick questions · +3 XP each</span>
        </Link>
        <Link to="/world" className="today-card">
          <span className="today-emoji">🏙️</span>
          <span className="today-title">Copper Town</span>
          <span className="today-sub">Duel a trainer in SiLo World</span>
        </Link>
        <Link to="/pyq" className="today-card">
          <span className="today-emoji">🎓</span>
          <span className="today-title">GATE PYQs</span>
          <span className="today-sub">ECE + CSE/IT · 2005–2024 · AI explained</span>
        </Link>
        <Link to="/studio/pcb" className="today-card">
          <span className="today-emoji">📐</span>
          <span className="today-title">PCB Design Studio</span>
          <span className="today-sub">Layout, routing & DRC practice</span>
        </Link>
        <Link to="/studio/vlsi" className="today-card">
          <span className="today-emoji">⚙️</span>
          <span className="today-title">VLSI &amp; Verilog Studio</span>
          <span className="today-sub">RTL, timing & ASIC-flow practice</span>
        </Link>
      </section>

      <section className="section-title">
        <h2>Today's quests</h2>
      </section>
      <Quests />

      <section className="section-title">
        <h2>Keep going</h2>
      </section>
      <div className="subject-list">
        {ALL_LESSONS.slice(0, 3).map((l) => {
          const isDone = completed.includes(l.id);
          return (
            <Link key={l.id} to={`/lesson/${l.id}`} className="lesson-row">
              <span className="lesson-check">{isDone ? '✅' : '⬜'}</span>
              <span className="lesson-info">
                <span className="lesson-title">{l.title}</span>
                <span className="lesson-sub">{l.subtitle}</span>
              </span>
              <span className="lesson-arrow">→</span>
            </Link>
          );
        })}
      </div>
      <Link to="/subjects" className="text-link">
        View all lessons →
      </Link>

      {hearts <= 2 && (
        <Link to="/account" className="hearts-low-banner">
          ❤️ Only {Math.max(0, hearts)} heart{hearts === 1 ? '' : 's'} left — refill now or take a breather.
        </Link>
      )}
    </div>
  );
}

function Quests() {
  const quests = useStore((s) => s.dailyQuests);
  const xp = useStore((s) => s.xp);

  return (
    <div className="quest-list">
      {quests.map((q) => {
        const pct = Math.min(100, (q.progress / q.target) * 100);
        return (
          <div key={q.id} className="quest-card">
            <div className="quest-head">
              <span className="quest-title">
                {q.completed ? '✅' : '🎯'} {q.title}
              </span>
              <span className="quest-reward">
                {q.completed ? `+${q.reward} XP earned` : `✓ ${q.progress}/${q.target}`}
              </span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${pct}%`, background: q.completed ? '#00ff88' : '#58a6ff' }}
              />
            </div>
            <div className="quest-foot">
              <span>Reward: +{q.reward} XP{q.coinReward ? ` + ${q.coinReward} 🪙` : ''}</span>
              <span>Total: {xp} XP</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}