"use client";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        window.location.href = "/admin"; // غيّرها لمسار لوحة الأدمن عندك
      } else {
        const data = await res.json().catch(()=>({message:"Invalid"}));
        setError(data?.message || "Invalid credentials");
      }
    } catch (err:any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl shadow p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 outline-none" placeholder="admin@yourcompany.com"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 outline-none" placeholder="••••••••"/>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg px-4 py-2 border bg-black text-white">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
