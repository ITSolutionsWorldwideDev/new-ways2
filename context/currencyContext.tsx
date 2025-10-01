// context/currencyContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Currency = "usd" | "eur" | "gbp";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("usd");

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("currency") as Currency;
    if (saved) setCurrency(saved);
  }, []);

  const updateCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem("currency", curr);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
