"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "أهلاً فيك! 👋 اسأل أي سؤال ✨" },
  ]);
  const [input, setInput] = useState("");
  const [paused, setPaused] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(50);
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const [usedToday, setUsedToday] = useState(0);
  const [usedMonth, setUsedMonth] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = Number(localStorage.getItem("mgi_used_today") || 0);
    const m = Number(localStorage.getItem("mgi_used_month") || 0);
    setUsedToday(d); setUsedMonth(m);
  }, []);
  useEffect(() => { localStorage.setItem("mgi_used_today", String(usedToday)); }, [usedToday]);
  useEffect(() => { localStorage.setItem("mgi_used_month", String(usedMonth)); }, [usedMonth]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    if (paused) { setMessages(m => [...m, { role: "assistant", text: "⏸️ البوت متوقف (Paused)" }]); return; }
    if (usedToday >= dailyLimit || usedMonth >= monthlyLimit) {
      setMessages(m => [...m, { role: "assistant", text: "🚦 وصلت للحد المسموح. رجاءً الترقية أو الانتظار." }]);
      return;
    }
    const userMsg = input.trim();
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: userMsg }) });
      const data = await res.json();
      const text: string = data.reply || "حاضر ✅";
      setMessages(m => [...m, { role: "assistant", text }]);
      setUsedToday(v => v + 1); setUsedMonth(v => v + 1);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "⚠️ خطأ مؤقت. جرّب لاحقًا." }]);
    }
  };

  return (
    <div className="card w-full max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">🤖 MGI Chatbot</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 rounded-full bg-yellow-200/60">اليومي: {usedToday}/{dailyLimit}</span>
          <span className="px-2 py-1 rounded-full bg-green-200/60">الشهري: {usedMonth}/{monthlyLimit}</span>
          <button onClick={() => setPaused(p => !p)} className={"px-3 py-1 rounded-xl text-white transition " + (paused ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700")} title="Pause/Resume">
            {paused ? "Resume ▶️" : "Pause ⏸️"}
          </button>
        </div>
      </div>
      <div ref={listRef} className="mt-4 h-72 overflow-y-auto rounded-xl p-4 bg-gradient-to-br from-white to-white/60 border">
        {messages.map((m, i) => (
          <div key={i} className={"mb-3 flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={"max-w-[85%] px-3 py-2 rounded-2xl shadow " + (m.role === "user" ? "bg-purple-600 text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm")}>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==="Enter") send() }} className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="اكتب سؤالك مع إيموجيز 🙂✨" />
        <button onClick={send} className="px-5 py-3 rounded-xl text-white bg-pink-500 hover:scale-105 active:scale-95 transition shadow-lg" title="Send">✈️ Send</button>
      </div>
      <div className="mt-3 text-xs text-gray-600">
        وُسِم مائي:{" "}
        <a href="https://miamiglobalgroup.com" target="_blank" className="underline text-blue-600">this bot created by Miami Global Investments Group</a>
      </div>
    </div>
  );
}