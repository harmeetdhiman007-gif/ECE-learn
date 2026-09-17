import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPyqPaper, getPyqTrack, trackOf } from '../lib/pyq/index.js';
import type { PyqPaper } from '../lib/pyq/index.js';
import { useStore } from '../lib/state/store.js';
import { playFx } from '../lib/sfx.js';

const PYQ_XP_PER = 10;

export default function PyqQuizPage() {
  const { track, year } = useParams();
  const paper = getPyqPaper(track, year);
  if (!paper) {
    return (
      <div className="empty-state">
        <h1>🤖 Paper not found</h1>
        <p>That year doesn’t exist in this AI column.</p>
        <Link to="/pyq" className="btn-primary">All PYQ columns →</Link>
      </div>
    );
  }
  return <PyqQuiz key={`${paper.exam}-${paper.year}`} paper={paper} />;
}

function PyqQuiz({ paper }: { paper: PyqPaper }) {
  const track = getPyqTrack(trackOf(paper));
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

  const q = paper.questions[idx];

  const submit = () => {
    if (choice === null || submitted) return;
    setSubmitted(true);
    const correct = choice === q.answer;
    playFx(correct ? 'correct' : 'wrong');
    if (correct) {
      setScore((s) => s + 1);
      setEarned((e) => e + PYQ_XP_PER);
      addXP(PYQ_XP_PER);
    }
    setChoice(correct ? q.answer : choice);
  };

  const next = () => {
    if (idx + 1 >= paper.questions.length) {
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
        <div className="completion-emoji">{score >= paper.questions.length - 1 ? '🏆' : '🎯'}</div>
        <h1>
          {track?.emoji} {paper.exam} {paper.paperWord} {paper.year} done!
        </h1>
        <p>
          You scored <strong>{score}</strong>/{paper.questions.length} marks and
          banked <strong>+{earned} XP</strong>. In the real exam, MCQs carry 1–2
          marks with ⅓ negative marking.
        </p>
        <div className="completion-actions">
          <button className="btn-primary" onClick={restart}>
            Retake paper →
          </button>
          <Link to={`/pyq/${track?.id ?? ''}`} className="btn-ghost">
            All years
          </Link>
          <Link to="/pyq" className="text-link">Other AI columns</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>
          {paper.exam} {paper.paperWord} {paper.year}
        </h1>
        <p className="page-sub">
          Question {idx + 1} of {paper.questions.length} · {q.section} · +
          {PYQ_XP_PER} XP per correct answer
        </p>
      </div>

      <div className="step-card">
        <span className="section-chip">{q.section}</span>
        <h2>{q.prompt}</h2>
        <div className="choice-list">
          {q.choices.map((c, i) => {
            let cls = 'choice-btn';
            if (submitted) {
              if (i === q.answer) cls += ' correct';
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
          <div className="ai-explainer">
            <span className="ai-chip">
              🤖 AI EXPLAINER{'\u2009'}·{'\u2009'}{paper.paperWord} {paper.year}
            </span>
            <p>
              <strong>{choice === q.answer ? 'Correct — ' : 'Not quite. '}</strong>
              {q.aiExplanation}
            </p>
            <button className="btn-primary btn-inline" onClick={next}>
              {idx + 1 >= paper.questions.length ? 'Finish paper →' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}