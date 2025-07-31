// app/layout.tsx
import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import "react-chat-widget/lib/styles.css"; // the chat widget styles
import Chatbot from "./components/Chatbot";

import type { ReactNode } from "react";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"], // เลือกน้ำหนักที่ใช้จริง
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hey",
  description: "let's read our reviews",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}