"use client";
import { removeTokensFromCookies } from "@/lib/cookies";
import { setUserInfo } from "@/redux/features/user-info-slice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useToast } from "./use-toast";
// import {
//   setAccessToken,
//   setIsPaymentInitiation,
//   setItemAccess,
//   setItemId,
//   setLinkSuccess,
//   setLinkToken,
//   setProducts,
// } from "@/redux/features/plaid-slice";

interface LogoutProps {
  sidebar?: boolean;
}

export function useLogout(props?: LogoutProps) {
  const { sidebar = false } = props || {};
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  return async () => {
    try {
      // await removeTokensFromCookies();
      // dispatch(setUserInfo(null));
      // dispatch(setLinkToken(null));
      // dispatch(setLinkSuccess(false));
      // dispatch(setAccessToken(null));
      // dispatch(setItemId(null));
      // dispatch(setItemAccess(true));
      // dispatch(setIsPaymentInitiation(false));
      // dispatch(setProducts(["transactions"]));
      localStorage.removeItem("selectedService");

      router.push("/login");

      !sidebar
        ? toast({
            title: "Error",
            description: "Please Authenticate",
            variant: "destructive",
          })
        : toast({
            description: "logging out...",
          });
    } catch (err) {
      console.error("Logout error", err);
    }
  };
}
