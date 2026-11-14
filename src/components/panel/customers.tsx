"use client";
import { useState, type FormEvent } from "react";
import { Plus, UsersRound, Building2, UserRoundCheck } from "lucide-react";
import { useDemo } from "./demo-provider";
import { type Customer, money } from "@/lib/demo";
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
export function Customers() {
  const { data, setData } = useDemo();
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [type, setType] = useState("Tümü");
  const [message, setMessage] = useState("");
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    const name = String(f.get("name")).trim();
    if (!name) return;
    const customer: Customer = {
      id: `M-${crypto.randomUUID().slice(0, 8)}`,
      name,
      email: String(f.get("email")).trim(),
      city: String(f.get("city")).trim(),
      type: f.get("type") === "Kurumsal" ? "Kurumsal" : "Bireysel",
      status: "Aday",
    };
    setData((prev) => ({ ...prev, customers: [customer, ...prev.customers] }));
    setAdding(false);
    setType("Tümü");
    setMessage(
      "Demo müşteri eklendi. Kayıt yalnızca bu sekmenin belleğinde tutuluyor.",
    );
  }
  return (
    <>
      <PageHeader
        title="Müşteriler"
        description="Müşteri portföyünüzü ve bağlı poliçeleri tek bir listeden takip edin."
        action={
          <Button onClick={() => setAdding(true)}>
            <Plus size={16} />
            Demo müşteri ekle
          </Button>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Tüm müşteriler"
          value={data.customers.length}
          detail="Kurgusal müşteri kayıtları"
          icon={<UsersRound size={18} />}
        />
        <StatCard
          label="Kurumsal"
          value={data.customers.filter((c) => c.type === "Kurumsal").length}
          detail="Örnek işletme portföyü"
          icon={<Building2 size={18} />}
        />
        <StatCard
          label="Aktif müşteriler"
          value={data.customers.filter((c) => c.status === "Aktif").length}
          detail="Demo müşteri durumu"
          icon={<UserRoundCheck size={18} />}
        />
      </div>
      {message && <Message>{message}</Message>}
      <DataTable
        title="Müşteriler"
        rows={data.customers.filter((c) => type === "Tümü" || c.type === type)}
        searchText={(c) => `${c.name} ${c.id} ${c.email} ${c.city}`}
        filename="acentehane-demo-musteriler.csv"
        filters={
          <select
            aria-label="Müşteri türü filtresi"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 px-3 text-xs"
          >
            <option>Tümü</option>
            <option>Bireysel</option>
            <option>Kurumsal</option>
          </select>
        }
        onOpen={setSelected}
        columns={[
          {
            label: "Müşteri",
            render: (c) => (
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="mt-1 text-xs text-slate-400">{c.id}</p>
              </div>
            ),
            csv: (c) => c.name,
          },
          {
            label: "E-posta",
            render: (c) => <span className="text-slate-500">{c.email}</span>,
            csv: (c) => c.email,
          },
          {
            label: "Tür",
            render: (c) => <Badge>{c.type}</Badge>,
            csv: (c) => c.type,
          },
          { label: "Şehir", render: (c) => c.city, csv: (c) => c.city },
          {
            label: "Poliçeler",
            render: (c) =>
              data.policies.filter((p) => p.customerId === c.id).length,
            csv: (c) =>
              data.policies.filter((p) => p.customerId === c.id).length,
          },
          {
            label: "Durum",
            render: (c) => (
              <Badge tone={c.status === "Aktif" ? "green" : "amber"}>
                {c.status}
              </Badge>
            ),
            csv: (c) => c.status,
          },
        ]}
      />
      {adding && (
        <Modal title="Demo müşteri ekle" onClose={() => setAdding(false)}>
          <Notice>
            Yalnızca hayalî bilgiler kullanın. Gerçek müşteri kaydı ve
            veritabanı bağlantısı henüz yok.
          </Notice>
          <form onSubmit={save} className="space-y-4">
            <Field label="Ad / işletme adı">
              <input
                name="name"
                required
                maxLength={80}
                pattern=".*\S.*"
                className="field-control"
                placeholder="Örnek Müşteri"
              />
            </Field>
            <Field label="E-posta">
              <input
                name="email"
                required
                type="email"
                maxLength={120}
                className="field-control"
                placeholder="ornek@example.com"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Şehir">
                <input
                  name="city"
                  required
                  maxLength={40}
                  pattern=".*\S.*"
                  className="field-control"
                  placeholder="İstanbul"
                />
              </Field>
              <Field label="Müşteri türü">
                <select name="type" className="field-control">
                  <option>Bireysel</option>
                  <option>Kurumsal</option>
                </select>
              </Field>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <Button variant="secondary" onClick={() => setAdding(false)}>
                Vazgeç
              </Button>
              <Button type="submit">Demo kaydı ekle</Button>
            </div>
          </form>
        </Modal>
      )}
      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <Notice>Kurgusal müşteri · {selected.id}</Notice>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-500">E-posta</dt>
              <dd className="mt-1 break-all">{selected.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Şehir</dt>
              <dd className="mt-1">{selected.city}</dd>
            </div>
          </dl>
          <h3 className="font-semibold">Bağlı demo poliçeler</h3>
          {data.policies
            .filter((p) => p.customerId === selected.id)
            .map((p) => (
              <div
                key={p.id}
                className="flex justify-between border-b border-slate-100 pb-3 text-sm"
              >
                <span>
                  {p.product} · {p.insurer}
                  <small className="block pt-1 text-slate-400">{p.id}</small>
                </span>
                <span>{money(p.premium)}</span>
              </div>
            ))}
          {!data.policies.some((p) => p.customerId === selected.id) && (
            <p className="text-sm text-slate-500">Henüz bağlı poliçe yok.</p>
          )}
        </Modal>
      )}
    </>
  );
}
