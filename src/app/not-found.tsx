import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-50 p-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-brand-600">ACENTEHANE · 404</p>
        <h1 className="mt-4 text-3xl font-semibold">Bu sayfa bulunamadı.</h1>
        <p className="mt-3 text-sm text-slate-500">
          Bağlantı değişmiş olabilir. Çalışma alanınıza dönebilirsiniz.
        </p>
        <Link
          href="/panel"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Demo panele dön
        </Link>
      </div>
    </main>
  );
}
