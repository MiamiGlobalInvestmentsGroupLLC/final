import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="container py-12 space-y-10">
      <header className="card text-center">
        <h1 className="text-4xl font-extrabold">🚀 MGI Chatbot is Live!</h1>
        <p className="mt-3 text-lg text-gray-600">
          مرحباً بك في منصة Miami Global Investments Group لصناعة بوت محادثة احترافي ✨
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/admin" className="px-5 py-3 bg-mgi-blue text-white rounded-xl hover:scale-105 transition">لوحة الأدمن</Link>
          <Link href="/dashboard" className="px-5 py-3 bg-mgi-purple text-white rounded-xl hover:scale-105 transition">Dashboard</Link>
          <Link href="/plans" className="px-5 py-3 bg-mgi-pink text-white rounded-xl hover:scale-105 transition">الخطط</Link>
        </div>
      </header>

      <section>
        <ChatWidget />
      </section>
    </main>
  );
}