export default function Pill({
  active,
  onClick,
  children,
  activeClass = "bg-white text-black",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-full text-sm border border-gray-500/60 transition 
                  hover:bg-white/10 ${active ? activeClass : "text-gray-200"}`}
    >
      {children}
    </button>
  );
}