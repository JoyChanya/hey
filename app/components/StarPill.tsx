import { StarIcon } from "@heroicons/react/24/solid";

export default function StarPill({
  rating,
  active,
  onClick,
}: {
  rating: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border border-gray-500/60 flex items-center gap-1 text-sm transition
        hover:bg-white/10 ${active ? "bg-yellow-500/20 border-yellow-400" : "text-gray-200"}`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i <= rating ? "text-yellow-400" : "text-gray-500"}`}
        />
      ))}
    </button>
  );
}