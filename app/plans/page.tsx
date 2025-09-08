export default function Plans() {
  return (
    <main className="container py-12">
      <div className="card text-center">
        <h1 className="text-4xl font-extrabold">💎 اختر خطتك</h1>
        <p className="text-gray-600 mt-2">سيتم ربط الدفع بمتجرك Shopify لاحقًا — حاليًا روابط مؤقتة.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <a href="https://miamiglobalgroup.com" target="_blank" className="card hover:scale-105 transition">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="mt-2">$0 / month</p>
          </a>
          <a href="https://miamiglobalgroup.com" target="_blank" className="card hover:scale-105 transition">
            <h2 className="text-2xl font-bold">Starter</h2>
            <p className="mt-2">$9 / month</p>
          </a>
          <a href="https://miamiglobalgroup.com" target="_blank" className="card hover:scale-105 transition">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="mt-2">$29 / month</p>
          </a>
        </div>
      </div>
    </main>
  );
}