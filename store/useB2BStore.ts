// store/useB2BStore.ts
import { create } from "zustand";
interface B2BState {
  isB2BMode: boolean;
  setB2BMode: (value: boolean) => void;
  initB2B: () => void;
}

export const useB2BStore = create<B2BState>((set) => ({
  isB2BMode: false,
  setB2BMode: (value) => {
    localStorage.setItem("b2bMode", value ? "true" : "false");
    set({ isB2BMode: value });
  },
  initB2B: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("b2bMode");
      set({ isB2BMode: stored === "true" });
    }
  },
}));
