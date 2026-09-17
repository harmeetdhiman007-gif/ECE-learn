import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_LESSONS } from '../lib/lessons/catalog.js';
import type { Step } from '../lib/lessons/types.js';
import StepCard from '../components/StepCard.js';
import { useStore } from '../lib/state/store.js';

function resolveStep(stepId: string): Step | undefined {
  for (const lesson of ALL_LESSONS) {
    const found = lesson.steps.find((s) => s.id === stepId);
    if (found) return found;
  }
  return undefined;
}

export default function PracticePage() {
  const [session] = useState(() => useStore.getState().duePracticeIds());
  const [index, setIndex] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);

  const practiceCorrect = useStore((s) => s.practiceCorrect);
  const practiceWrong = useStore((s) => s.practiceWrong);
  const clearPractice = useStore((s) => s.clearPractice);

  const stepId = session[index];
  const step = stepId ? resolveStep(stepId) : undefined;

  const handleSolved = () => {
    if (!stepId) return;
    practiceCorrect(stepId);
    setSessionXp((x) => x + (step?.type === 'quiz' ? step.xp : 5));
    setIndex((i) => i + 1);
  };

  const handleSkip = () => {
    if (!stepId) return;
    clearPractice(stepId);
    setIndex((i) => i + 1);
  };

  if (session.length === 0 || index >= session.length) {
    return (
      <div className="page">
        <div className="page-head">
          <h1>🔁 Practice</h1>
          <p className="page-sub">
            Miss a question in a lesson and it lands here for spaced review. Each
            correct answer banks extra XP.
          </p>
        </div>
        <div className="empty-card">
          <div className="completion-emoji">🎯</div>
          <h2>Nothing due — nice!</h2>
          <p>
            Your queue is clear. Take a lesson, and anything you miss will show
            up here tomorrow.
          </p>
          <Link to="/subjects" className="btn-primary">
            Pick a lesson →
          </Link>
        </div>
      </div>
    );
  }

  if (!step) {
    return (
      <div className="page">
        <p>That question is no longer available.</p>
        <button className="btn-primary" onClick={handleSkip}>
          Skip it
        </button>
      </div>
    );
  }

  const sessionXpDisplay =
    step.type === 'quiz' || step.type === 'gate' ? `+${step.xp} XP` : '+5 XP';

  return (
    <div className="page">
      <div className="page-head">
        <h1>🔁 Practice</h1>
        <p className="page-sub">
          {session.length - index} left today · get them right and they drop off
          your queue.
        </p>
      </div>

      <div className="practice-meta">
        <span>{index + 1}/{session.length}</span>
        <span>{sessionXpDisplay} on a correct answer</span>
      </div>

      <div className="step-card">
        <StepCard
          key={step.id}
          step={step}
          nextLabel="Next →"
          onAdvance={handleSolved}
          onSolved={() => {
            /* rewards handled by onAdvance so hearts stay safe here */
          }}
          onFailed={() => {
            if (stepId) practiceWrong(stepId);
          }}
        />
      </div>

      <div className="practice-actions">
        {sessionXp > 0 && <span className="session-xp">+{sessionXp} XP this session</span>}
        <button className="btn-ghost" onClick={handleSkip}>
          Remove from practice
        </button>
      </div>
    </div>
  );
}