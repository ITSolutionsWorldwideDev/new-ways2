// store/useSessionStore.ts
import { create } from "zustand";
import { useB2BStore } from "@/store/useB2BStore";
export interface UserSession {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "customer" | "b2b";
}
interface SessionState {
  user: UserSession | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
  setUser: (user: UserSession | null) => void;
}

export function syncModeWithRole(user: UserSession | null) {
  const { setB2BMode } = useB2BStore.getState();
  if (!user) {
    setB2BMode(false);
  } else if (user.role === "b2b") {
    setB2BMode(true);
  } else {
    setB2BMode(false);
  }
}

export function isB2BUser(user: UserSession | null): boolean {
  return user?.role === "b2b";
}

export function isCustomerUser(user: UserSession | null): boolean {
  return user?.role === "customer";
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  loading: true,
  fetchSession: async () => {
    try {
      const res = await fetch("/api/auth/session", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        set({ user: data?.user ?? null });
      } else {
        set({ user: null });
      }
    } catch (err) {
      console.error("Session fetch error:", err);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
  setUser: (user) => set({ user }),
}));
