// Entirely fictional fixtures. No insurer request or customer data is used.
export const DEMO_DATE = "2026-11-14";
export const products = [
  "Trafik",
  "Kasko",
  "Konut",
  "Sağlık",
  "İşyeri",
] as const;
export type Product = (typeof products)[number];
export const insurers = [
  "Allianz",
  "Anadolu Sigorta",
  "AXA",
  "Aksigorta",
  "Sompo",
  "Türkiye Sigorta",
  "Ray Sigorta",
  "Quick Sigorta",
] as const;
export type Customer = {
  id: string;
  name: string;
  email: string;
  city: string;
  type: "Bireysel" | "Kurumsal";
  status: "Aktif" | "Aday";
};
export type Policy = {
  id: string;
  customerId: string;
  product: Product;
  insurer: string;
  premium: number;
  issued: string;
  end: string;
  branchId: string;
  status: "Aktif" | "İptal";
};
export type Quote = {
  id: string;
  customerId: string;
  product: Product;
  premium: number;
  status: "Hazırlanıyor" | "Karşılaştırıldı";
};
export type Agency = {
  id: string;
  name: string;
  city: string;
  status: "Aktif" | "Hazırlanıyor";
};
export type Branch = {
  id: string;
  agencyId: string;
  name: string;
  city: string;
};
export type Settings = {
  name: string;
  email: string;
  renewalDays: number;
  weeklyReport: boolean;
};
export type DemoData = {
  customers: Customer[];
  policies: Policy[];
  quotes: Quote[];
  agencies: Agency[];
  branches: Branch[];
  tracked: string[];
  settings: Settings;
};
export const initialData: DemoData = {
  customers: [
    {
      id: "M-1001",
      name: "Ada Örnek",
      email: "ada@example.com",
      city: "İstanbul",
      type: "Bireysel",
      status: "Aktif",
    },
    {
      id: "M-1002",
      name: "Deniz Örnek",
      email: "deniz@example.com",
      city: "Ankara",
      type: "Bireysel",
      status: "Aktif",
    },
    {
      id: "M-1003",
      name: "Örnek Tasarım A.Ş.",
      email: "tasarim@example.com",
      city: "İstanbul",
      type: "Kurumsal",
      status: "Aktif",
    },
    {
      id: "M-1004",
      name: "Ege Örnek",
      email: "ege@example.com",
      city: "İzmir",
      type: "Bireysel",
      status: "Aktif",
    },
    {
      id: "M-1005",
      name: "Duru Örnek",
      email: "duru@example.com",
      city: "Bursa",
      type: "Bireysel",
      status: "Aktif",
    },
    {
      id: "M-1006",
      name: "Örnek Lojistik Ltd.",
      email: "lojistik@example.com",
      city: "Kocaeli",
      type: "Kurumsal",
      status: "Aktif",
    },
    {
      id: "M-1007",
      name: "Kuzey Örnek",
      email: "kuzey@example.com",
      city: "Trabzon",
      type: "Bireysel",
      status: "Aday",
    },
    {
      id: "M-1008",
      name: "Mavi Örnek",
      email: "mavi@example.com",
      city: "İstanbul",
      type: "Bireysel",
      status: "Aday",
    },
  ],
  policies: [
    {
      id: "DEMO-26001",
      customerId: "M-1001",
      product: "Kasko",
      insurer: "Allianz",
      premium: 24500,
      issued: "2026-11-12",
      end: "2026-11-18",
      branchId: "S-01",
      status: "Aktif",
    },
    {
      id: "DEMO-26002",
      customerId: "M-1002",
      product: "Trafik",
      insurer: "Anadolu Sigorta",
      premium: 8650,
      issued: "2026-11-10",
      end: "2026-11-23",
      branchId: "S-02",
      status: "Aktif",
    },
    {
      id: "DEMO-26003",
      customerId: "M-1003",
      product: "İşyeri",
      insurer: "AXA",
      premium: 38200,
      issued: "2026-11-08",
      end: "2027-11-08",
      branchId: "S-01",
      status: "Aktif",
    },
    {
      id: "DEMO-26004",
      customerId: "M-1004",
      product: "Sağlık",
      insurer: "Türkiye Sigorta",
      premium: 18750,
      issued: "2026-10-22",
      end: "2026-12-05",
      branchId: "S-03",
      status: "Aktif",
    },
    {
      id: "DEMO-26005",
      customerId: "M-1005",
      product: "Konut",
      insurer: "Sompo",
      premium: 6200,
      issued: "2026-10-18",
      end: "2026-12-12",
      branchId: "S-01",
      status: "Aktif",
    },
    {
      id: "DEMO-26006",
      customerId: "M-1006",
      product: "Kasko",
      insurer: "Aksigorta",
      premium: 29400,
      issued: "2026-09-14",
      end: "2027-09-14",
      branchId: "S-02",
      status: "Aktif",
    },
    {
      id: "DEMO-26007",
      customerId: "M-1001",
      product: "Trafik",
      insurer: "Quick Sigorta",
      premium: 7900,
      issued: "2026-09-02",
      end: "2026-11-20",
      branchId: "S-01",
      status: "Aktif",
    },
    {
      id: "DEMO-26008",
      customerId: "M-1003",
      product: "Konut",
      insurer: "Ray Sigorta",
      premium: 5500,
      issued: "2026-08-12",
      end: "2027-08-12",
      branchId: "S-03",
      status: "İptal",
    },
  ],
  quotes: [
    {
      id: "T-1001",
      customerId: "M-1007",
      product: "Kasko",
      premium: 22500,
      status: "Hazırlanıyor",
    },
    {
      id: "T-1002",
      customerId: "M-1008",
      product: "Sağlık",
      premium: 16000,
      status: "Karşılaştırıldı",
    },
    {
      id: "T-1003",
      customerId: "M-1002",
      product: "Trafik",
      premium: 8500,
      status: "Hazırlanıyor",
    },
  ],
  agencies: [
    {
      id: "A-01",
      name: "Merkez Demo Acente",
      city: "İstanbul",
      status: "Aktif",
    },
    { id: "A-02", name: "Ege Demo Acente", city: "İzmir", status: "Aktif" },
  ],
  branches: [
    { id: "S-01", agencyId: "A-01", name: "Kadıköy Merkez", city: "İstanbul" },
    { id: "S-02", agencyId: "A-01", name: "Çankaya Şube", city: "Ankara" },
    { id: "S-03", agencyId: "A-02", name: "Konak Şube", city: "İzmir" },
  ],
  tracked: [],
  settings: {
    name: "Merkez Demo Acente",
    email: "demo@example.com",
    renewalDays: 30,
    weeklyReport: true,
  },
};
export const money = (value: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
export const dateLabel = (value: string) =>
  new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
export const daysLeft = (end: string) =>
  Math.round(
    (Date.parse(`${end}T00:00:00Z`) - Date.parse(`${DEMO_DATE}T00:00:00Z`)) /
      86400000,
  );
export const getRenewals = (policies: Policy[], within = 30) =>
  policies
    .filter(
      (p) =>
        p.status === "Aktif" &&
        daysLeft(p.end) >= 0 &&
        daysLeft(p.end) <= within,
    )
    .sort((a, b) => a.end.localeCompare(b.end));
export const customerName = (data: DemoData, id: string) =>
  data.customers.find((c) => c.id === id)?.name ?? "Bilinmeyen müşteri";
export const normalize = (text: string) =>
  text.toLocaleLowerCase("tr-TR").trim();
export function downloadCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
) {
  const cell = (value: string | number) => {
    const raw = String(value);
    const safe = /^[\s]*[=+@\-]/.test(raw) ? `'${raw}` : raw;
    return `"${safe.replaceAll('"', '""')}"`;
  };
  const csv =
    "\uFEFF" +
    [headers, ...rows].map((row) => row.map(cell).join(";")).join("\r\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8;" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
