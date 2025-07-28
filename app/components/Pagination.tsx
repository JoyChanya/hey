export default function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex justify-center items-center gap-2 text-sm">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className={`h-8 w-8 flex items-center justify-center rounded-full 
          ${current === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10"}`}
        aria-label="prev page"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-8 w-8 rounded-full flex items-center justify-center
            ${p === current ? "bg-green-500 text-black" : "hover:bg-white/10"}`}
          aria-label={`page ${p}`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className={`h-8 w-8 flex items-center justify-center rounded-full 
          ${current === total ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10"}`}
        aria-label="next page"
      >
        ›
      </button>
    </div>
  );
}