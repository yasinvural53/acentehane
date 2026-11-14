"use client";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import { initialData, type DemoData } from "@/lib/demo";
const DemoContext = createContext<{
  data: DemoData;
  setData: Dispatch<SetStateAction<DemoData>>;
} | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DemoData>(initialData);
  return (
    <DemoContext.Provider value={{ data, setData }}>
      {children}
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("DemoProvider gerekli");
  return context;
}
