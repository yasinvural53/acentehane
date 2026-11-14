"use client";
import { useState } from "react";
import {
  ArrowDownToLine,
  ChartNoAxesCombined,
  FileText,
  Wallet,
} from "lucide-react";
import { useDemo } from "./demo-provider";
import { downloadCsv, money, products } from "@/lib/demo";
import { Button, Card, PageHeader, StatCard } from "@/components/ui";
export function Reports() {
  const { data } = useDemo();
  const [period, setPeriod] = useState("all");
  const policies = data.policies.filter(
    (p) =>
      p.status === "Aktif" && (period === "all" || p.issued.startsWith(period)),
  );
  const total = policies.reduce((s, p) => s + p.premium, 0);
  const rows = products.map((product) => ({
    product,
    count: policies.filter((p) => p.product === product).length,
    total: policies
      .filter((p) => p.product === product)
      .reduce((s, p) => s + p.premium, 0),
  }));
  return (
    <>
      <PageHeader
        title="Raporlar"
        description="Demo portföyünüzün prim üretimini ve branş dağılımını inceleyin."
        action={
          <Button
            variant="secondary"
            onClick={() =>
              downloadCsv(
                "acentehane-demo-rapor.csv",
                ["Branş", "Poliçe sayısı", "Prim (TL)"],
                rows.map((r) => [r.product, r.count, r.total]),
              )
            }
          >
            <ArrowDownToLine size={16} />
            Raporu indir
          </Button>
        }
      />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Yalnızca aktif demo poliçeler · Başlangıç tarihine göre
        </p>
        <label className="flex items-center gap-3 text-xs text-slate-500">
          Dönem
          <select
            aria-label="Rapor dönemi"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="all">Tüm dönemler</option>
            <option value="2026-11">Kasım 2026</option>
            <option value="2026-10">Ekim 2026</option>
            <option value="2026-09">Eylül 2026</option>
            <option value="2026-08">Ağustos 2026</option>
          </select>
        </label>
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Toplam prim"
          value={money(total)}
          detail="Seçili dönem · demo"
          icon={<Wallet size={18} />}
        />
        <StatCard
          label="Poliçe sayısı"
          value={policies.length}
          detail="Aktif demo poliçeler"
          icon={<FileText size={18} />}
        />
        <StatCard
          label="Ortalama prim"
          value={money(policies.length ? total / policies.length : 0)}
          detail="Prim / poliçe sayısı"
          icon={<ChartNoAxesCombined size={18} />}
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card title="Branş bazında prim">
          <div className="space-y-6 p-6">
            {rows.map((r) => (
              <div key={r.product}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{r.product}</span>
                  <span className="font-medium">{money(r.total)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${total ? (r.total / total) * 100 : 0}%` }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-400">
                  {r.count} poliçe · %
                  {total ? Math.round((r.total / total) * 100) : 0} pay
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Şube performansı">
          <div className="divide-y divide-slate-100">
            {data.branches.map((b) => {
              const items = policies.filter((p) => p.branchId === b.id);
              return (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-3 p-5"
                >
                  <div>
                    <p className="text-sm font-medium">{b.name}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {items.length} poliçe · {b.city}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    {money(items.reduce((s, p) => s + p.premium, 0))}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="m-5 rounded-lg bg-slate-50 p-4 text-xs leading-5 text-slate-500">
            Bu rapor ekranda bulunan demo kayıtlardan hesaplanır. Tahsilat,
            komisyon, muhasebe mutabakatı ve canlı şirket verileri kapsam
            dışıdır.
          </div>
        </Card>
      </div>
    </>
  );
}
