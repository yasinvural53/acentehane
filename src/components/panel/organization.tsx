"use client";
import { useState, type FormEvent } from "react";
import { Building2, Network, Plus } from "lucide-react";
import { useDemo } from "./demo-provider";
import { type Agency, type Branch } from "@/lib/demo";
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
export function Organization({ kind }: { kind: "agencies" | "branches" }) {
  const { data, setData } = useDemo();
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [agencyId, setAgencyId] = useState("all");
  const agencies = kind === "agencies";
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim();
    const city = String(f.get("city")).trim();
    if (!name || !city) return;
    if (agencies) {
      const a: Agency = {
        id: `A-${crypto.randomUUID().slice(0, 8)}`,
        name,
        city,
        status: "Hazırlanıyor",
      };
      setData((prev) => ({ ...prev, agencies: [...prev.agencies, a] }));
    } else {
      const b: Branch = {
        id: `S-${crypto.randomUUID().slice(0, 8)}`,
        agencyId: String(f.get("agencyId")),
        name,
        city,
      };
      setData((prev) => ({ ...prev, branches: [...prev.branches, b] }));
    }
    setAdding(false);
    setAgencyId("all");
    setMessage(
      `Demo ${agencies ? "acente" : "şube"} eklendi. Kullanıcı hesabı veya giriş yetkisi oluşturulmadı.`,
    );
  }
  return (
    <>
      <PageHeader
        title={agencies ? "Acenteler" : "Şubeler"}
        description={
          agencies
            ? "Acente ağınızın yapısını ve şube dağılımını bir arada görüntüleyin."
            : "Şubeleri bağlı oldukları acenteler ve poliçe portföyleriyle takip edin."
        }
        action={
          <Button onClick={() => setAdding(true)}>
            <Plus size={16} />
            Demo {agencies ? "acente" : "şube"} ekle
          </Button>
        }
      />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="flex items-center gap-4 p-5">
          <span className="rounded-xl bg-brand-50 p-3 text-brand-600">
            <Building2 size={22} />
          </span>
          <div>
            <p className="text-xs text-slate-500">Acente ağı</p>
            <p className="mt-1 text-2xl font-semibold">
              {data.agencies.length}{" "}
              <span className="text-xs font-normal text-slate-400">
                demo acente
              </span>
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <span className="rounded-xl bg-brand-50 p-3 text-brand-600">
            <Network size={22} />
          </span>
          <div>
            <p className="text-xs text-slate-500">Şube ağı</p>
            <p className="mt-1 text-2xl font-semibold">
              {data.branches.length}{" "}
              <span className="text-xs font-normal text-slate-400">
                demo şube
              </span>
            </p>
          </div>
        </Card>
        <Notice>
          Acente ve şube ilişkileri örnektir. Veri izolasyonu ve rol bazlı
          erişim henüz uygulanmadı.
        </Notice>
      </div>
      {message && <Message>{message}</Message>}
      {agencies ? (
        <DataTable
          title="Acenteler"
          rows={data.agencies}
          searchText={(a) => `${a.name} ${a.city}`}
          filename="acentehane-demo-acenteler.csv"
          columns={[
            {
              label: "Acente",
              render: (a) => (
                <div className="font-medium">
                  {a.name}
                  <p className="mt-1 text-xs text-slate-400">{a.id}</p>
                </div>
              ),
              csv: (a) => a.name,
            },
            { label: "Şehir", render: (a) => a.city, csv: (a) => a.city },
            {
              label: "Şubeler",
              render: (a) =>
                data.branches.filter((b) => b.agencyId === a.id).length,
              csv: (a) =>
                data.branches.filter((b) => b.agencyId === a.id).length,
            },
            {
              label: "Durum",
              render: (a) => (
                <Badge tone={a.status === "Aktif" ? "green" : "amber"}>
                  {a.status}
                </Badge>
              ),
              csv: (a) => a.status,
            },
          ]}
        />
      ) : (
        <DataTable
          title="Şubeler"
          rows={data.branches.filter(
            (b) => agencyId === "all" || b.agencyId === agencyId,
          )}
          searchText={(b) =>
            `${b.name} ${b.city} ${data.agencies.find((a) => a.id === b.agencyId)?.name}`
          }
          filename="acentehane-demo-subeler.csv"
          filters={
            <select
              aria-label="Acente filtresi"
              value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)}
              className="h-10 max-w-56 rounded-lg border border-slate-200 px-3 text-xs"
            >
              <option value="all">Tüm acenteler</option>
              {data.agencies.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          }
          columns={[
            {
              label: "Şube",
              render: (b) => (
                <div className="font-medium">
                  {b.name}
                  <p className="mt-1 text-xs text-slate-400">{b.id}</p>
                </div>
              ),
              csv: (b) => b.name,
            },
            {
              label: "Bağlı acente",
              render: (b) =>
                data.agencies.find((a) => a.id === b.agencyId)?.name,
              csv: (b) =>
                data.agencies.find((a) => a.id === b.agencyId)?.name ?? "",
            },
            { label: "Şehir", render: (b) => b.city, csv: (b) => b.city },
            {
              label: "Poliçe sayısı",
              render: (b) =>
                data.policies.filter((p) => p.branchId === b.id).length,
              csv: (b) =>
                data.policies.filter((p) => p.branchId === b.id).length,
            },
          ]}
        />
      )}{" "}
      {adding && (
        <Modal
          title={`Demo ${agencies ? "acente" : "şube"} ekle`}
          onClose={() => setAdding(false)}
        >
          <Notice>
            Yalnızca örnek organizasyon kaydı oluşturulur. Davet veya hesap
            açılışı yapılmaz.
          </Notice>
          <form className="space-y-4" onSubmit={save}>
            <Field label={agencies ? "Acente adı" : "Şube adı"}>
              <input
                required
                name="name"
                maxLength={80}
                pattern=".*\S.*"
                className="field-control"
                placeholder={agencies ? "Örnek Demo Acente" : "Örnek Demo Şube"}
              />
            </Field>
            <Field label="Şehir">
              <input
                required
                name="city"
                maxLength={40}
                pattern=".*\S.*"
                className="field-control"
                placeholder="İstanbul"
              />
            </Field>
            {!agencies && (
              <Field label="Bağlı acente">
                <select name="agencyId" className="field-control">
                  {data.agencies.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </Field>
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
    </>
  );
}
