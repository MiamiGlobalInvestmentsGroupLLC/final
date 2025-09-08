import Link from "next/link";
export default function CatchAll() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="card text-center">
        <h1 className="text-3xl font-bold text-red-500">404 — Page Not Found</h1>
        <p className="mt-3 text-gray-600">هالمسار غير موجود.</p>
        <Link href="/" className="mt-6 inline-block px-6 py-3 bg-mgi-blue text-white rounded-xl shadow hover:bg-blue-700 transition">
          ← الرجوع للرئيسية
        </Link>
      </div>
    </main>
  );
}