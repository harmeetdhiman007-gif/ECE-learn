import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getGateModule } from '../lib/gate/index.js';
import type { GateModule } from '../lib/gate/index.js';
import { useStore } from '../lib/state/store.js';
import { playFx } from '../lib/sfx.js';

const GATE_XP_PER = 10;

export default function GateQuizPage() {
  const { moduleId } = useParams();
  const module = getGateModule(moduleId);
  if (!module) {
    return (
      <div className="empty-state">
        <h1>🎓 Module not found</h1>
        <p>That GATE module doesn’t exist — head back to the track.</p>
        <Link to="/gate" className="btn-primary">GATE ECE Prep →</Link>
      </div>
    );
  }
  return <GateQuiz key={module.id} module={module} />;
}

function GateQuiz({ module }: { module: GateModule }) {
  const addXP = useStore((s) => s.addXP);

  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(0);

  const restart = () => {
    setIdx(0);
    setChoice(null);
    setSubmitted(false);
    setFinished(false);
    setScore(0);
    setEarned(0);
  };

  const q = module.questions[idx];

  const submit = () => {
    if (choice === null || submitted) return;
    setSubmitted(true);
    const correct = choice === q.correctIndex;
    playFx(correct ? 'correct' : 'wrong');
    if (correct) {
      setScore((s) => s + 1);
      setEarned((e) => e + GATE_XP_PER);
      addXP(GATE_XP_PER);
    }
    setChoice(correct ? q.correctIndex : choice);
  };

  const next = () => {
    if (idx + 1 >= module.questions.length) {
      setFinished(true);
      playFx('win');
      return;
    }
    setIdx((i) => i + 1);
    setChoice(null);
    setSubmitted(false);
  };

  if (finished) {
    return (
      <div className="empty-state">
        <div className="completion-emoji">{score >= 4 ? '🏆' : '📚'}</div>
        <h1>{module.emoji} Practice done!</h1>
        <p>
          You scored <strong>{score}</strong>/{module.questions.length} on{' '}
          {module.name} and banked <strong>+{earned} XP</strong>.
        </p>
        <div className="completion-actions">
          <button className="btn-primary" onClick={restart}>
            Practice again →
          </button>
          <Link to="/gate" className="btn-ghost">All modules</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>
          {module.emoji} {module.name}
        </h1>
        <p className="page-sub">
          Question {idx + 1} of {module.questions.length} · +{GATE_XP_PER} XP
          per correct answer
        </p>
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
            Check answer
          </button>
        )}

        {submitted && (
          <div className={`explain ${choice === q.correctIndex ? 'ok' : 'bad'}`}>
            <strong>{choice === q.correctIndex ? 'Correct! ' : 'Not quite. '}</strong>
            {q.explanation}
            <button className="btn-primary btn-inline" onClick={next}>
              {idx + 1 >= module.questions.length ? 'Finish →' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}