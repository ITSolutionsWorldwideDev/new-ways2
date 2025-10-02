// /context/userContext.tsx
"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
// import { User } from "@/lib/types";


interface UserContextType {
  user: User | null;
  loadingUser: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  // If your login API returns a phone number, add it here
  phoneNumber?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data?.user || null);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed fetching session:", err);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchSession(); // only once on mount
  }, []);

  const login = async (userData: User) => {
    setUser(userData);
    await fetchSession(); // <-- force refetch of session cookie and update context
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loadingUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}


/* export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // This useEffect fetches the session only once on initial load
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data?.user || null);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed fetching session:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchSession();
  }, []); // Empty dependency array means this runs only once

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loadingUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
} */

