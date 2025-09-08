import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, dailyUsed: 0, dailyLimit: 100, monthlyUsed: 0, monthlyLimit: 3000 });
}
