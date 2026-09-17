import { useState } from 'react';

interface Props {
  items: string[];
  correctOrder: string[];
  explanation: string;
  onSolve: (correct: boolean) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isCorrect(order: string[], correct: string[]): boolean {
  return order.length === correct.length && order.every((s, i) => s === correct[i]);
}

export default function OrderPuzzle({ items, correctOrder, explanation, onSolve }: Props) {
  const [order, setOrder] = useState<string[]>(() => {
    let shuffled = shuffle(items);
    while (isCorrect(shuffled, correctOrder)) shuffled = shuffle(items);
    return shuffled;
  });
  const [checked, setChecked] = useState(false);

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= order.length) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const check = () => {
    setChecked(true);
    onSolve(isCorrect(order, correctOrder));
  };

  const reset = () => {
    setChecked(false);
    let shuffled = shuffle(items);
    while (isCorrect(shuffled, correctOrder)) shuffled = shuffle(items);
    setOrder(shuffled);
  };

  const solved = checked && isCorrect(order, correctOrder);

  return (
    <div className="order-card">
      <ol className="order-list">
        {order.map((item, i) => (
          <li key={item} className={`order-item ${checked ? (item === correctOrder[i] ? 'ok' : 'bad') : ''}`}>
            <span className="order-index">{i + 1}</span>
            <span className="order-text">{item}</span>
            <span className="order-controls">
              <button className="order-btn" onClick={() => move(i, -1)} aria-label="Move up">
                ▲
              </button>
              <button className="order-btn" onClick={() => move(i, 1)} aria-label="Move down">
                ▼
              </button>
            </span>
          </li>
        ))}
      </ol>

      {!checked && (
        <button className="btn-primary" onClick={check}>
          Check order
        </button>
      )}

      {checked && !solved && (
        <button className="btn-primary" onClick={reset}>
          Try again
        </button>
      )}

      {checked && (
        <p className={`explain ${solved ? 'ok' : 'bad'}`}>
          <strong>{solved ? 'Correct! ' : 'Here is the right order: '}</strong>
          {solved ? explanation : correctOrder.join(' → ')}
        </p>
      )}
    </div>
  );
}