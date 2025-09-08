"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "أهلاً فيك! 👋 اسأل أي سؤال وخليك مرتاح ✨" },
  ]);
  const [input, setInput] = useState("");
  const [paused, setPaused] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(50);     // للعرض فقط (التحكم الحقيقي عندك أنت)
  const [monthlyLimit, setMonthlyLimit] = useState(1000); // للعرض فقط
  const [usedToday, setUsedToday] = useState(0);
  const [usedMonth, setUsedMonth] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // محاكاة تتبع الاستخدام (LocalStorage للعرض فقط)
  useEffect(() => {
    const d = Number(localStorage.getItem("mgi_used_today") || 0);
    const m = Number(localStorage.getItem("mgi_used_month") || 0);
    setUsedToday(d);
    setUsedMonth(m);
  }, []);

  useEffect(() => {
    localStorage.setItem("mgi_used_today", String(usedToday));
  }, [usedToday]);
  useEffect(() => {
    localStorage.setItem("mgi_used_month", String(usedMonth));
  }, [usedMonth]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    if (paused) {
      setMessages(m => [...m, { role: "assistant", text: "⏸️ البوت متوقف حاليًا (Paused)" }]);
      return;
    }
    if (usedToday >= dailyLimit || usedMonth >= monthlyLimit) {
      setMessages(m => [...m, { role: "assistant", text: "🚦 وصلت للحد المسموح به. الرجاء الترقية أو انتظار التجديد." }]);
      return;
    }
    const userMsg = input.trim();
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg }),
      });
      const data = await res.json();
      const text: string = data.reply || "حاضر ✅";
      setMessages(m => [...m, { role: "assistant", text }]);
      setUsedToday(v => v + 1);
      setUsedMonth(v => v + 1);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "⚠️ صار خطأ مؤقت. جرّب لاحقًا." }]);
    }
  };

  return (
    <div className="card w-full max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">🤖 MGI Chatbot</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 rounded-full bg-mgi-yellow/30">اليومي: {usedToday}/{dailyLimit}</span>
          <span className="px-2 py-1 rounded-full bg-mgi-lime/30">الشهري: {usedMonth}/{monthlyLimit}</span>
          <button
            onClick={() => setPaused(p => !p)}
            className={"px-3 py-1 rounded-xl text-white transition " + (paused ? "bg-red-500 hover:bg-red-600" : "bg-mgi-blue hover:bg-blue-700")}
            title="Pause/Resume"
          >
            {paused ? "Resume ▶️" : "Pause ⏸️"}
          </button>
        </div>
      </div>

      <div ref={listRef} className="mt-4 h-72 overflow-y-auto rounded-xl p-4 bg-gradient-to-br from-white to-white/60 border">
        {messages.map((m, i) => (
          <div key={i} className={"mb-3 flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={"max-w-[85%] px-3 py-2 rounded-2xl shadow " + (m.role === "user" ? "bg-mgi-purple text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm")}>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e)=>{ if(e.key==="Enter") send() }}
          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mgi-purple"
          placeholder="اكتب سؤالك مع إيموجيز 🙂✨"
        />
        <button
          onClick={send}
          className="px-5 py-3 rounded-xl text-white bg-mgi-pink hover:scale-105 active:scale-95 transition shadow-lg"
          title="Send"
        >
          ✈️ Send
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-600">
        وُسِم مائي:{" "}
        <a href="https://miamiglobalgroup.com" target="_blank" className="underline text-mgi-blue">
          this bot created by Miami Global Investments Group
        </a>
      </div>
    </div>
  );
}