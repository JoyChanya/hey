// components/Navbar.tsx
"use client";

import Link from "next/link";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";

type NavItem = {
  title: string;
  items?: { label: string; href: string }[]; // ถ้าไม่มี dropdown ให้ไม่ต้องส่ง items
  href?: string; // กรณีเป็นลิงก์เดี่ยว
};

const navItems: NavItem[] = [
  {
    title: "ผลิตภัณฑ์ประกัน",
    items: [
      { label: "ประกันรถยนต์", href: "/motor" },
      { label: "ประกันเดินทาง", href: "/travel" },
      { label: "ประกันบ้าน", href: "/home" },
    ],
  },
  {
    title: "โปรโมชั่น & กิจกรรม",
    items: [
      { label: "โปรแรงสุดสัปดาห์", href: "/promotions" },
      { label: "กิจกรรมลุ้นโชค", href: "/campaigns" },
    ],
  },
  {
    title: "เกี่ยวกับเรา",
    items: [
      { label: "ทีมงาน", href: "/about#team" },
      { label: "พันธมิตร", href: "/about#partners" },
      { label: "ประวัติ", href: "/about#history" },
    ],
  },
  {
    title: "ช่วยเหลือ",
    items: [
      { label: "FAQ", href: "/faq" },
      { label: "ติดต่อเรา", href: "/contact" },
      { label: "ดาวน์โหลดแบบฟอร์ม", href: "/forms" },
    ],
  },
  { title: "heyTalks", href: "/blog" },
];

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#01A971]">hey</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-4">
          {navItems.map((nav) =>
            nav.items ? (
              <Menu as="div" className="relative" key={nav.title}>
                <MenuButton className="inline-flex items-center px-3 py-1 text-gray-700 hover:text-green-600">
                  {nav.title}
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <MenuItems className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none text-sm z-50">
                    {nav.items.map((item) => (
                      <MenuItem key={item.label}>
                        {({ active }) => (
                          <Link
                            href={item.href}
                            className={`block px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            } text-gray-700`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <Link
                key={nav.title}
                href={nav.href ?? "#"}
                className="px-3 py-1 text-gray-700 hover:text-green-600"
              >
                {nav.title}
              </Link>
            )
          )}
          <Link href="/contact" className="px-3 py-1 text-gray-700 hover:text-green-600">
            ติดต่อเรา
          </Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          <button>
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-600 hover:text-green-600" />
          </button>
          <button>
            <UserIcon className="w-6 h-6 text-gray-600 hover:text-green-600" />
          </button>
          <Link href="/login" className="text-gray-700 hover:text-green-600">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </header>
  );
}
