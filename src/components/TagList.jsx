export default function TagList({ stack }) {
  if (!stack) return null;
  const tags = stack.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <div className="flex gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[11px] font-medium border border-accent/15"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
