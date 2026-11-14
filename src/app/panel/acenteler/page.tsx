import type { Metadata } from "next";
import { Organization } from "@/components/panel/organization";
export const metadata: Metadata = { title: "Acenteler" };
export default function Page() {
  return <Organization kind="agencies" />;
}
