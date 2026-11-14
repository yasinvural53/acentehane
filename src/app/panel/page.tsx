import type { Metadata } from "next";
import { Overview } from "@/components/panel/overview";
export const metadata: Metadata = { title: "Genel Bakış" };
export default function Page() {
  return <Overview />;
}
