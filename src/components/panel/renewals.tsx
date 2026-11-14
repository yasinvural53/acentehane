"use client";
import { useState } from "react";
import { CalendarClock, Check, Clock3 } from "lucide-react";
import { useDemo } from "./demo-provider";
import {
  customerName,
  dateLabel,
  daysLeft,
  getRenewals,
  money,
} from "@/lib/demo";
import {
  Badge,
  Button,
  DataTable,
  Message,
  Notice,
  PageHeader,
  StatCard,
} from "@/components/ui";
export function Renewals() {
  const { data, setData } = useDemo();
  const [within, setWithin] = useState(data.settings.renewalDays);
  const [message, setMessage] = useState("");
  const rows = getRenewals(data.policies, within);
  return (
    <>
      <PageHeader
        title="Yenilemeler"
        description="Yaklaşan poliçe bitişlerini önceliklendirin ve demo takip listenizi yönetin."
        action={
          <label className="flex items-center gap-3 text-xs text-slate-500">
            Zaman aralığı
            <select
              aria-label="Yenileme aralığı"
              value={within}
              onChange={(e) => setWithin(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white p-2.5 text-sm"
            >
              <option value={7}>7 gün</option>
              <option value={30}>30 gün</option>
              <option value={60}>60 gün</option>
              <option value={365}>1 yıl</option>
            </select>
          </label>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Bu aralıkta"
          value={rows.length}
          detail={`Önümüzdeki ${within} gün`}
          icon={<CalendarClock size={18} />}
        />
        <StatCard
          label="Öncelikli"
          value={rows.filter((p) => daysLeft(p.end) <= 7).length}
          detail="7 gün veya daha az kalan"
          icon={<Clock3 size={18} />}
        />
        <StatCard
          label="Takibe alınan"
          value={rows.filter((p) => data.tracked.includes(p.id)).length}
          detail="Seçili aralıktaki demo takipler"
          icon={<Check size={18} />}
        />
      </div>
      <div className="mb-5">
        <Notice>
          Hesaplamalar 14 Kasım 2026 örnek tarihine göredir. Takibe alma
          yalnızca bir ekran işlemidir; e-posta, SMS veya otomatik yenileme
          başlatmaz.
        </Notice>
      </div>
      {message && <Message>{message}</Message>}
      <DataTable
        title="Yenilemeler"
        rows={rows}
        searchText={(p) =>
          `${p.id} ${customerName(data, p.customerId)} ${p.product}`
        }
        filename="acentehane-demo-yenilemeler.csv"
        columns={[
          {
            label: "Müşteri / poliçe",
            render: (p) => (
              <div className="font-medium">
                {customerName(data, p.customerId)}
                <p className="mt-1 text-xs font-normal text-slate-400">
                  {p.id} · {p.product}
                </p>
              </div>
            ),
            csv: (p) => `${customerName(data, p.customerId)} / ${p.id}`,
          },
          {
            label: "Bitiş",
            render: (p) => dateLabel(p.end),
            csv: (p) => p.end,
          },
          {
            label: "Kalan süre",
            render: (p) => (
              <Badge tone={daysLeft(p.end) <= 7 ? "red" : "amber"}>
                {daysLeft(p.end)} gün
              </Badge>
            ),
            csv: (p) => daysLeft(p.end),
          },
          {
            label: "Mevcut prim",
            render: (p) => money(p.premium),
            csv: (p) => p.premium,
          },
          {
            label: "Takip",
            render: (p) => (
              <Button
                variant={data.tracked.includes(p.id) ? "secondary" : "ghost"}
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    tracked: prev.tracked.includes(p.id)
                      ? prev.tracked.filter((id) => id !== p.id)
                      : [...prev.tracked, p.id],
                  }));
                  setMessage(`${p.id}: demo takip durumu güncellendi.`);
                }}
              >
                {data.tracked.includes(p.id) ? (
                  <>
                    <Check size={14} />
                    Takipten çıkar
                  </>
                ) : (
                  "Takibe al"
                )}
              </Button>
            ),
            csv: (p) => (data.tracked.includes(p.id) ? "Takipte" : "Bekliyor"),
          },
        ]}
      />
    </>
  );
}
