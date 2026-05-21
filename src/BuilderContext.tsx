import { createContext, useContext, useState, ReactNode } from "react";

export interface BuilderState {
  description: string;
  selectedPages: string[];
  selectedAddons: string[];
  selectedTimeline: string;
  budgetSlider: number;
  email: string;
}

interface BuilderContextType extends BuilderState {
  setDescription: (v: string) => void;
  setSelectedPages: (v: string[]) => void;
  setSelectedAddons: (v: string[]) => void;
  setSelectedTimeline: (v: string) => void;
  setBudgetSlider: (v: number) => void;
  setEmail: (v: string) => void;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [description, setDescription] = useState("");
  const [selectedPages, setSelectedPages] = useState<string[]>(["home"]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["seo"]);
  const [selectedTimeline, setSelectedTimeline] = useState("4w");
  const [budgetSlider, setBudgetSlider] = useState(50);
  const [email, setEmail] = useState("");

  return (
    <BuilderContext.Provider
      value={{
        description, setDescription,
        selectedPages, setSelectedPages,
        selectedAddons, setSelectedAddons,
        selectedTimeline, setSelectedTimeline,
        budgetSlider, setBudgetSlider,
        email, setEmail,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used inside BuilderProvider");
  return ctx;
}
