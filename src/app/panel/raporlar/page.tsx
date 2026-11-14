import type { Metadata } from "next";
import { Reports } from "@/components/panel/reports";
export const metadata: Metadata = { title: "Raporlar" };
export default function Page() {
  return <Reports />;
}
