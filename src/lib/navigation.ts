import {
  LayoutDashboard,
  UsersRound,
  FileText,
  GitCompareArrows,
  CalendarClock,
  Building2,
  Network,
  ChartNoAxesCombined,
  PlugZap,
  Settings2,
} from "lucide-react";
export const navigation = [
  {
    href: "/panel",
    label: "Genel Bakış",
    icon: LayoutDashboard,
    group: "ÇALIŞMA ALANI",
  },
  { href: "/panel/musteriler", label: "Müşteriler", icon: UsersRound },
  { href: "/panel/policeler", label: "Poliçeler", icon: FileText },
  { href: "/panel/teklifler", label: "Teklifler", icon: GitCompareArrows },
  { href: "/panel/yenilemeler", label: "Yenilemeler", icon: CalendarClock },
  {
    href: "/panel/acenteler",
    label: "Acenteler",
    icon: Building2,
    group: "YÖNETİM",
  },
  { href: "/panel/subeler", label: "Şubeler", icon: Network },
  { href: "/panel/raporlar", label: "Raporlar", icon: ChartNoAxesCombined },
  { href: "/panel/entegrasyonlar", label: "Entegrasyonlar", icon: PlugZap },
  { href: "/panel/ayarlar", label: "Ayarlar", icon: Settings2 },
];
