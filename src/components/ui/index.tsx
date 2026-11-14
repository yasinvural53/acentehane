"use client";
import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Inbox,
} from "lucide-react";
import { downloadCsv, normalize } from "@/lib/demo";

export const buttonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";
export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <button
      type="button"
      className={`${buttonClass} ${variant === "primary" ? "bg-brand-600 text-white shadow-sm hover:bg-brand-700" : variant === "secondary" ? "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50" : "text-brand-700 hover:bg-brand-50"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "amber" | "purple" | "red";
}) {
  const styles = {
    neutral: "bg-slate-100 text-slate-600",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-800",
    purple: "bg-brand-50 text-brand-700",
    red: "bg-rose-50 text-rose-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
            {title}
          </h1>
          <Badge tone="purple">Demo</Badge>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
export function Card({
  title,
  aside,
  children,
  className = "",
}: {
  title?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel-card min-w-0 ${className}`}>
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold">{title}</h2>
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}
export function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className="rounded-lg bg-brand-50 p-2 text-brand-600">
          {icon}
        </span>
      </div>
      <p className="my-3 text-[29px] font-semibold leading-none tracking-tight tabular-nums">
        {value}
      </p>
      <p className="text-xs text-slate-500">{detail}</p>
    </Card>
  );
}
export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>{label}</span>
      {children}
      {hint && (
        <span className="mt-1.5 block text-xs font-normal text-slate-500">
          {hint}
        </span>
      )}
    </label>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-brand-100 bg-brand-50/70 px-4 py-3 text-xs leading-5 text-brand-700">
      {children}
    </p>
  );
}
export function Message({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      className="my-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
    >
      {children}
    </p>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
      className="fixed m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-auto rounded-2xl border-0 bg-white p-0 text-ink shadow-xl"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
        <h2 id="dialog-title" className="text-lg font-semibold">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      </div>
      <div className="space-y-5 p-6">{children}</div>
    </dialog>
  );
}
export type Column<T> = {
  label: string;
  render: (row: T) => ReactNode;
  csv: (row: T) => string | number;
};
export function DataTable<T extends { id: string }>({
  title,
  rows,
  columns,
  searchText,
  filters,
  filename = "acentehane-demo.csv",
  onOpen,
}: {
  title: string;
  rows: T[];
  columns: Column<T>[];
  searchText: (row: T) => string;
  filters?: ReactNode;
  filename?: string;
  onOpen?: (row: T) => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const filtered = rows.filter((row) =>
    normalize(searchText(row)).includes(normalize(search)),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  const current = Math.min(page, pages - 1);
  const visible = filtered.slice(current * 6, current * 6 + 6);
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
        <label className="relative w-full sm:max-w-72">
          <span className="sr-only">{title} içinde ara</span>
          <Search
            aria-hidden
            size={17}
            className="absolute top-3 left-3 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Kayıtlarda ara…"
            className="h-10 w-full rounded-lg border border-slate-200 pr-3 pl-10 text-sm"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {filters}
          <Button
            variant="secondary"
            onClick={() =>
              downloadCsv(
                filename,
                columns.map((c) => c.label),
                filtered.map((r) => columns.map((c) => c.csv(r))),
              )
            }
          >
            <ArrowDownToLine size={15} />
            CSV indir
          </Button>
        </div>
      </div>
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label={`${title} tablosu`}
      >
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{title} — örnek veriler</caption>
          <thead className="border-b border-slate-100 bg-slate-50/70 text-xs text-slate-500">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.label}
                  scope="col"
                  className="whitespace-nowrap px-5 py-3.5 font-medium"
                >
                  {c.label}
                </th>
              ))}
              {onOpen && (
                <th scope="col" className="px-5 py-3.5">
                  <span className="sr-only">İşlemler</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 last:border-0 hover:bg-brand-50/30"
              >
                {columns.map((c) => (
                  <td key={c.label} className="whitespace-nowrap px-5 py-4">
                    {c.render(row)}
                  </td>
                ))}
                {onOpen && (
                  <td className="px-5 py-3">
                    <button
                      className="rounded-md p-2 text-brand-600 hover:bg-brand-50"
                      onClick={() => onOpen(row)}
                      aria-label={`${row.id} ayrıntıları`}
                    >
                      <ChevronRight size={17} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-12 text-slate-500">
            <Inbox size={30} />
            <p>Bu aramaya uygun kayıt bulunamadı.</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearch("");
                setPage(0);
              }}
            >
              Aramayı temizle
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
        <span>
          {filtered.length} kayıt · Sayfa {current + 1} / {pages}
        </span>
        <div className="flex gap-1">
          <button
            aria-label="Önceki sayfa"
            disabled={current === 0}
            onClick={() => setPage(current - 1)}
            className="rounded border border-slate-200 p-2 disabled:opacity-30"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            aria-label="Sonraki sayfa"
            disabled={current >= pages - 1}
            onClick={() => setPage(current + 1)}
            className="rounded border border-slate-200 p-2 disabled:opacity-30"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </Card>
  );
}
