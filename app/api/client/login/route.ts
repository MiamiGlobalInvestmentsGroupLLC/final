export const runtime = "nodejs";
import { NextResponse } from "next/server";

function enc(s: string) { return new TextEncoder().encode(s); }

async function sign(secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc(data));
  // base64url (Node)
  return Buffer.from(new Uint8Array(sig)).toString("base64url");
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = (body?.email ?? "").trim();
  const password = body?.password ?? "";

  const CLIENT_EMAIL = process.env.CLIENT_EMAIL ?? "";
  const CLIENT_PASSWORD = process.env.CLIENT_PASSWORD ?? "";
  const CLIENT_SECRET = process.env.CLIENT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "";

  if (!CLIENT_EMAIL || !CLIENT_PASSWORD || !CLIENT_SECRET) {
    return NextResponse.json({ message: "Client auth not configured." }, { status: 500 });
  }

  if (email.toLowerCase() !== CLIENT_EMAIL.toLowerCase() || password !== CLIENT_PASSWORD) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const payload = `client|${email}|${exp}`;
  const sig = await sign(CLIENT_SECRET, payload);
  const token = `${payload}.${sig}`;

  const res = NextResponse.json({ ok: true });
  res.cookies.set("client_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
