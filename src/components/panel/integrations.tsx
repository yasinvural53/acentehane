"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock3,
  LockKeyhole,
  PlugZap,
} from "lucide-react";
import { insurers } from "@/lib/demo";
import {
  Badge,
  Button,
  Card,
  Modal,
  Notice,
  PageHeader,
  StatCard,
} from "@/components/ui";
export function Integrations() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <PageHeader
        title="Entegrasyonlar"
        description="Sigorta şirketi bağlantılarının hazırlık durumunu tek merkezden izleyin."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Planlanan şirket"
          value={8}
          detail="Bağlantı hazırlığı"
          icon={<PlugZap size={18} />}
        />
        <StatCard
          label="Doğrulanmış bağlantı"
          value={0}
          detail="Henüz gerçek API bağlı değil"
          icon={<Check size={18} />}
        />
        <StatCard
          label="Erişim bekleyen"
          value={8}
          detail="Yetki ve teknik doküman gerekli"
          icon={<Clock3 size={18} />}
        />
      </div>
      <div className="mb-6">
        <Notice>
          Bağlantı durumları bilinmiyor veya erişim bekliyor. Şirket logoları /
          isimleri anlaşma veya aktif entegrasyon anlamına gelmez. Bu ekranda
          şifre ya da API anahtarı istenmez.
        </Notice>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {insurers.map((name, i) => (
          <Card key={name} className="flex flex-col p-5">
            <div className="mb-5 flex items-center justify-between">
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl text-sm font-bold ${i % 2 ? "bg-slate-100 text-slate-500" : "bg-brand-50 text-brand-600"}`}
              >
                {name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </span>
              <Badge tone="amber">Beklemede</Badge>
            </div>
            <h2 className="font-semibold">{name}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              API erişimi ve ürün kapsamı henüz doğrulanmadı.
            </p>
            <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
              <p className="flex justify-between">
                <span>Teklif alma</span>
                <span>Bağlı değil</span>
              </p>
              <p className="flex justify-between">
                <span>Poliçe düzenleme</span>
                <span>Bağlı değil</span>
              </p>
            </div>
            <Button
              className="mt-4 px-0 text-xs"
              variant="ghost"
              onClick={() => setSelected(name)}
            >
              Gereksinimleri gör <ArrowUpRight size={13} />
            </Button>
          </Card>
        ))}
      </div>
      <Card className="mt-6 flex flex-wrap items-center gap-4 p-5">
        <span className="rounded-xl bg-brand-50 p-3 text-brand-600">
          <LockKeyhole size={22} />
        </span>
        <div className="flex-1">
          <h2 className="text-sm font-semibold">
            Güvenli bağlantı için sonraki aşama
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Şirketten veya yetkili sağlayıcıdan API dokümanı, test erişimi ve
            acente yetkisi alınması gerekiyor.
          </p>
        </div>
        <Badge>Sunucu entegrasyonu planlandı</Badge>
      </Card>
      {selected && (
        <Modal
          title={`${selected} · Bağlantı hazırlığı`}
          onClose={() => setSelected(null)}
        >
          <Notice>
            Bu bir hazırlık listesi. API erişimi veya bağlantı testi yapılmış
            değildir.
          </Notice>
          <ol className="list-decimal space-y-4 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Yetkili API / entegrasyon sağlayıcısını ve sözleşme kapsamını
              doğrulayın.
            </li>
            <li>
              Test ortamı adreslerini, ürün kapsamını ve dokümantasyonu alın.
            </li>
            <li>
              Erişim bilgilerini sunucu tarafı gizli değişken yönetimine
              ekleyin.
            </li>
            <li>
              Acente yetkisi, teklif, hata ve tekrar deneme akışlarını test
              edin.
            </li>
            <li>
              Poliçe düzenleme ve otomatik kayıt işlemlerini ayrıca doğrulayın.
            </li>
          </ol>
          <p className="text-xs text-slate-500">
            Şirket ekranına giriş şifresi, API erişimi olduğu anlamına gelmez.
          </p>
        </Modal>
      )}
    </>
  );
}
