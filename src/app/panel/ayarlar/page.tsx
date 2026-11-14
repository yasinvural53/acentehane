import type { Metadata } from "next";
import { Settings } from "@/components/panel/settings";
export const metadata: Metadata = { title: "Ayarlar" };
export default function Page() {
  return <Settings />;
}
