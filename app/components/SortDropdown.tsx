import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition as HTransition,
} from "@headlessui/react";

import {
  ChevronDownIcon
} from "@heroicons/react/24/outline";

import { Fragment } from "react";

export default function SortDropdown({
  sortBy,
  setSortBy,
}: {
  sortBy: "date" | "rating";
  setSortBy: (v: "date" | "rating") => void;
}) {
  return (
    <Menu as="div" className="relative z-40 inline-block text-left">
      <MenuButton className="flex items-center gap-1 rounded-full border border-gray-500/60 px-4 py-1 text-sm">
        เรียงตาม <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>
      <HTransition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <MenuItems className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-[#222] shadow ring-1 ring-black/20 focus:outline-none text-sm z-50">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => setSortBy("date")}
                className={`block w-full text-left px-4 py-2 ${
                  active ? "bg-white/10" : ""
                } ${sortBy === "date" ? "text-green-400" : "text-gray-200"}`}
              >
                วันที่ล่าสุด
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => setSortBy("rating")}
                className={`block w-full text-left px-4 py-2 ${
                  active ? "bg-white/10" : ""
                } ${sortBy === "rating" ? "text-green-400" : "text-gray-200"}`}
              >
                คะแนนสูงสุด
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </HTransition>
    </Menu>
  );
}