"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="container py-12">
      <div className="card max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center">🔐 Admin Login</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input name="email" type="email" placeholder="Admin Email" className="w-full border p-3 rounded-xl" required />
          <input name="password" type="password" placeholder="Password" className="w-full border p-3 rounded-xl" required />
          <button type="submit" className="w-full bg-mgi-purple text-white py-3 rounded-xl hover:bg-purple-700 transition">
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </main>
  );
}