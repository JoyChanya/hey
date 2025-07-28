// app/reviews/page.tsx
"use client";

import React, { useEffect, useMemo, useState, Fragment } from "react";

import {
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";

import Navbar from "../components/Navbar";
import PillRow from "../components/PillRow";
import Pill from "../components/Pill";
import StarPill from "../components/StarPill";
import SortDropdown from "../components/SortDropdown";
import ReviewCard from "../components/ReviewCard";
import Pagination from "../components/Pagination";
import NoResult from "../components/NoResult";
import FilterModal from "../components/FilterModal";


export type ProductType = "MOTOR" | "TRAVEL" | "ACCIDENT";

export interface ReviewItem {
  id: number;
  name: string;
  date: string; // ISO string
  rating: number;
  reviewsTags: ReviewsTags[];
  product: string;
  productType: ProductType;
  text: string;
  source?: Source | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsTags { 
  reviewId: number;
  tag: tag;
  tagId: number;
}

export interface tag {
  id: number;
  name: string;
}

export type Source = "facebook" | "tiktok" | "instagram" | "survey" | "other";

/* ---------------- Configs ---------------- */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const PER_PAGE = 12; // 3 columns x 4 rows

const PRODUCT_PILLS: { key: ProductType; label: string }[] = [
  { key: "MOTOR", label: "ประกันรถยนต์" },
  { key: "TRAVEL", label: "ประกันเดินทาง" },
  { key: "ACCIDENT", label: "ประกันอุบัติเหตุ" }
];

// Compact mobile options
const MOBILE_PRODUCTS: ProductType[] = ["MOTOR", "TRAVEL"]; // show 2 only

// Exact star ratings
const RATING_BUCKETS = [5, 4, 3, 2, 1] as const;
const MOBILE_RATINGS = [5, 4] as const;

// Demo tags (no backend support yet)
const TAG_PILLS = [
  "การบริการ",
  "ราคา",
  "การเปรียบเทียบ",
  "การจ่ายเงิน",
  "การเคลมประกัน",
  "โปรโมชั่น",
  "ตอบแชทไว",
  "ใช้ง่าย",
  "คำแนะนำ",
  "การผ่อนชำระ"
] as const;
const MOBILE_TAGS = TAG_PILLS.slice(0, 3);



/* ---------------- Page ---------------- */
export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]); // multi-select
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [page, setPage] = useState(1);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // mobile modal
  const [openFilterModal, setOpenFilterModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((r) => r.json())
      .then((data: ReviewItem[]) => setAllReviews(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  //console.log(allReviews);

  /* ---- Filter ---- */
  const filtered = useMemo(() => {
    let data = [...allReviews];

    if (selectedProducts.length) {
      data = data.filter((r) => selectedProducts.includes(r.productType));
    }

    if (selectedRatings.length) {
      data = data.filter((r) => selectedRatings.includes(r.rating));
    }

    // selectedTags demo only
    if (selectedTags.length) {
    data = data.filter((r) =>
      r.reviewsTags.some((rt) =>
        selectedTags.includes(rt.tag.name)
      )
    );
  }

    return data;
  }, [allReviews, selectedProducts, selectedRatings, selectedTags]);

  /* ---- Sort ---- */
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "date") {
        const d = new Date(b.date).getTime() - new Date(a.date).getTime();
        return d !== 0 ? d : b.rating - a.rating;
      }
      const r = b.rating - a.rating;
      return r !== 0 ? r : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [filtered, sortBy]);

  /* ---- Pagination ---- */
  const totalPages = Math.ceil(sorted.length / PER_PAGE) || 1;
  const pageData = useMemo(
    () => sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [sorted, page]
  );

  /* ---- Toggles ---- */
  const toggleProduct = (p: ProductType) =>
    setSelectedProducts((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const toggleRating = (r: number) =>
    setSelectedRatings((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));

  const toggleTag = (tagName: string) =>
  setSelectedTags((prev) =>
    prev.includes(tagName)
      ? prev.filter((t) => t !== tagName)
      : [...prev, tagName]
  );

  const toggleCard = (id: number) =>
    setSelectedCards((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const clearFilters = () => {
    setSelectedProducts([]);
    setSelectedRatings([]);
    setSelectedTags([]);
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#111] text-white">
      <section className="container mx-auto px-4 pt-10">
        <h1 className="text-3xl font-semibold">รีวิวจากลูกค้า hey</h1>

        {/* ================= MOBILE COMPACT FILTERS ================= */}
        <div className="mt-6 space-y-3 md:hidden">
          {/* product compact */}
          <PillRow>
            {MOBILE_PRODUCTS.map((p) => {
              const pill = PRODUCT_PILLS.find((x) => x.key === p)!;
              return (
                <Pill
                  key={p}
                  active={selectedProducts.includes(p)}
                  onClick={() => toggleProduct(p)}
                  activeClass="bg-sky-400 text-black"
                >
                  {pill.label}
                </Pill>
              );
            })}
          </PillRow>

          {/* rating compact */}
          <PillRow>
            {MOBILE_RATINGS.map((r) => (
              <StarPill
                key={r}
                rating={r}
                active={selectedRatings.includes(r)}
                onClick={() => toggleRating(r)}
              />
            ))}
          </PillRow>

          {/* tag compact */}
          <PillRow>
            {MOBILE_TAGS.map((t) => (
              <Pill key={t} active={selectedTags.includes(t)} onClick={() => toggleTag(t)}>
                {t}
              </Pill>
            ))}

            {/* settings button */}
            <button
              onClick={() => setOpenFilterModal(true)}
              className="ml-auto flex items-center justify-center w-16 h-10 rounded-full border border-gray-500/60"
            >
              <AdjustmentsHorizontalIcon className="w-6 h-6" />
            </button>
          </PillRow>
        </div>

        {/* ================= DESKTOP FULL FILTERS ================= */}
        <div className="mt-6 space-y-4 hidden md:block">
          <p className="text-sm text-gray-300">เลือกหัวข้อที่คุณสนใจได้เลย !</p>

          {/* Product */}
          <PillRow>
            {PRODUCT_PILLS.map(({ key, label }) => (
              <Pill
                key={key}
                active={selectedProducts.includes(key)}
                onClick={() => toggleProduct(key)}
                activeClass="bg-sky-400 text-black"
              >
                {label}
              </Pill>
            ))}
          </PillRow>

          {/* Rating */}
          <PillRow>
            {RATING_BUCKETS.map((r) => (
              <StarPill
                key={r}
                rating={r}
                active={selectedRatings.includes(r)}
                onClick={() => toggleRating(r)}
              />
            ))}
          </PillRow>

          {/* Tags*/}
          <PillRow>
            {TAG_PILLS.map((tagName) => (
              <Pill
                key={tagName}
                active={selectedTags.includes(tagName)}
                onClick={() => toggleTag(tagName)}
              >
                {tagName}
              </Pill>
            ))}
          </PillRow>

          {/* Sort + clear */}
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={clearFilters}
              className="text-xs text-pink-300 hover:underline flex items-center gap-1"
            >
              <span className="rotate-180 inline-block">↻</span> ล้างการกรองทั้งหมด
            </button>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
      </section>

      {/* Result */}
      <section className="container mx-auto px-4 mt-10 pb-20">
        {loading ? (
          <div className="h-40 flex items-center justify-center text-gray-400">Loading...</div>
        ) : pageData.length === 0 ? (
          <NoResult onClear={clearFilters} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageData.map((r) => (
              <ReviewCard
                key={r.id}
                review={r}
                selected={selectedCards.includes(r.id)}
                onSelect={() => toggleCard(r.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageData.length > 0 && (
          <Pagination current={page} total={totalPages} onChange={setPage} />
        )}
      </section>

      {/* Mobile full filter modal */}
      <FilterModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        selectedProducts={selectedProducts}
        toggleProduct={toggleProduct}
        selectedRatings={selectedRatings}
        toggleRating={toggleRating}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
      />
    </main>
    </>
  );
}
