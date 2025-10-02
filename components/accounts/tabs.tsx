// components/accounts/Tabs.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { useUser } from "@/context/userContext";

import { useSessionStore } from "@/store/useSessionStore"; // ✅ Zustand
import { useB2BStore } from "@/store/useB2BStore"; // Optional, if B2B needs resetting

import AccountsDashboard from "./dashboard";
import AccountsDetails from "./accounts_detail";
import OrderHistory from "./order_history";

type TabBtn = {
  id: number;
  label: string;
};

const tabBtnData: TabBtn[] = [
  { id: 1, label: "Dashboard" },
  { id: 2, label: "My Orders" },
  { id: 3, label: "Accounts Details" },
  { id: 4, label: "Logout" },
];

const Tabs = () => {
  const [active, setActive] = useState<number>(1);
  const router = useRouter();
  // const { logout } = useUser(); // from context

  const { setUser } = useSessionStore(); // ✅ Zustand
  const { setB2BMode } = useB2BStore(); // Optional

  const handleTabClick = async (tab: TabBtn) => {
    if (tab.label === "Logout") {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });

        // logout();
        setUser(null); // ✅ Clear session
        setB2BMode(false); // ✅ Optional reset of B2B toggle
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      setActive(tab.id);
    }
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start mb-6 sm:mb-8 overflow-x-auto">
      <div className="flex flex-row sm:flex-col sm:min-w-[200px] items-start border">
        {tabBtnData.map((tab) => (
          <span
            key={tab.id}
            className={cn([
              active === tab.id
                ? "border-b-2 font-medium bg-[linear-gradient(90deg,_rgba(255,255,255,0.7)_0%,_rgba(232,252,86,0.7)_100%)] "
                : "border-b font-normal",
              "p-5 sm:p-6 rounded-none flex-1 w-full text-left cursor-pointer",
            ])}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div className="mt-2 mb-2 w-full">
        {active === 1 && <AccountsDashboard />}
        {active === 2 && <OrderHistory />}
        {active === 3 && <AccountsDetails />}
      </div>
    </div>
  );
};

export default Tabs;
