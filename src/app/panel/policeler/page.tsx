import type { Metadata } from "next";
import { Policies } from "@/components/panel/policies";
export const metadata: Metadata = { title: "Poliçeler" };
export default function Page() {
  return <Policies />;
}
