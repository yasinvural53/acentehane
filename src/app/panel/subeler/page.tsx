import type { Metadata } from "next";
import { Organization } from "@/components/panel/organization";
export const metadata: Metadata = { title: "Şubeler" };
export default function Page() {
  return <Organization kind="branches" />;
}
