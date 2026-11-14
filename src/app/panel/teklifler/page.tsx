import type { Metadata } from "next";
import { Quotes } from "@/components/panel/quotes";
export const metadata: Metadata = { title: "Teklifler" };
export default function Page() {
  return <Quotes />;
}
