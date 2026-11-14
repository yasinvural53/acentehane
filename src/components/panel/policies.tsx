"use client";
import { useState, type FormEvent } from "react";
import { Plus, FileText, Wallet, CalendarClock, FileUp } from "lucide-react";
import { useDemo } from "./demo-provider";
import {
  customerName,
  dateLabel,
  getRenewals,
  insurers,
  money,
  products,
  type Policy,
  type Product,
} from "@/lib/demo";
import {
  Badge,
  Button,
  DataTable,
  Field,
  Message,
  Modal,
  Notice,
  PageHeader,
  StatCard,
} from "@/components/ui";
export function Policies() {
  const { data, setData } = useDemo();
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<Policy | null>(null);
  const [product, setProduct] = useState("Tümü");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pdfInfo, setPdfInfo] = useState(false);
  const active = data.policies.filter((p) => p.status === "Aktif");
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const issued = String(f.get("issued"));
    const end = String(f.get("end"));
    const premium = Number(f.get("premium"));
    if (end <= issued) {
      setError("Bitiş tarihi başlangıç tarihinden sonra olmalı.");
      return;
    }
    if (!Number.isFinite(premium) || premium <= 0) {
      setError("Prim tutarı sıfırdan büyük olmalı.");
      return;
    }
    const p: Policy = {
      id: `DEMO-${crypto.randomUUID().slice(0, 8)}`,
      customerId: String(f.get("customerId")),
      product: String(f.get("product")) as Product,
      insurer: String(f.get("insurer")),
      premium,
      issued,
      end,
      branchId: String(f.get("branchId")),
      status: "Aktif",
    };
    setData((prev) => ({ ...prev, policies: [p, ...prev.policies] }));
    setAdding(false);
    setError("");
    setProduct("Tümü");
    setMessage(
      "Demo poliçe kaydı eklendi. Sigorta şirketinde poliçe düzenlenmedi.",
    );
  }
  return (
    <>
      <PageHeader
        title="Poliçeler"
        description="Poliçe portföyünüzü, prim tutarlarını ve bitiş tarihlerini takip edin."
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setPdfInfo(true)}>
              <FileUp size={16} />
              PDF aktarımı
            </Button>
            <Button
              onClick={() => {
                setAdding(true);
                setError("");
              }}
            >
              <Plus size={16} />
              Demo poliçe ekle
            </Button>
          </div>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Aktif poliçeler"
          value={active.length}
          detail={`${data.policies.length} toplam demo kayıt`}
          icon={<FileText size={18} />}
        />
        <StatCard
          label="Toplam prim"
          value={money(active.reduce((s, p) => s + p.premium, 0))}
          detail="Aktif demo poliçeler"
          icon={<Wallet size={18} />}
        />
        <StatCard
          label="Yenileme bekleyen"
          value={getRenewals(data.policies, data.settings.renewalDays).length}
          detail={`${data.settings.renewalDays} günlük örnek takvim`}
          icon={<CalendarClock size={18} />}
        />
      </div>
      {message && <Message>{message}</Message>}
      <DataTable
        title="Poliçeler"
        rows={data.policies.filter(
          (p) => product === "Tümü" || p.product === product,
        )}
        searchText={(p) =>
          `${p.id} ${customerName(data, p.customerId)} ${p.insurer}`
        }
        filename="acentehane-demo-policeler.csv"
        filters={
          <select
            aria-label="Branş filtresi"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 px-3 text-xs"
          >
            <option>Tümü</option>
            {products.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        }
        onOpen={setSelected}
        columns={[
          {
            label: "Poliçe / müşteri",
            render: (p) => (
              <div>
                <p className="font-medium">
                  {customerName(data, p.customerId)}
                </p>
                <p className="mt-1 text-xs text-slate-400">{p.id}</p>
              </div>
            ),
            csv: (p) => `${p.id} / ${customerName(data, p.customerId)}`,
          },
          {
            label: "Branş",
            render: (p) => <Badge tone="purple">{p.product}</Badge>,
            csv: (p) => p.product,
          },
          { label: "Şirket", render: (p) => p.insurer, csv: (p) => p.insurer },
          {
            label: "Prim",
            render: (p) => (
              <span className="font-medium tabular-nums">
                {money(p.premium)}
              </span>
            ),
            csv: (p) => p.premium,
          },
          {
            label: "Bitiş",
            render: (p) => (
              <span className="text-slate-500">{dateLabel(p.end)}</span>
            ),
            csv: (p) => p.end,
          },
          {
            label: "Durum",
            render: (p) => (
              <Badge tone={p.status === "Aktif" ? "green" : "neutral"}>
                {p.status}
              </Badge>
            ),
            csv: (p) => p.status,
          },
        ]}
      />
      {adding && (
        <Modal title="Demo poliçe ekle" onClose={() => setAdding(false)}>
          <Notice>
            Bu form manuel bir demo kaydı oluşturur. Gerçek poliçe düzenlenmez;
            PDF alan çıkarma bağlı değildir.
          </Notice>
          <form onSubmit={save} className="space-y-4">
            <Field label="Müşteri">
              <select name="customerId" className="field-control">
                {data.customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Branş">
                <select name="product" className="field-control">
                  {products.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </Field>
              <Field label="Sigorta şirketi">
                <select name="insurer" className="field-control">
                  {insurers.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </Field>
              <Field label="Başlangıç tarihi">
                <input
                  required
                  name="issued"
                  type="date"
                  className="field-control"
                  defaultValue="2026-11-14"
                />
              </Field>
              <Field label="Bitiş tarihi">
                <input
                  required
                  name="end"
                  type="date"
                  className="field-control"
                  defaultValue="2027-11-14"
                />
              </Field>
              <Field label="Prim (TL)">
                <input
                  required
                  name="premium"
                  type="number"
                  min="0.01"
                  max="100000000"
                  step="0.01"
                  className="field-control"
                  placeholder="12500"
                />
              </Field>
              <Field label="Şube">
                <select name="branchId" className="field-control">
                  {data.branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            {error && (
              <p role="alert" className="text-sm text-rose-700">
                {error}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setAdding(false)}>
                Vazgeç
              </Button>
              <Button type="submit">Demo kaydı ekle</Button>
            </div>
          </form>
        </Modal>
      )}
      {pdfInfo && (
        <Modal
          title="PDF aktarımı · Planlandı"
          onClose={() => setPdfInfo(false)}
        >
          <Notice>
            PDF yükleme ve otomatik alan çıkarma henüz uygulanmadı. Bu ekranda
            dosya alınmaz veya sunucuya gönderilmez.
          </Notice>
          <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-600">
            <li>Güvenli dosya yükleme ve dosya türü doğrulaması</li>
            <li>Poliçe alanlarını çıkarma ve kullanıcıya kontrol ettirme</li>
            <li>Acente / şube yetkisiyle veritabanına kayıt</li>
          </ol>
          <Button
            onClick={() => {
              setPdfInfo(false);
              setAdding(true);
            }}
          >
            Manuel demo kaydı aç
          </Button>
        </Modal>
      )}
      {selected && (
        <Modal title="Demo poliçe ayrıntısı" onClose={() => setSelected(null)}>
          <Notice>
            {selected.id} · Şirket tarafından düzenlenmiş gerçek bir poliçe
            değildir.
          </Notice>
          <dl className="grid grid-cols-2 gap-5 text-sm">
            {[
              ["Müşteri", customerName(data, selected.customerId)],
              ["Branş", selected.product],
              ["Şirket", selected.insurer],
              ["Prim", money(selected.premium)],
              ["Başlangıç", dateLabel(selected.issued)],
              ["Bitiş", dateLabel(selected.end)],
              [
                "Şube",
                data.branches.find((b) => b.id === selected.branchId)?.name,
              ],
              ["Durum", selected.status],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-slate-500">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </Modal>
      )}
    </>
  );
}
