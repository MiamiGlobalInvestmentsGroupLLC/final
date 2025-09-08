import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // رد منسق بنقاط + إيموجي (ديمو)
  const reply = [
    "✨ جواب البوت:",
    "• تحليل سريع لسؤالك",
    "• نقاط مرتبة وواضحة",
    "• تنسيق حلو مع إيموجيز",
    "• للمزيد، جرّب سؤال آخر 😉",
  ].join("\n");

  return NextResponse.json({ reply });
}