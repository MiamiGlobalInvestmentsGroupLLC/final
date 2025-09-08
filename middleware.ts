import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function t(s:string){ return new TextEncoder().encode(s) }
function toBase64Url(bytes:ArrayBuffer){
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  const b64 = btoa(bin);
  return b64.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
async function sign(secret:string, payload:string){
  const key = await crypto.subtle.importKey("raw", t(secret), {name:"HMAC", hash:"SHA-256"}, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, t(payload));
  return toBase64Url(sig);
}
async function verify(secret:string, token:string){
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = [parts[0], parts[1]];
  const [role, email, expStr] = payload.split("|");
  const exp = Number(expStr||0);
  if (!role || !email || !exp || exp*1000 < Date.now()) return false;
  const expect = await sign(secret, payload);
  return sig === expect && role === "admin";
}

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const cookie = req.cookies.get("admin_session")?.value || "";
    const secret = process.env.ADMIN_SECRET || process.env.NEXTAUTH_SECRET || "";
    if (!secret || !cookie || !(await verify(secret, cookie))) {
      const redirectUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
