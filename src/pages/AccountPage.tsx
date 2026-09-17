import { useState } from 'react';
import { useStore, useCurrentHearts } from '../lib/state/store.js';
import { getLevel } from '../lib/state/levels.js';
import { getAchievements } from '../lib/state/achievements.js';
import { getSession, signUp, logIn, logOut } from '../lib/auth.js';
import type { Session } from '../lib/auth.js';

export default function AccountPage() {
  const xp = useStore((s) => s.xp);
  const coins = useStore((s) => s.coins);
  const streak = useStore((s) => s.streak);
  const streakFreezes = useStore((s) => s.streakFreezes);
  const hearts = useCurrentHearts();
  const completedLessons = useStore((s) => s.completedLessonIds.length);
  const completedLessonIds = useStore((s) => s.completedLessonIds);
  const completedStepIds = useStore((s) => s.completedStepIds);
  const duelsWon = useStore((s) => s.duelsWon);
  const labBuilds = useStore((s) => s.labBuilds);
  const nickname = useStore((s) => s.account.nickname);
  const setNickname = useStore((s) => s.setNickname);
  const buyHeartsRefill = useStore((s) => s.buyHeartsRefill);
  const grantStreakFreeze = useStore((s) => s.grantStreakFreeze);

  const [editNick, setEditNick] = useState(false);
  const [draft, setDraft] = useState(nickname);
  const [session, setSession] = useState<Session | null>(() => getSession());

  const info = getLevel(xp);
  const pct = Math.min(
    100,
    Math.round((info.xpIntoLevel / info.xpNeededForNext) * 100),
  );

  return (
    <div className="page">
      <div className="page-head">
        <h1>You</h1>
        <p className="page-sub">Your journey, stats, and little extras.</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">🙂</div>
        {editNick ? (
          <div className="profile-edit">
            <input
              className="nick-input"
              value={draft}
              maxLength={24}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Nickname"
            />
            <button
              className="btn-primary btn-inline"
              onClick={() => {
                setNickname(draft);
                setEditNick(false);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <button className="profile-name" onClick={() => setEditNick(true)}>
            {nickname} ✏️
          </button>
        )}
        <span className="profile-title">{info.title}</span>
        <div className="profile-xp">
          <span>Level {info.level}</span>
          <span className="muted">
            {info.xpIntoLevel}/{info.xpNeededForNext} XP · {info.totalXp} total
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <AuthPanel
        session={session}
        onSession={(s) => {
          setSession(s);
          setNickname(s.nickname);
        }}
        onLogout={() => {
          logOut();
          setSession(null);
        }}
      />

      <section className="stat-row">
        <div className="stat-card">
          <span className="stat-num">⚡</span>
          <span className="stat-label">{xp} XP</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">🔥</span>
          <span className="stat-label">{streak} day streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">❤️</span>
          <span className="stat-label">{Math.max(0, hearts)} hearts</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">✅</span>
          <span className="stat-label">{completedLessons} lessons</span>
        </div>
      </section>

      <section className="section-title">
        <h2>🎖️ Badges</h2>
      </section>
      <div className="badge-grid">
        {getAchievements({
          xp,
          coins,
          streak,
          completedLessonIds,
          completedStepIds,
          duelsWon,
          labBuilds,
        }).map((b) => (
          <div key={b.id} className={`badge-card ${b.unlocked ? 'on' : 'off'}`}>
            <span className="badge-emoji">{b.unlocked ? b.emoji : '🔒'}</span>
            <span className="badge-title">{b.title}</span>
            <span className="badge-sub">{b.description}</span>
          </div>
        ))}
      </div>

      <section className="section-title">
        <h2>🪙 Shop</h2>
      </section>
      <div className="shop-list">
        <button className="shop-row" onClick={() => buyHeartsRefill()}>
          <span className="shop-emoji">❤️</span>
          <span className="shop-meta">
            <span className="shop-name">Full hearts refill</span>
            <span className="shop-sub">Instant refill to 5 hearts</span>
          </span>
          <span className="shop-price">450 🪙</span>
        </button>
        <button className="shop-row" onClick={() => grantStreakFreeze()}>
          <span className="shop-emoji">🧊</span>
          <span className="shop-meta">
            <span className="shop-name">Streak freeze</span>
            <span className="shop-sub">
              Owned: {streakFreezes ?? 0} · auto-saves a missed day
            </span>
          </span>
          <span className="shop-price">200 🪙</span>
        </button>
      </div>

      <p className="fine-print">
        Total coins: {coins}. Hearts also refill for free, one every 30 minutes.
      </p>
    </div>
  );
}

function AuthPanel({
  session,
  onSession,
  onLogout,
}: {
  session: Session | null;
  onSession: (s: Session) => void;
  onLogout: () => void;
}) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNicknameDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setBusy(true);
    setError('');
    const res =
      mode === 'signup'
        ? await signUp(email, password, nickname)
        : await logIn(email, password);
    setBusy(false);
    if (!res.ok || !res.session) {
      setError(res.error ?? 'Something went wrong.');
      return;
    }
    onSession(res.session);
  };

  if (session) {
    return (
      <section className="auth-panel">
        <div className="profile-card">
          <div className="profile-avatar">👤</div>
          <div className="auth-id">
            <span className="profile-title">{session.nickname}</span>
            <span className="auth-email">{session.email}</span>
            <span className="auth-note">
              Signed in — progress syncs to your account. Use the name above to
              edit your leaderboard nickname.
            </span>
          </div>
        </div>
        <button className="btn-ghost btn-inline" onClick={onLogout}>
          Log out
        </button>
      </section>
    );
  }

  return (
    <section className="auth-panel">
      <div className="page-head">
        <h2>🔐 {mode === 'signup' ? 'Create account' : 'Welcome back'}</h2>
        <p className="page-sub">
          Save your identity and leaderboard nickname online. Works offline
          first — sync happens when the network is there.
        </p>
      </div>
      <div className="auth-tabs">
        <button
          className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
          onClick={() => {
            setMode('signup');
            setError('');
          }}
        >
          Sign up
        </button>
        <button
          className={`auth-tab ${mode === 'signin' ? 'active' : ''}`}
          onClick={() => {
            setMode('signin');
            setError('');
          }}
        >
          Log in
        </button>
      </div>
      <div className="auth-form">
        {mode === 'signup' && (
          <input
            className="auth-input"
            value={nickname}
            maxLength={24}
            onChange={(e) => setNicknameDraft(e.target.value)}
            placeholder="Leaderboard nickname"
          />
        )}
        <input
          className="auth-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 characters)"
        />
        {error && <div className="auth-error">{error}</div>}
        <button
          className="btn-primary btn-inline"
          disabled={busy || !email || password.length < 6}
          onClick={() => void submit()}
        >
          {busy ? 'Working…' : mode === 'signup' ? 'Create account' : 'Log in'}
        </button>
      </div>
    </section>
  );
}