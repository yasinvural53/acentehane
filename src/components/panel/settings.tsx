"use client";
import { useState, type FormEvent } from "react";
import { Save, ShieldCheck } from "lucide-react";
import { useDemo } from "./demo-provider";
import {
  Badge,
  Button,
  Card,
  Field,
  Message,
  Notice,
  PageHeader,
} from "@/components/ui";
export function Settings() {
  const { data, setData } = useDemo();
  const [message, setMessage] = useState("");
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim();
    if (!name) return;
    setData((prev) => ({
      ...prev,
      settings: {
        name,
        email: String(f.get("email")).trim(),
        renewalDays: Number(f.get("renewalDays")),
        weeklyReport: f.get("weeklyReport") === "on",
      },
    }));
    setMessage(
      "Demo tercihler kaydedildi. Gerçek hesap güncellenmedi; sayfa yenilenince tercihler sıfırlanır.",
    );
  }
  return (
    <>
      <PageHeader
        title="Ayarlar"
        description="Demo çalışma alanı bilgilerinizi ve ekran tercihlerinizi düzenleyin."
      />
      {message && <Message>{message}</Message>}
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card title="Çalışma alanı tercihleri">
          <form className="space-y-5 p-6" onSubmit={save}>
            <Field label="Çalışma alanı adı">
              <input
                name="name"
                required
                maxLength={80}
                pattern=".*\S.*"
                defaultValue={data.settings.name}
                className="field-control"
              />
            </Field>
            <Field label="Demo e-posta">
              <input
                name="email"
                type="email"
                required
                maxLength={120}
                defaultValue={data.settings.email}
                className="field-control"
              />
            </Field>
            <Field
              label="Yenileme görünümü"
              hint="Genel Bakış ve bildirim sayacı bu aralığı kullanır."
            >
              <select
                name="renewalDays"
                defaultValue={data.settings.renewalDays}
                className="field-control"
              >
                <option value={7}>7 gün</option>
                <option value={30}>30 gün</option>
                <option value={60}>60 gün</option>
              </select>
            </Field>
            <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
              <input
                name="weeklyReport"
                type="checkbox"
                defaultChecked={data.settings.weeklyReport}
                className="mt-1 accent-brand-600"
              />
              <span className="text-sm font-medium">
                Haftalık rapor tercihi <Badge>Demo</Badge>
                <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">
                  Tercih yalnızca örnek olarak tutulur. Zamanlama veya e-posta
                  gönderimi yapılmaz.
                </span>
              </span>
            </label>
            <Button type="submit">
              <Save size={16} />
              Demo tercihleri kaydet
            </Button>
          </form>
        </Card>
        <div className="space-y-5">
          <Card title="Erişim ve roller">
            <div className="space-y-4 p-5">
              <ShieldCheck size={28} className="text-brand-600" />
              <p className="text-sm leading-6 text-slate-600">
                Güvenli giriş ve kullanıcı yetkilendirmesi geliştirme
                aşamasında. Bu demo paneli bir giriş sistemi ile korunmuyor.
              </p>
              {[
                ["Admin", "Tüm acente ve şubeler"],
                ["Acente", "Kendi acentesi ve şubeleri"],
                ["Şube", "Yalnızca kendi kayıtları"],
              ].map(([role, scope]) => (
                <div
                  className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs"
                  key={role}
                >
                  <div className="font-medium">
                    {role}
                    <p className="mt-1 font-normal text-slate-500">{scope}</p>
                  </div>
                  <Badge tone="amber">Planlandı</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Notice>
            Veritabanı, sunucu oturumu ve yetki kontrolü eklenmeden gerçek
            kullanım için uygun değildir.
          </Notice>
        </div>
      </div>
    </>
  );
}
