// app/layout.tsx
import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

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
