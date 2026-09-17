import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useStore } from '../lib/state/store.js';
import { initSync, pushProgress, markLesson } from '../lib/sync/neon.js';

const NAV = [
  { to: '/', icon: '⌂', label: 'Home' },
  { to: '/subjects', icon: '📖', label: 'Learn' },
  { to: '/practice', icon: '🔁', label: 'Practice' },
  { to: '/world', icon: '🏙️', label: 'World' },
  { to: '/gate', icon: '🎓', label: 'GATE' },
  { to: '/account', icon: '🙂', label: 'You' },
];

export default function Layout() {
  const loc = useLocation();
  const xp = useStore((s) => s.xp);
  const streak = useStore((s) => s.streak);
  const coins = useStore((s) => s.coins);

  useEffect(() => {
    void initSync();
    const unsub = useStore.subscribe((state, prev) => {
      if (
        state.xp !== prev.xp ||
        state.streak !== prev.streak ||
        state.coins !== prev.coins ||
        state.account.nickname !== prev.account.nickname
      ) {
        void pushProgress(
          state.xp,
          state.streak,
          state.completedLessonIds.length,
          state.coins,
          state.account.nickname,
        );
      }
      const newLessons = state.completedLessonIds.filter(
        (id) => !prev.completedLessonIds.includes(id),
      );
      for (const id of newLessons) void markLesson(id);
    });
    return unsub;
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="logo-link">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Ohmie</span>
        </Link>
        <div className="header-stats">
          <span className="stat-streak" title="Streak">🔥 {streak}</span>
          <span className="stat-xp" title="XP">⚡ {xp}</span>
          <span className="stat-coins" title="Coins">🪙 {coins}</span>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <nav className="app-nav">
        {NAV.map((n) => {
          const active =
            n.to === '/'
              ? loc.pathname === '/'
              : loc.pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`nav-item ${active ? 'active' : ''}`}
            >
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
