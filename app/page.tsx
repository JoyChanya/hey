// app/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useSwipeable } from "react-swipeable";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";



// Backend types
type ProductType = "MOTOR" | "TRAVEL" | "ACCIDENT";
interface ReviewItem {
  id: number;
  name: string;
  date: string;
  rating: number;
  product: string;
  productType: ProductType;
  text: string;
  source?: "facebook" | "tiktok" | "instagram" | "survey" | "other" | null;
  createdAt: string;
  updatedAt: string;
}

const BG_MAP: Record<ProductType, string> = {
  MOTOR: "bg-[#E6FFF3]",
  TRAVEL: "bg-[#FFFDEF]",
  ACCIDENT: "bg-[#FFF5F5]"
};

const SOURCE_MAP = {
  facebook: { icon: "/facebook.svg", url: "https://www.facebook.com" },
  tiktok: { icon: "/tiktok.svg", url: "https://www.tiktok.com" },
  instagram: { icon: "/instagram.svg", url: "https://www.instagram.com" },
  survey: { label: "แบบสอบถามหลังได้รับบริการ" },
  other: { icon: "", url: "#" },
} as const;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const PAGE_SIZE = 3;
const TOTAL_PAGES = 3;

const Chatbot = dynamic(() => import("./components/Chatbot"), {
  ssr: false,
});

export default function Page() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((r) => r.json())
      .then((data: ReviewItem[]) => setReviews(data))
      .catch((e) => console.error("Fetch reviews error:", e))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    return [...reviews].sort((a, b) => {
      const d = new Date(b.date).getTime() - new Date(a.date).getTime();
      return d !== 0 ? d : b.rating - a.rating;
    });
  }, [reviews]);

  const limited = useMemo(() => sorted.slice(0, PAGE_SIZE * TOTAL_PAGES), [sorted]);

  const pages = useMemo(() => {
    const arr: ReviewItem[][] = [];
    for (let i = 0; i < limited.length; i += PAGE_SIZE) {
      arr.push(limited.slice(i, i + PAGE_SIZE));
    }
    while (arr.length < TOTAL_PAGES) arr.push([]);
    return arr.slice(0, TOTAL_PAGES);
  }, [limited]);

  const isFirst = page === 0;
  const isLast = page === pages.length - 1;

  const goPrev = () => !isFirst && setPage((p) => p - 1);
  const goNext = () => !isLast && setPage((p) => p + 1);

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#F1FCF3]">
      <Navbar />

      {/* HERO */}
      <section className="container mx-auto px-4 py-12 text-left">
        <h2 className="text-3xl font-bold 
                        bg-gradient-to-r from-[#029563] to-[#2177EB] 
                        inline-block text-transparent bg-clip-text">รีวิวจากลูกค้า hey</h2>
        <p className="mt-2 text-3xl font-bold text-[#029563]">
          4.8 <span className="text-lg font-normal text-gray-500">/ 5 คะแนนจาก 100,000 รีวิว</span>
        </p>
        <div className="mt-4 text-right">
          <Link href="/reviews" className="text-sm text-gray-600 hover:underline">
            ดูรีวิวทั้งหมด &rarr;
          </Link>
        </div>
      </section>

      {/* CARDS */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={goPrev}
            disabled={isFirst}
            className={`hidden md:flex items-center justify-center absolute -left-10 top-1/2 -translate-y-1/2 
                        h-10 w-10 rounded-full bg-[#12875D] shadow z-10
                        ${isFirst ? "opacity-30 cursor-not-allowed" : "hover:bg-[#0F6B4A]"}`}
            aria-label="previous"
          >
            <ArrowLeftIcon className="w-6 h-6 text-white" />
          </button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            disabled={isLast}
            className={`hidden md:flex items-center justify-center absolute -right-10 top-1/2 -translate-y-1/2 
                        h-10 w-10 rounded-full bg-[#12875D] shadow z-10
                        ${isLast ? "opacity-30 cursor-not-allowed" : "hover:bg-[#0F6B4A]"}`}
            aria-label="next"
          >
            <ArrowRightIcon className="w-6 h-6 text-white" />
          </button>

          <div className="px-4 md:px-16" {...handlers}>
            {loading ? (
              <div className="h-40 flex items-center justify-center text-gray-500">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pages[page].map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pagination + All reviews */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 w-2 rounded-full ${i === page ? "bg-green-600" : "bg-gray-300"}`}
                aria-label={`go to page ${i + 1}`}
              />
            ))}
          </div>

          {isLast && (
            <Link
              href="/reviews"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#029563] to-[#2177EB] text-white text-sm font-semibold hover:bg-green-600 transition"
            >
              รีวิวทั้งหมด
            </Link>
          )}
        </div>
      </section>


    </div>
  );
}

/* -------- Components -------- */

function ReviewCard({ review }: { review: ReviewItem }) {
  const bg = BG_MAP[review.productType] ?? "bg-white";
  const srcKey = (review.source ?? "survey") as keyof typeof SOURCE_MAP;
  const srcCfg = SOURCE_MAP[srcKey];

  return (
    <div className={`relative ${bg} rounded-xl shadow p-6 flex flex-col h-[220px] md:h-[240px]`}>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">{review.name}</h3>
        <span className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString("th-TH")}
        </span>
      </div>

      <div className="mt-2 flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>

      <h4 className="mt-2 font-bold text-gray-900">{review.product}</h4>

      <p className="mt-1 text-sm text-gray-700 line-clamp-3 pr-10">{review.text}</p>

      <div className="absolute bottom-4 right-4">
        {"label" in srcCfg ? (
          <span className="text-xs text-gray-500">{srcCfg.label}</span>
        ) : (
          srcCfg.icon && (
            <a href={srcCfg.url} target="_blank" rel="noopener noreferrer">
              <Image src={srcCfg.icon} width={24} height={24} alt={srcKey} />
            </a>
          )
        )}
      </div>
      <Chatbot />
    </div>
  );
}
