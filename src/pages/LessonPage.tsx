import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLesson } from '../lib/lessons/catalog.js';
import StepCard from '../components/StepCard.js';
import { useStore, useCurrentHearts } from '../lib/state/store.js';
import type { QuestKind } from '../lib/state/store.js';

export default function LessonPage() {
  const { lessonId } = useParams();
  const lesson = useMemo(() => getLesson(lessonId ?? ''), [lessonId]);

  const addXP = useStore((s) => s.addXP);
  const completeLesson = useStore((s) => s.completeLesson);
  const completeStep = useStore((s) => s.completeStep);
  const isStepCompleted = useStore((s) => s.isStepCompleted);
  const incrementQuest = useStore((s) => s.incrementQuestKind);
  const enqueueMissed = useStore((s) => s.enqueueMissed);
  const spendHeart = useStore((s) => s.spendHeart);
  const hearts = useCurrentHearts();
  const buyHeartsRefill = useStore((s) => s.buyHeartsRefill);

  const [stepIdx, setStepIdx] = useState(0);
  const [heartsAtStart] = useState(() => useStore.getState().currentHearts());
  const [earnedStepIds, setEarnedStepIds] = useState<string[]>([]);
  const [missedSteps, setMissedSteps] = useState<string[]>([]);
  const [sessionXp, setSessionXp] = useState(0);
  const [done, setDone] = useState(false);

  const step = lesson ? lesson.steps[stepIdx] : null;
  const outOfHearts =
    heartsAtStart <= 0 && !!lesson && lesson.steps.some((s) => s.type !== 'info');

  const award = (stepId: string, xp: number, questKind: QuestKind) => {
    if (earnedStepIds.includes(stepId) || isStepCompleted(stepId)) return;
    setEarnedStepIds((prev) => [...prev, stepId]);
    completeStep(stepId);
    addXP(xp);
    setSessionXp((x) => x + xp);
    incrementQuest(questKind);
  };

  const fail = (stepId: string) => {
    if (!missedSteps.includes(stepId)) {
      setMissedSteps((prev) => [...prev, stepId]);
      enqueueMissed(stepId);
      spendHeart();
    }
  };

  const finishLesson = () => {
    if (!lesson) return;
    const wasDone = useStore.getState().isLessonCompleted(lesson.id);
    completeLesson(lesson.id);
    if (!wasDone) {
      addXP(lesson.xpReward);
      setSessionXp((x) => x + lesson.xpReward);
      incrementQuest('lessons');
    }
    setDone(true);
  };

  const goNext = () => {
    setStepIdx((i) => Math.min(i + 1, lesson!.steps.length - 1));
  };

  if (!lesson || !step) {
    return (
      <div className="empty-state">
        <p>Lesson not found.</p>
        <Link to="/subjects" className="text-link">← All lessons</Link>
      </div>
    );
  }

  const isLast = stepIdx === lesson.steps.length - 1;
  const nextLabel = isLast ? 'Finish lesson →' : 'Next →';
  const advance = isLast ? finishLesson : goNext;
  const progress = Math.round((stepIdx / lesson.steps.length) * 100);

  if (done) {
    return <CompletionScreen lessonId={lesson.id} sessionXp={sessionXp} />;
  }

  if (outOfHearts) {
    return (
      <div className="empty-state">
        <div className="completion-emoji">❤️</div>
        <h1>Out of hearts</h1>
        <p>
          You're all tapped out. Hearts refill one every 30 minutes — or refill
          instantly for 450 coins.
        </p>
        <div className="completion-actions">
          <button className="btn-primary" onClick={() => buyHeartsRefill()}>
            Refill now · 450 🪙
          </button>
          <Link to="/subjects" className="btn-ghost">← All lessons</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page">
      <div className="lesson-topbar">
        <Link to="/subjects" className="back-link">←</Link>
        <div className="lesson-progress-bar">
          <div className="lesson-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="lesson-step-count">
          {stepIdx + 1}/{lesson.steps.length}
        </span>
      </div>

      <h1 className="lesson-title">{lesson.title}</h1>

      <div className="lesson-hearts">
        <span>❤️ × {Math.max(0, hearts)}</span>
        <span className="muted">— a wrong answer costs a heart (first time only)</span>
      </div>

      <div className="step-card">
        <StepCard
          key={step.id}
          step={step}
          nextLabel={nextLabel}
          onAdvance={advance}
          onSolved={(xp, questKind) => award(step.id, xp, questKind)}
          onFailed={() => fail(step.id)}
        />
      </div>

      {sessionXp > 0 && (
        <div className="session-xp">+{sessionXp} XP earned this session</div>
      )}
    </div>
  );
}

function CompletionScreen({
  lessonId,
  sessionXp,
}: {
  lessonId: string;
  sessionXp: number;
}) {
  const streak = useStore((s) => s.streak);
  const currentHearts = useCurrentHearts();

  return (
    <div className="completion">
      <div className="completion-emoji">🎉</div>
      <h1>Lesson complete!</h1>
      <p className="completion-sub">
        You've mastered this one. Your streak is growing — keep it alive
        tomorrow.
      </p>
      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-num">⚡</span>
          <span className="stat-label">+{sessionXp} XP earned</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">🔥</span>
          <span className="stat-label">{streak} day streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">❤️</span>
          <span className="stat-label">{Math.max(0, currentHearts)} hearts</span>
        </div>
      </div>
      <div className="completion-actions">
        <Link to="/subjects" className="btn-primary">
          More lessons →
        </Link>
        <Link to="/" className="btn-ghost">Back home</Link>
        <Link to={`/lesson/${lessonId}`} className="btn-ghost">
          Review lesson
        </Link>
      </div>
    </div>
  );
}