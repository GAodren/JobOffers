import { getScoreClass } from "../utils/helpers";

export default function ScoreBadge({ score }) {
  return (
    <div
      className={`inline-flex items-baseline gap-0.5 px-2.5 py-1 rounded-lg border font-mono font-bold ${getScoreClass(score)}`}
    >
      <span className="text-lg leading-none">{score}</span>
      <span className="text-[10px] opacity-60">/10</span>
    </div>
  );
}
