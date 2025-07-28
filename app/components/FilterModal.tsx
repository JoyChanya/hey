// components/FilterModal.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import PillRow from "./PillRow";
import Pill from "./Pill";
import StarPill from "./StarPill";

export type ProductType = "MOTOR" | "TRAVEL" | "ACCIDENT";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  selectedProducts: ProductType[];
  toggleProduct: (p: ProductType) => void;
  selectedRatings: number[];
  toggleRating: (r: number) => void;
  selectedTags: string[];
  toggleTag: (t: string) => void;
  sortBy: "date" | "rating";
  setSortBy: (v: "date" | "rating") => void;
  clearFilters: () => void;
}

const PRODUCT_PILLS: { key: ProductType; label: string }[] = [
  { key: "MOTOR", label: "ประกันรถยนต์" },
  { key: "TRAVEL", label: "ประกันเดินทาง" },
  { key: "ACCIDENT", label: "ประกันอุบัติเหตุ" },
];

const RATING_BUCKETS = [5, 4, 3, 2, 1] as const;

// Demo tags
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
  "การผ่อนชำระ",
] as const;

export default function FilterModal({
  open,
  onClose,
  selectedProducts,
  toggleProduct,
  selectedRatings,
  toggleRating,
  selectedTags,
  toggleTag,
  sortBy,
  setSortBy,
  clearFilters,
}: FilterModalProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="w-full max-w-md bg-[#222] text-white rounded-t-2xl p-6 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-semibold">กรองรีวิว</Dialog.Title>
                  <button onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Full filters */}
                <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
                  {/* Product */}
                  <section>
                    <h4 className="font-semibold mb-2">ประเภทประกัน</h4>
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
                  </section>

                  {/* Rating */}
                  <section>
                    <h4 className="font-semibold mb-2">คะแนนโดยลูกค้า</h4>
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
                  </section>

                  {/* Tags */}
                  <section>
                    <h4 className="font-semibold mb-2">การกล่าวถึง</h4>
                    <PillRow>
                      {TAG_PILLS.map((t) => (
                        <Pill
                          key={t}
                          active={selectedTags.includes(t)}
                          onClick={() => toggleTag(t)}
                          activeClass="bg-sky-400 text-black"
                        >
                          {t}
                        </Pill>
                      ))}
                    </PillRow>
                  </section>

                  {/* Sort */}
                  <section>
                    <h4 className="font-semibold mb-2">เรียงตาม</h4>
                    <div className="flex gap-2">
                      <button
                        className={`px-4 py-1 rounded-full border border-gray-500/60 text-sm ${
                          sortBy === "date" ? "bg-white text-black" : "text-gray-200 hover:bg-white/10"
                        }`}
                        onClick={() => setSortBy("date")}
                      >
                        วันที่ล่าสุด
                      </button>
                      <button
                        className={`px-4 py-1 rounded-full border border-gray-500/60 text-sm ${
                          sortBy === "rating" ? "bg-white text-black" : "text-gray-200 hover:bg-white/10"
                        }`}
                        onClick={() => setSortBy("rating")}
                      >
                        คะแนนสูงสุด
                      </button>
                    </div>
                  </section>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-between gap-3">
                  <button
                    onClick={() => {
                      clearFilters();
                      onClose();
                    }}
                    className="flex-1 py-2 rounded-full bg-[#444] text-white text-sm"
                  >
                    ดูทั้งหมด
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 rounded-full bg-green-500 text-black text-sm"
                  >
                    ใช้
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
