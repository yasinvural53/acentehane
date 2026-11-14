"use client";
import { useState, type FormEvent } from "react";
import { Check, GitCompareArrows, Plus } from "lucide-react";
import { useDemo } from "./demo-provider";
import {
  customerName,
  money,
  products,
  type Product,
  type Quote,
} from "@/lib/demo";
import {
  Badge,
  Button,
  Card,
  DataTable,
  Field,
  Message,
  Modal,
  Notice,
  PageHeader,
} from "@/components/ui";
export function Quotes() {
  const { data, setData } = useDemo();
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [message, setMessage] = useState("");
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const product = String(f.get("product")) as Product;
    const amounts: Record<Product, number> = {
      Trafik: 8500,
      Kasko: 22500,
      Konut: 6000,
      Sağlık: 16000,
      İşyeri: 32000,
    };
    const q: Quote = {
      id: `T-${crypto.randomUUID().slice(0, 8)}`,
      customerId: String(f.get("customerId")),
      product,
      premium: amounts[product],
      status: "Hazırlanıyor",
    };
    setData((prev) => ({ ...prev, quotes: [q, ...prev.quotes] }));
    setAdding(false);
    setSelected(q);
  }
  function compare() {
    if (!selected) return;
    setData((prev) => ({
      ...prev,
      quotes: prev.quotes.map((q) =>
        q.id === selected.id ? { ...q, status: "Karşılaştırıldı" } : q,
      ),
    }));
    setSelected(null);
    setMessage(
      "Demo karşılaştırma tamamlandı. Hiçbir sigorta şirketine istek gönderilmedi ve poliçe düzenlenmedi.",
    );
  }
  return (
    <>
      <PageHeader
        title="Teklifler"
        description="Örnek teklif akışını deneyin, kurgusal seçenekleri yan yana karşılaştırın."
        action={
          <Button onClick={() => setAdding(true)}>
            <Plus size={16} />
            Yeni demo teklif
          </Button>
        }
      />
      <div className="mb-6">
        <Notice>
          Teklifler sabit demo verilerinden oluşturulur. Tutarlar şirket
          tarifesi değildir; gerçek fiyat, teminat veya uygunluk bilgisi
          içermez.
        </Notice>
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Toplam teklif", data.quotes.length],
          [
            "Hazırlanıyor",
            data.quotes.filter((q) => q.status === "Hazırlanıyor").length,
          ],
          [
            "Karşılaştırıldı",
            data.quotes.filter((q) => q.status === "Karşılaştırıldı").length,
          ],
        ].map(([label, value]) => (
          <Card key={label} className="p-5">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>
      {message && <Message>{message}</Message>}
      <DataTable
        title="Teklifler"
        rows={data.quotes}
        searchText={(q) =>
          `${q.id} ${customerName(data, q.customerId)} ${q.product}`
        }
        onOpen={setSelected}
        filename="acentehane-demo-teklifler.csv"
        columns={[
          {
            label: "Teklif",
            render: (q) => (
              <div>
                <p className="font-medium">
                  {customerName(data, q.customerId)}
                </p>
                <p className="mt-1 text-xs text-slate-400">{q.id}</p>
              </div>
            ),
            csv: (q) => `${q.id} / ${customerName(data, q.customerId)}`,
          },
          {
            label: "Branş",
            render: (q) => <Badge tone="purple">{q.product}</Badge>,
            csv: (q) => q.product,
          },
          {
            label: "Örnek başlangıç tutarı",
            render: (q) => money(q.premium),
            csv: (q) => q.premium,
          },
          {
            label: "Durum",
            render: (q) => (
              <Badge tone={q.status === "Karşılaştırıldı" ? "green" : "amber"}>
                {q.status}
              </Badge>
            ),
            csv: (q) => q.status,
          },
          {
            label: "İşlem",
            render: (q) => (
              <Button variant="ghost" onClick={() => setSelected(q)}>
                <GitCompareArrows size={15} />
                Karşılaştır
              </Button>
            ),
            csv: () => "Yalnızca demo",
          },
        ]}
      />
      {adding && (
        <Modal title="Yeni demo teklif" onClose={() => setAdding(false)}>
          <Notice>
            Hazır örnek seçenekler gösterilir. API çağrısı yapılmaz.
          </Notice>
          <form onSubmit={save} className="space-y-4">
            <Field label="Müşteri">
              <select name="customerId" className="field-control">
                {data.customers.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Branş">
              <select name="product" className="field-control">
                {products.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Button type="submit">Demo seçenekleri göster</Button>
          </form>
        </Modal>
      )}
      {selected && (
        <Modal
          title="Demo teklif karşılaştırması"
          onClose={() => setSelected(null)}
        >
          <p className="text-sm text-slate-600">
            {customerName(data, selected.customerId)} · {selected.product}
          </p>
          <Notice>
            Üç seçenek de kurgusaldır. Gerçek şirket teklifi veya poliçe satın
            alma işlemi değildir.
          </Notice>
          <div className="grid gap-3 sm:grid-cols-3">
            {[1, 1.12, 1.24].map((rate, i) => (
              <div
                key={rate}
                className={`rounded-xl border p-4 ${i === 0 ? "border-brand-200 bg-brand-50" : "border-slate-200"}`}
              >
                <Badge tone={i === 0 ? "purple" : "neutral"}>
                  Örnek {String.fromCharCode(65 + i)}
                </Badge>
                <p className="mt-4 text-xl font-semibold">
                  {money(selected.premium * rate)}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">Kurgusal prim</p>
                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <p className="flex gap-1">
                    <Check size={13} />
                    Örnek teminat {i + 1}
                  </p>
                  <p className="flex gap-1">
                    <Check size={13} />
                    Demo koşullar
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={compare}>İncelendi olarak işaretle</Button>
        </Modal>
      )}
    </>
  );
}
