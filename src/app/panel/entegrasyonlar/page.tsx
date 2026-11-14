import type { Metadata } from "next";
import { Integrations } from "@/components/panel/integrations";
export const metadata: Metadata = { title: "Entegrasyonlar" };
export default function Page() {
  return <Integrations />;
}
