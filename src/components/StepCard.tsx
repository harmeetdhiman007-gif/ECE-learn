import { useRef, useState } from 'react';
import type { CircuitModel } from '../lib/sim/types.js';
import { checkCircuit } from '../lib/sim/engine.js';
import type { Step } from '../lib/lessons/types.js';
import type { QuestKind } from '../lib/state/store.js';
import CircuitCanvas from './CircuitCanvas.js';
import BandsCanvas from './BandsCanvas.js';
import OrderPuzzle from './OrderPuzzle.js';
import BuildBench from './BuildBench.js';
import GateCanvas from './GateCanvas.js';
import { playFx } from '../lib/sfx.js';

export default function StepCard({
  step,
  nextLabel,
  onAdvance,
  onSolved,
  onFailed,
}: {
  step: Step;
  nextLabel: string;
  onAdvance: () => void;
  onSolved: (xp: number, questKind: QuestKind) => void;
  onFailed: () => void;
}) {
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [circuitModel, setCircuitModel] = useState<CircuitModel | null>(null);
  const [circuitPassed, setCircuitPassed] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const failedRef = useRef(false);

  const clearAttempt = () => {
    setQuizChoice(null);
    setQuizSubmitted(false);
    setQuizCorrect(false);
  };

  const solve = (xp: number, questKind: QuestKind) => {
    setPuzzleSolved(true);
    onSolved(xp, questKind);
  };

  const failOnce = () => {
    if (failedRef.current) return;
    failedRef.current = true;
    onFailed();
  };

  const handleCircuitClick = (id: string) => {
    if (step.type !== 'circuit' || circuitPassed) return;
    const model: CircuitModel =
      circuitModel ?? JSON.parse(JSON.stringify(step.circuit));
    const next: CircuitModel = {
      ...model,
      components: model.components.map((c) =>
        c.id === id && c.kind === 'wire' && c.broken
          ? { ...c, broken: false }
          : c,
      ),
    };
    setCircuitModel(next);
    if (checkCircuit(next, step.check)) {
      setCircuitPassed(true);
      playFx('correct');
      solve(step.xp, 'circuits');
    }
  };

  if (step.type === 'info') {
    return (
      <>
        <div className="step-head">
          <span className="step-kind">📘 Lesson</span>
        </div>
        <h2>{step.title}</h2>
        <p className="step-body">{step.body}</p>
        <button className="btn-primary" onClick={onAdvance}>
          {nextLabel}
        </button>
      </>
    );
  }

  if (step.type === 'quiz' || step.type === 'gate') {
    const isGate = step.type === 'gate';
    return (
      <>
        <div className="step-head">
          <span className="step-kind">
            {isGate ? '🧠 Digital gate' : '❓ Question'} · +{step.xp} XP
          </span>
        </div>
        <h2>{step.prompt}</h2>
        <div className="choice-list">
          {step.choices.map((choice, i) => {
            let cls = 'choice-btn';
            if (quizSubmitted) {
              if (i === step.correctIndex) cls += ' correct';
              else if (i === quizChoice) cls += ' wrong';
            }
            return (
              <button
                key={i}
                className={cls}
                disabled={quizSubmitted}
                onClick={() => setQuizChoice(i)}
              >
                <span className="choice-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                {choice}
              </button>
            );
          })}
        </div>

        {!quizSubmitted && (
          <button
            className="btn-primary"
            disabled={quizChoice === null}
            onClick={() => {
              setQuizSubmitted(true);
              const correct = quizChoice === step.correctIndex;
              setQuizCorrect(correct);
              playFx(correct ? 'correct' : 'wrong');
              if (correct) {
                solve(step.xp, isGate ? 'answers' : 'answers');
              } else {
                failOnce();
              }
            }}
          >
            Check answer
          </button>
        )}

        {quizSubmitted && (
          <>
            {isGate && <GateCanvas gate={step.gate} />}
            <div className={`explain ${quizCorrect ? 'ok' : 'bad'}`}>
              <strong>{quizCorrect ? 'Correct! ' : 'Not quite. '}</strong>
              {step.explanation}
              {quizCorrect ? (
                <button className="btn-primary btn-inline" onClick={onAdvance}>
                  {nextLabel}
                </button>
              ) : (
                <button
                  className="btn-primary btn-inline"
                  onClick={clearAttempt}
                >
                  Try again — no more hearts lost
                </button>
              )}
            </div>
          </>
        )}
      </>
    );
  }

  if (step.type === 'circuit') {
    return (
      <>
        <div className="step-head">
          <span className="step-kind">🔧 Circuit · +{step.xp} XP</span>
        </div>
        <h2>{step.prompt}</h2>
        <div className="circuit-frame">
          <CircuitCanvas
            model={circuitModel ?? step.circuit}
            onComponentClick={handleCircuitClick}
          />
        </div>
        <p className={`instruction ${circuitPassed ? 'done' : ''}`}>
          {circuitPassed
            ? '✅ Circuit solved! Current is flowing and the LED is lit.'
            : step.instruction}
        </p>
        {circuitPassed && (
          <button className="btn-primary" onClick={onAdvance}>
            {nextLabel}
          </button>
        )}
      </>
    );
  }

  if (step.type === 'bands') {
    const done = puzzleSolved;
    return (
      <>
        <div className="step-head">
          <span className="step-kind">🌈 Bands decoder · +{step.xp} XP</span>
        </div>
        <h2>{step.prompt}</h2>
        <p className="step-body">{step.instruction}</p>
        <BandsCanvas
          value={step.value}
          onSolve={(ok) => {
            if (ok) {
              playFx('correct');
              solve(step.xp, 'circuits');
            } else {
              playFx('wrong');
              failOnce();
            }
          }}
        />
        {done && (
          <button className="btn-primary" onClick={onAdvance}>
            {nextLabel}
          </button>
        )}
      </>
    );
  }

  if (step.type === 'order') {
    const done = puzzleSolved;
    return (
      <>
        <div className="step-head">
          <span className="step-kind">🔢 Order it · +{step.xp} XP</span>
        </div>
        <h2>{step.prompt}</h2>
        <OrderPuzzle
          items={step.items}
          correctOrder={step.correctOrder}
          explanation={step.explanation}
          onSolve={(ok) => {
            if (ok) {
              playFx('correct');
              solve(step.xp, 'circuits');
            } else {
              playFx('wrong');
              failOnce();
            }
          }}
        />
        {done && (
          <button className="btn-primary" onClick={onAdvance}>
            {nextLabel}
          </button>
        )}
      </>
    );
  }

  if (step.type === 'build') {
    const done = puzzleSolved;
    return (
      <>
        <div className="step-head">
          <span className="step-kind">🧰 Build it · +{step.xp} XP</span>
        </div>
        <h2>{step.prompt}</h2>
        <p className="step-body">{step.instruction}</p>
        <BuildBench
          step={step}
          onSolve={(ok) => {
            if (ok) {
              playFx('correct');
              solve(step.xp, 'circuits');
            } else {
              playFx('wrong');
              failOnce();
            }
          }}
        />
        {done && (
          <button className="btn-primary" onClick={onAdvance}>
            {nextLabel}
          </button>
        )}
      </>
    );
  }

  return null;
}