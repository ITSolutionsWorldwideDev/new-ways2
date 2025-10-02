// store/useSessionStore.ts
import { create } from "zustand";

// Define your session structure
export interface UserSession {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  // Optional: role, isB2B, etc.
  role?: "customer" | "b2b";
}

interface SessionState {
  user: UserSession | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
  setUser: (user: UserSession | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  loading: true,

  // Fetch session from API
  fetchSession: async () => {
    try {
      const res = await fetch("/api/auth/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

  // Set user manually (e.g., on logout)
  setUser: (user: UserSession | null) => set({ user }),
}));

/*
import { create } from "zustand";

interface UserSession {
  firstName: string;
  lastName: string;
  email: string;
  // optionally add roles or isB2BUser: true
}

interface SessionState {
  user: UserSession | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  loading: true,

  fetchSession: async () => {
    try {
      const res = await fetch("/api/auth/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
}));
 */
