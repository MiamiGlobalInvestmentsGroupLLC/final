export default function Dashboard() {
  return (
    <main className="container py-12">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-bold">📊 Usage</h2>
          <p className="text-gray-600 mt-2">عرض سريع لاستهلاك الرسائل اليومي والشهري لكل عميل (ديمو).</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold">⚙️ Controls</h2>
          <p className="text-gray-600 mt-2">إيقاف/تشغيل البوت، ضبط حدود الاستخدام (التحكم الحقيقي يكون من طرفك).</p>
        </div>
      </div>
    </main>
  );
}