"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  ChevronsUpDown,
  FlaskConical,
  Menu,
  Search,
  ShieldCheck,
} from "lucide-react";
import { navigation } from "@/lib/navigation";
import { getRenewals, normalize } from "@/lib/demo";
import { useDemo } from "./demo-provider";
import { Modal } from "@/components/ui";

export function PanelShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data } = useDemo();
  const renewals = getRenewals(data.policies, data.settings.renewalDays).length;
  const active = navigation.find((n) => n.href === pathname);
  const menu = (
    <>
      <Link
        href="/panel"
        onClick={() => setMobile(false)}
        className="mb-8 flex items-center gap-2.5 px-3 text-[23px] font-semibold tracking-tight"
        aria-label="AcenteHane panel ana sayfa"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <ShieldCheck size={23} strokeWidth={1.8} />
        </span>
        <span>
          Acente<span className="text-brand-600">Hane</span>
          <span className="ml-1 text-brand-500">.</span>
        </span>
      </Link>
      <Link
        href="/panel/acenteler"
        onClick={() => setMobile(false)}
        className="mb-7 flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-100 bg-white text-sm font-semibold text-brand-600">
          MA
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold">{data.settings.name}</p>
          <p className="mt-1 text-[11px] text-slate-500">Demo çalışma alanı</p>
        </div>
        <ChevronsUpDown size={14} className="text-slate-400" />
      </Link>
      <nav aria-label="Yönetim menüsü" className="space-y-1">
        {navigation.map((item) => (
          <div key={item.href}>
            {item.group && (
              <p
                className={`px-3 pb-2 text-[10px] font-semibold tracking-[.12em] text-slate-400 ${item.href === "/panel/acenteler" ? "pt-7" : ""}`}
              >
                {item.group}
              </p>
            )}
            <Link
              href={item.href}
              aria-label={item.label}
              onClick={() => setMobile(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${pathname === item.href ? "bg-brand-50 text-brand-700" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`}
            >
              <item.icon size={18} strokeWidth={1.7} />
              {item.label}
              {item.href === "/panel/yenilemeler" && (
                <span className="ml-auto rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">
                  {renewals}
                </span>
              )}
              {pathname === item.href && item.href !== "/panel/yenilemeler" && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />
              )}
            </Link>
          </div>
        ))}
      </nav>
      <div className="mt-auto pt-8">
        <div className="rounded-xl bg-brand-50 p-4">
          <FlaskConical size={19} className="mb-2 text-brand-600" />
          <p className="text-xs font-semibold">Birlikte geliştirelim.</p>
          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            Tüm modülleri örnek verilerle keşfedin.
          </p>
          <Link
            href="/panel/entegrasyonlar"
            onClick={() => setMobile(false)}
            className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-700"
          >
            Geliştirme durumu <ArrowUpRight size={13} />
          </Link>
        </div>
        <Link
          href="/"
          className="mt-4 flex items-center justify-between px-3 text-xs text-slate-500"
        >
          Tanıtım sitesine dön <ArrowUpRight size={14} />
        </Link>
      </div>
    </>
  );
  return (
    <div className="min-h-screen">
      <a
        href="#panel-content"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded bg-white px-4 py-3 text-brand-700 shadow focus:translate-y-0"
      >
        İçeriğe geç
      </a>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] flex-col overflow-y-auto border-r border-slate-200/80 bg-white p-5 lg:flex">
        {menu}
      </aside>
      {mobile && (
        <Modal title="Yönetim menüsü" onClose={() => setMobile(false)}>
          <div className="flex flex-col">{menu}</div>
        </Modal>
      )}
      <div className="lg:pl-[244px]">
        <header className="flex h-[76px] items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobile(true)}
              aria-label="Menüyü aç"
              className="rounded-lg p-2 lg:hidden"
            >
              <Menu size={21} />
            </button>
            <div className="hidden items-center gap-3 text-xs text-slate-400 sm:flex">
              <span>Çalışma alanı</span>
              <span>/</span>
              <span className="text-slate-600">{active?.label ?? "Panel"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-400"
              aria-label="Modül ara"
            >
              <Search size={16} />
              <span className="hidden md:block">Bir modüle git…</span>
            </button>
            <Link
              href="/panel/yenilemeler"
              aria-label={`${renewals} yaklaşan yenileme`}
              className="relative rounded-lg p-2 text-slate-500"
            >
              <Bell size={19} />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-brand-500" />
            </Link>
            <span className="h-7 w-px bg-slate-200" />
            <Link href="/panel/ayarlar" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                DY
              </span>
              <span className="hidden sm:block">
                <span className="block text-xs font-semibold">
                  Demo Yönetici
                </span>
                <span className="mt-0.5 block text-[10px] text-slate-500">
                  Yetkilendirme henüz bağlı değil
                </span>
              </span>
              <ChevronDown size={13} className="text-slate-400" />
            </Link>
          </div>
        </header>
        <div className="flex items-start gap-2.5 border-b border-brand-100 bg-brand-50/60 px-4 py-2.5 text-[11px] leading-5 text-brand-700 sm:px-8">
          <FlaskConical size={15} className="mt-0.5 shrink-0" />
          <p>
            <strong>Demo ortamı</strong> · Veriler kurgusaldır. Değişiklikler
            yalnızca bu sekmenin belleğinde tutulur ve yenilemede sıfırlanır.
            Gerçek veri girmeyin.
          </p>
        </div>
        <main
          id="panel-content"
          className="mx-auto max-w-[1600px] px-4 py-7 sm:px-8"
        >
          {children}
          <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-5 text-[10px] text-slate-400">
            <span>© AcenteHane · Acente yönetiminde yeni bir bakış.</span>
            <span>Demo referans tarihi: 14 Kasım 2026</span>
          </footer>
        </main>
      </div>
      {searchOpen && (
        <Modal title="Modüle git" onClose={() => setSearchOpen(false)}>
          <label className="block text-sm">
            Modül adı
            <input
              autoFocus
              className="field-control"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Müşteriler, poliçeler…"
            />
          </label>
          <div className="space-y-1">
            {navigation
              .filter((n) => normalize(n.label).includes(normalize(query)))
              .map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 rounded-lg p-3 text-sm hover:bg-brand-50"
                >
                  <n.icon size={18} />
                  {n.label}
                  <ArrowUpRight size={14} className="ml-auto" />
                </Link>
              ))}
            {!navigation.some((n) =>
              normalize(n.label).includes(normalize(query)),
            ) && (
              <p className="p-3 text-sm text-slate-500">Modül bulunamadı.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
