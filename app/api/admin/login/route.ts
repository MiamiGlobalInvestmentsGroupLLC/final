import { NextResponse } from "next/server";

// ديمو: تحقق بسيط (استبدله لاحقًا بـ Prisma + Supabase)
const ADMIN_EMAIL = "admin@miamiglobalgroup.com";
const ADMIN_PASSWORD = "StrongPassword123";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}