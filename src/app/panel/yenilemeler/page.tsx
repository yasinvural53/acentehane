import type { Metadata } from "next";
import { Renewals } from "@/components/panel/renewals";
export const metadata: Metadata = { title: "Yenilemeler" };
export default function Page() {
  return <Renewals />;
}
