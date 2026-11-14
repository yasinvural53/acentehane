import type { Metadata } from "next";
import { DemoProvider } from "@/components/panel/demo-provider";
import { PanelShell } from "@/components/panel/shell";
export const metadata: Metadata = {
  title: {
    default: "Demo Panel | AcenteHane",
    template: "%s | AcenteHane Demo",
  },
  robots: { index: false, follow: false },
};
export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoProvider>
      <PanelShell>{children}</PanelShell>
    </DemoProvider>
  );
}
