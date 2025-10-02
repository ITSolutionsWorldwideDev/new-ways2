import { create } from 'zustand';

interface B2BState {
  isB2BMode: boolean;
  setB2BMode: (value: boolean) => void;
}

export const useB2BStore = create<B2BState>((set) => ({
  isB2BMode: false,
  setB2BMode: (value) => set({ isB2BMode: value }),
}));
