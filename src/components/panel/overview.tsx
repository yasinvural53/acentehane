"use client";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  FileText,
  Plus,
  TrendingUp,
  UsersRound,
  ArrowUpRight,
  PlugZap,
  CheckCheck,
} from "lucide-react";
import { useDemo } from "./demo-provider";
import {
  money,
  getRenewals,
  customerName,
  daysLeft,
  products,
  dateLabel,
} from "@/lib/demo";
import {
  Badge,
  Card,
  PageHeader,
  StatCard,
  buttonClass,
} from "@/components/ui";
export function Overview() {
  const { data } = useDemo();
  const active = data.policies.filter((p) => p.status === "Aktif");
  const total = active.reduce((sum, p) => sum + p.premium, 0);
  const renewals = getRenewals(data.policies, data.settings.renewalDays);
  const monthly = ["08", "09", "10", "11"].map((month) => ({
    label: { "08": "Ağu", "09": "Eyl", "10": "Eki", "11": "Kas" }[month],
    amount: active
      .filter((p) => p.issued.startsWith(`2026-${month}`))
      .reduce((s, p) => s + p.premium, 0),
  }));
  const max = Math.max(...monthly.map((m) => m.amount), 1);
  return (
    <>
      <PageHeader
        title="Genel Bakış"
        description="Acente işlerinize geniş bir açıdan bakın. Günün öncelikleri burada."
        action={
          <Link
            href="/panel/teklifler"
            className={`${buttonClass} bg-brand-600 text-white hover:bg-brand-700`}
          >
            <Plus size={16} />
            Yeni demo teklif
          </Link>
        }
      />
      <section className="relative mb-6 overflow-hidden rounded-2xl bg-[#f0eafa] px-6 py-6 sm:px-7">
        <div className="relative z-10 max-w-[72%]">
          <span className="text-[10px] font-semibold tracking-[.14em] text-brand-600">
            DAHA DÜZENLİ, DAHA KOLAY
          </span>
          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            İşinize odaklanın,
            <br className="sm:hidden" /> takibi bir arada tutun.
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Örnek portföyünüzde{" "}
            <strong className="text-brand-700">{renewals.length} poliçe</strong>{" "}
            önümüzdeki {data.settings.renewalDays} gün içinde yenilenmeyi
            bekliyor.
          </p>
          <Link
            href="/panel/yenilemeler"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-700"
          >
            Yenilemeleri incele <ArrowRight size={14} />
          </Link>
        </div>
        <div
          aria-hidden
          className="absolute -right-10 -bottom-12 h-56 w-56 rounded-full border-[28px] border-white/40 sm:right-4"
        />
        <div
          aria-hidden
          className="absolute right-9 bottom-8 grid h-24 w-20 rotate-12 place-items-center rounded-2xl border-4 border-white/70 bg-brand-200/40 text-brand-500 shadow-[8px_8px_0_0_#dcd0f2] sm:right-20"
        >
          <CheckCheck size={43} strokeWidth={1.4} />
        </div>
      </section>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Aktif poliçeler"
          value={active.length}
          detail="Örnek portföydeki aktif kayıtlar"
          icon={<FileText size={18} />}
        />
        <StatCard
          label="Toplam müşteri"
          value={data.customers.length}
          detail={`${data.customers.filter((c) => c.type === "Kurumsal").length} kurumsal · ${data.customers.filter((c) => c.type === "Bireysel").length} bireysel`}
          icon={<UsersRound size={18} />}
        />
        <StatCard
          label="Toplam prim"
          value={money(total)}
          detail="Aktif demo poliçelerin toplamı"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="Yaklaşan yenileme"
          value={renewals.length}
          detail={`Önümüzdeki ${data.settings.renewalDays} gün · örnek tarih`}
          icon={<CalendarClock size={18} />}
        />
      </div>
      <div className="mb-6 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <Card title="Prim üretimi" aside={<Badge>2026 · Örnek veriler</Badge>}>
          <div className="p-5">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{money(total)}</p>
              <span className="text-xs text-slate-400">aktif portföy</span>
            </div>
            <div
              className="mt-6 flex h-44 items-end gap-5 border-b border-slate-200 px-5 sm:gap-10"
              role="img"
              aria-label={`Aylara göre demo prim üretimi: ${monthly.map((m) => `${m.label} ${money(m.amount)}`).join(", ")}`}
            >
              {monthly.map((m, i) => (
                <div
                  key={m.label}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="whitespace-nowrap text-[10px] text-slate-500">
                    {money(m.amount)}
                  </span>
                  <div
                    className={`w-full max-w-20 rounded-t-lg ${i === 3 ? "bg-brand-600" : "bg-brand-200/70"}`}
                    style={{ height: `${Math.max((m.amount / max) * 78, 2)}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-5 px-5 pt-3 sm:gap-10">
              {monthly.map((m) => (
                <span
                  key={m.label}
                  className="flex-1 text-center text-[11px] text-slate-500"
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </Card>
        <Card
          title="Branş dağılımı"
          aside={
            <Link
              href="/panel/raporlar"
              aria-label="Branş raporlarına git"
              className="text-slate-400"
            >
              <ArrowUpRight size={17} />
            </Link>
          }
        >
          <div className="space-y-4 p-5">
            {products.map((product, i) => {
              const count = active.filter((p) => p.product === product).length;
              return (
                <div key={product}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${i % 2 === 0 ? "bg-brand-600" : "bg-brand-200"}`}
                      />
                      {product}
                    </span>
                    <span className="text-slate-500">{count} poliçe</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{
                        width: `${active.length ? (count / active.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <Card
          title="Yaklaşan yenilemeler"
          aside={
            <Link
              href="/panel/yenilemeler"
              className="flex items-center gap-1 text-xs font-medium text-brand-600"
            >
              Tümünü gör <ArrowRight size={13} />
            </Link>
          }
        >
          <div className="divide-y divide-slate-100">
            {renewals.slice(0, 4).map((p) => (
              <Link
                href="/panel/yenilemeler"
                key={p.id}
                className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-slate-50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-medium text-slate-500">
                    {customerName(data, p.customerId)
                      .slice(0, 2)
                      .toLocaleUpperCase("tr")}
                  </span>
                  <div>
                    <p className="text-xs font-semibold">
                      {customerName(data, p.customerId)}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {p.product} · {p.insurer}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge tone={daysLeft(p.end) <= 7 ? "red" : "amber"}>
                    {daysLeft(p.end)} gün kaldı
                  </Badge>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {dateLabel(p.end)}
                  </p>
                </div>
              </Link>
            ))}
            {renewals.length === 0 && (
              <p className="p-5 text-sm text-slate-500">
                Seçili aralıkta yenileme yok.
              </p>
            )}
          </div>
        </Card>
        <Card title="Çalışma alanınız">
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-brand-50 p-2.5 text-brand-600">
                <PlugZap size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold">
                  8 şirket, tek entegrasyon alanı
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  API bağlantıları henüz beklemede.
                </p>
              </div>
            </div>
            <Link
              href="/panel/entegrasyonlar"
              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-xs font-medium text-slate-600"
            >
              Bağlantı durumlarını incele <ArrowUpRight size={15} />
            </Link>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400">
                HIZLI ERİŞİM
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/panel/musteriler"
                  className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600"
                >
                  Müşteri ekle <span className="float-right">+</span>
                </Link>
                <Link
                  href="/panel/policeler"
                  className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600"
                >
                  Poliçe kaydı <span className="float-right">+</span>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
