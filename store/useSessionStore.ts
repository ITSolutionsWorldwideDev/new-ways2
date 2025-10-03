// store/useSessionStore.ts
import { create } from "zustand";
import { useB2BStore } from "@/store/useB2BStore";

// Define your session structure
export interface UserSession {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "customer" | "b2b"; // reflect your Postgres enum
  // Optional: role, isB2B, etc.
  //   role?: "customer" | "b2b";
  //   roles?: string[];
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

/* export function hasRole(user: UserSession | null, role: string) {
  return user?.roles?.includes(role);
} */
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
        // assume data.user.role is one of "customer" or "b2b"
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

/* export const useSessionStore = create<SessionState>((set) => ({
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
})); */

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
