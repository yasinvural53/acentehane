import type { Metadata } from "next";
import { Customers } from "@/components/panel/customers";
export const metadata: Metadata = { title: "Müşteriler" };
export default function Page() {
  return <Customers />;
}
