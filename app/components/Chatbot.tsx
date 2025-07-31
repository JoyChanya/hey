// app/components/Chatbot.tsx
"use client";
import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";


  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1️⃣ Add the user message to your UI immediately:
    setMessages((m) => [...m, { from: "user", text: input }]);
    const userInput = input;
    setInput("");

    try {
      // 2️⃣ Call your back‐end endpoint here:
        const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
        });
        if (!res.ok) throw new Error(await res.text());
        const { reply } = await res.json();

      // 3️⃣ Add the bot’s reply to your UI:
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    } catch (err) {
      console.error("chat error", err);
      setMessages((m) => [
        ...m,
        { from: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded shadow-lg p-4 rounded-lg">
    <h2 className="text-xl font-bold text-[#01A971]">สอบถามกู้ดดี้ได้เลยครับ !</h2>
      <div className="h-44 overflow-y-auto mb-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.from === "user"
                ? "text-right text-green-600"
                : "text-left text-gray-800"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message…"
        />
        <button
          className="px-3 py-1 bg-[#01A971] text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
