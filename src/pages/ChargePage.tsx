import { useState } from 'react';
import { Link } from 'react-router-dom';
import { randomQuizQuestions } from '../lib/lessons/pool.js';
import { useStore } from '../lib/state/store.js';
import { CHARGE_XP_PER } from '../lib/state/store.js';
import { playFx } from '../lib/sfx.js';

export default function ChargePage() {
  const recordChargeAnswer = useStore((s) => s.recordChargeAnswer);
  const addXP = useStore((s) => s.addXP);
  const [dailyQuestions] = useState(() => randomQuizQuestions(5));
  const [endlessQuestions] = useState(() => randomQuizQuestions(30));
  const [endless, setEndless] = useState(false);
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = endless ? endlessQuestions : dailyQuestions;
  const q = questions[idx];

  if (questions.length === 0) {
    return (
      <div className="empty-state">
        <h1>⚡ Daily Charge</h1>
        <p>No questions are ready yet — finish a lesson first, then come back.</p>
        <Link to="/subjects" className="btn-primary">Learn →</Link>
      </div>
    );
  }

  const setMode = (isEndless: boolean) => {
    if (submitted || finished) return;
    setEndless(isEndless);
    setIdx(0);
    setChoice(null);
    setSubmitted(false);
    setFinished(false);
    setCorrectCount(0);
  };

  const submit = () => {
    if (choice === null || submitted) return;
    setSubmitted(true);
    const correct = choice === q.correctIndex;
    playFx(correct ? 'correct' : 'wrong');
    if (endless) {
      if (correct) {
        addXP(CHARGE_XP_PER);
        setCorrectCount((c) => c + 1);
      }
    } else {
      recordChargeAnswer(correct);
    }
    setChoice(correct ? q.correctIndex : choice);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      if (endless) playFx('win');
      return;
    }
    setIdx((i) => i + 1);
    setChoice(null);
    setSubmitted(false);
  };

  if (finished) {
    return (
      <div className="empty-state">
        <div className="completion-emoji">⚡</div>
        <h1>{endless ? 'Endless run complete!' : 'Charge complete!'}</h1>
        <p>
          {endless
            ? `You cleared all 30 questions and got ${correctCount} correct. Each correct answer banked +${CHARGE_XP_PER} XP.`
            : `Daily Charge done for today. Every correct answer banked +${CHARGE_XP_PER} XP and you kept your streak ticking.`}
        </p>
        <div className="completion-actions">
          <Link to="/" className="btn-primary">Home →</Link>
          {endless && (
            <button className="btn-ghost" onClick={() => setMode(true)}>
              Run it again
            </button>
          )}
          <Link to="/subjects" className="btn-ghost">More lessons</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>⚡ Daily Charge</h1>
        <p className="page-sub">
          {idx + 1} of {questions.length} · +{CHARGE_XP_PER} XP per correct
          answer
        </p>
      </div>

      <div className="mode-chips">
        <button
          className={`chip ${!endless ? 'active' : ''}`}
          onClick={() => setMode(false)}
        >
          Daily (5)
        </button>
        <button
          className={`chip ${endless ? 'active' : ''}`}
          onClick={() => setMode(true)}
        >
          ∞ Endless practice
        </button>
      </div>

      <div className="charge-hearts">
        {questions.map((_, i) => (
          <span key={i} className={`charge-heart ${i < idx ? 'done' : 'current'}`}>
            ❤️
          </span>
        ))}
      </div>

      <div className="step-card">
        <h2>{q.prompt}</h2>
        <div className="choice-list">
          {q.choices.map((c, i) => {
            let cls = 'choice-btn';
            if (submitted) {
              if (i === q.correctIndex) cls += ' correct';
              else if (i === choice) cls += ' wrong';
            }
            return (
              <button
                key={i}
                className={cls}
                disabled={submitted}
                onClick={() => setChoice(i)}
              >
                <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
                {c}
              </button>
            );
          })}
        </div>

        {!submitted && (
          <button className="btn-primary" disabled={choice === null} onClick={submit}>
            Submit
          </button>
        )}

        {submitted && (
          <div className={`explain ${choice === q.correctIndex ? 'ok' : 'bad'}`}>
            <strong>{choice === q.correctIndex ? 'Correct! ' : 'Not quite. '}</strong>
            {q.explanation}
            <button className="btn-primary btn-inline" onClick={next}>
              {idx + 1 >= questions.length ? 'Finish →' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}