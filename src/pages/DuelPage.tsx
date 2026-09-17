import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { randomQuizQuestions } from '../lib/lessons/pool.js';
import { useStore } from '../lib/state/store.js';
import { playFx } from '../lib/sfx.js';

const TRAINER_INFO: Record<string, { name: string; emoji: string; winCoins: number; winXp: number }> = {
  ampere: { name: 'Ampere Annie', emoji: '⚡', winCoins: 30, winXp: 20 },
  logic: { name: 'Logic Larry', emoji: '🧠', winCoins: 30, winXp: 20 },
  sam: { name: 'Circuit Sam', emoji: '🔬', winCoins: 30, winXp: 20 },
  watt: { name: 'Watt Bot', emoji: '🤖', winCoins: 0, winXp: 15 },
};

type DuelMode = 'classic' | 'timed' | 'endless';

const MODES: { id: DuelMode; label: string; hint: string }[] = [
  { id: 'classic', label: 'Classic', hint: 'First to 5 wins' },
  { id: 'timed', label: '⏱ Timed', hint: '8 correct in 45s' },
  { id: 'endless', label: '∞ Endless', hint: '3 lives, high score' },
];

const TIMED_TARGET = 8;
const TIMED_SECONDS = 45;
const ENDLESS_LIVES = 3;
const ENDLESS_TARGET = 20;

export default function DuelPage() {
  const { trainer = 'watt' } = useParams();
  const info = TRAINER_INFO[trainer] ?? TRAINER_INFO.watt;

  const addXP = useStore((s) => s.addXP);
  const addCoins = useStore((s) => s.addCoins);
  const countDuelWin = useStore((s) => s.countDuelWin);

  const [state] = useState(() => ({
    questions: randomQuizQuestions(10),
  }));
  const [mode, setMode] = useState<DuelMode>('classic');
  const [idx, setIdx] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [trainerScore, setTrainerScore] = useState(0);
  const [lives, setLives] = useState(ENDLESS_LIVES);
  const [timeLeft, setTimeLeft] = useState(TIMED_SECONDS);
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [over, setOver] = useState(false);
  const [result, setResult] = useState<'win' | 'loss' | null>(null);
  const [claimed, setClaimed] = useState(false);

  const q = state.questions[idx];

  useEffect(() => {
    if (mode !== 'timed' || over || claimed) return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [mode, over, claimed]);

  useEffect(() => {
    if (mode === 'timed' && timeLeft === 0 && !over) {
      const id = setTimeout(() => {
        playFx('wrong');
        setOver(true);
        setResult(playerScore >= TIMED_TARGET ? 'win' : 'loss');
      }, 0);
      return () => clearTimeout(id);
    }
  }, [mode, timeLeft, over, playerScore]);

  const resetDuel = (nextMode: DuelMode) => {
    setMode(nextMode);
    setIdx(0);
    setPlayerScore(0);
    setTrainerScore(0);
    setLives(ENDLESS_LIVES);
    setTimeLeft(TIMED_SECONDS);
    setChoice(null);
    setSubmitted(false);
    setOver(false);
    setResult(null);
    setClaimed(false);
  };

  const finish = (win: boolean) => {
    setOver(true);
    setResult(win ? 'win' : 'loss');
    if (win) playFx('win');
    else playFx('wrong');
  };

  const submit = () => {
    if (choice === null || submitted) return;
    setSubmitted(true);
    const playerCorrect = choice === q.correctIndex;
    playFx(playerCorrect ? 'correct' : 'wrong');

    if (mode === 'endless') {
      if (playerCorrect) {
        const nextP = playerScore + 1;
        setPlayerScore(nextP);
        if (nextP >= ENDLESS_TARGET) finish(true);
      } else {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) finish(playerScore >= 8);
      }
      return;
    }

    const trainerCorrect =
      mode === 'classic' && ((idx * 7 + trainer.length) % 5) !== 0;
    if (playerCorrect) setPlayerScore((s) => s + 1);
    else if (trainerCorrect) setTrainerScore((s) => s + 1);

    const nextP = playerScore + (playerCorrect ? 1 : 0);
    const nextT = trainerScore + (playerCorrect ? 0 : trainerCorrect ? 1 : 0);
    if (mode === 'timed') {
      if (nextP >= TIMED_TARGET) finish(true);
    } else if (nextP >= 5 || nextT >= 5) {
      finish(nextP >= 5);
    } else if (idx + 1 >= state.questions.length) {
      finish(nextP > nextT);
    }
  };

  const claim = () => {
    if (claimed) return;
    setClaimed(true);
    if (result === 'win') {
      addCoins(info.winCoins);
      addXP(info.winXp);
      countDuelWin();
    } else {
      addXP(5);
    }
  };

  if (claimed) {
    return (
      <div className="empty-state">
        <div className="completion-emoji">{result === 'win' ? '🏆' : '🤝'}</div>
        <h1>{result === 'win' ? 'You won the duel!' : 'Good fight!'}</h1>
        <p>
          {mode === 'endless'
            ? `You banked ${playerScore} correct answers.`
            : `Final score — you ${playerScore}, ${info.name} ${trainerScore}.`}
          {result === 'win'
            ? ` Rewards banked: +${info.winXp} XP${info.winCoins ? `, +${info.winCoins} 🪙` : ''}.`
            : ' You still earned +5 XP for the attempt.'}
        </p>
        <div className="completion-actions">
          <Link to="/world" className="btn-primary">Back to Copper Town →</Link>
          <button className="btn-ghost" onClick={() => resetDuel(mode)}>
            Rematch
          </button>
        </div>
      </div>
    );
  }

  if (over) {
    return (
      <div className="empty-state">
        <div className="completion-emoji">{result === 'win' ? '🏆' : '🤝'}</div>
        <h1>{result === 'win' ? 'Duel won!' : 'Defeated — this time.'}</h1>
        <p>
          {mode === 'endless'
            ? `You answered ${playerScore} correctly before losing all ${ENDLESS_LIVES} lives.`
            : `You ${playerScore} – ${trainerScore} ${info.name}.`}
        </p>
        <button className="btn-primary" onClick={claim}>
          Claim rewards →
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>{info.emoji} Duel vs {info.name}</h1>
        <p className="page-sub">
          {MODES.find((m) => m.id === mode)?.hint}. Switch mode anytime
          between rounds.
        </p>
      </div>

      <div className="mode-chips">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`chip ${mode === m.id ? 'active' : ''}`}
            disabled={submitted}
            onClick={() => resetDuel(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="duel-score">
        {mode === 'endless' ? (
          <>
            <span className="duel-you">
              {playerScore} correct
            </span>
            <span className="duel-vs">vs</span>
            <span className="duel-them">
              {'❤️'.repeat(Math.max(0, lives)) || '☠️'}
            </span>
          </>
        ) : mode === 'timed' ? (
          <>
            <span className="duel-you">You — {playerScore}</span>
            <span className="duel-vs">⏱ {timeLeft}s</span>
            <span className="duel-them">Goal — {TIMED_TARGET}</span>
          </>
        ) : (
          <>
            <span className="duel-you">You — {playerScore}</span>
            <span className="duel-vs">VS</span>
            <span className="duel-them">{info.name} — {trainerScore}</span>
          </>
        )}
      </div>

      <div className="step-card">
        <h2>{q?.prompt}</h2>
        <div className="choice-list">
          {q?.choices.map((c, i) => {
            let cls = 'choice-btn';
            if (submitted) {
              if (i === q.correctIndex) cls += ' correct';
              else if (i === choice) cls += ' wrong';
            }
            return (
              <button key={i} className={cls} disabled={submitted} onClick={() => setChoice(i)}>
                <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
                {c}
              </button>
            );
          })}
        </div>

        {!submitted && (
          <div className="duel-actions">
            <button className="btn-primary" disabled={choice === null} onClick={submit}>
              Lock it in
            </button>
            {mode === 'endless' && (
              <button className="btn-ghost" onClick={() => finish(playerScore >= 8)}>
                End run
              </button>
            )}
          </div>
        )}

        {submitted && (
          <div className={`explain ${choice === q.correctIndex ? 'ok' : 'bad'}`}>
            <strong>{choice === q.correctIndex ? 'You got it! ' : 'Ouch — you missed it. '}</strong>
            {q.explanation}
            {!over && (
              <button
                className="btn-primary btn-inline"
                onClick={() => {
                  setIdx((i) => i + 1);
                  setChoice(null);
                  setSubmitted(false);
                }}
              >
                Next round →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}