import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

/* ---------------- Types ---------------- */
export type ProductType = "MOTOR" | "TRAVEL" | "ACCIDENT";
export type Source = "facebook" | "tiktok" | "instagram" | "survey" | "other";

export interface ReviewItem {
  id: number;
  name: string;
  date: string; // ISO string
  rating: number;
  product: string;
  productType: ProductType;
  text: string;
  source?: Source | null;
  createdAt: string;
  updatedAt: string;
}

const BG_MAP: Record<ProductType, string> = {
  MOTOR: "bg-blue-50",
  TRAVEL: "bg-teal-50",
  ACCIDENT: "bg-rose-50"
};

export const SOURCE_MAP: Record<Source, SourceCfg> = {
  facebook:  { kind: "icon",  icon: "/facebook.svg",  url: "https://www.facebook.com" },
  tiktok:    { kind: "icon",  icon: "/tiktok.svg",    url: "https://www.tiktok.com" },
  instagram: { kind: "icon",  icon: "/instagram.svg", url: "https://www.instagram.com" },
  survey:    { kind: "label", label: "แบบสอบถามหลังได้รับบริการ" },
  other:     { kind: "icon",  icon: "/link.svg" }
};

// Discriminated union for source config
interface IconSource {
  kind: "icon";
  icon: string;
  url?: string;
}
interface LabelSource {
  kind: "label";
  label: string;
}
export type SourceCfg = IconSource | LabelSource;

// Type guards
const isIcon = (c: SourceCfg): c is IconSource => c.kind === "icon";
const hasUrl = (c: SourceCfg): c is IconSource & { url: string } =>
  c.kind === "icon" && typeof c.url === "string";


export default function ReviewCard({
  review,
  selected,
  onSelect,
}: {
  review: ReviewItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const bg = BG_MAP[review.productType] ?? "bg-white";
  const srcKey: Source = review.source ?? "other";
  const cfg = SOURCE_MAP[srcKey];

  return (
    <div
      onClick={onSelect}
      className={`relative ${bg} text-black rounded-xl shadow p-6 cursor-pointer transition
                  hover:brightness-95 h-[260px] flex flex-col
                  ${selected ? "ring-2 ring-white" : "ring-0"}`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">{review.name}</h3>
        <span className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString("th-TH")}
        </span>
      </div>

      <div className="mt-2 flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${i <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>

      <h4 className="mt-2 font-bold text-gray-900">{review.product}</h4>
      <p className="mt-1 text-sm text-gray-700 line-clamp-3 pr-12">{review.text}</p>

      <div className="absolute bottom-4 right-4">
        {cfg.kind === "label" ? (
          <span className="text-xs text-gray-500">{cfg.label}</span>
        ) : hasUrl(cfg) ? (
          <a
            href={cfg.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={cfg.icon} width={24} height={24} alt={srcKey} />
          </a>
        ) : isIcon(cfg) ? (
          <Image src={cfg.icon} width={24} height={24} alt={srcKey} />
        ) : null}
      </div>
    </div>
  );
}