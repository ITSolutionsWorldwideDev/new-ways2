// components/sections/auth/login/login-section.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ActionButton } from "@/components/ui/action-button";
import Link from "next/link";
import { loginUser, LoginResponse } from "@/services/auth/login"; // ✅

import { isActionError } from "@/lib/error";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/features/user-info-slice";

// import { useUser } from "@/context/userContext";
import { useSessionStore } from "@/store/useSessionStore";
import { useSearchParams } from "next/navigation";

export default function LoginSection() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { setUser, fetchSession } = useSessionStore(); // ✅ Zustand login logic

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const from = searchParams.get("from") || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response: LoginResponse = await loginUser({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (isActionError(response) && response.error) {
        toast({
          title: "Login failed",
          description: response.error,
          variant: "destructive",
        });
        return;
      }

      if ("error" in response) {
        console.error("Login failed:", response.error);
        toast({
          title: "Login failed",
          description: response.error || "Invalid response",
          variant: "destructive",
        });
        return;
      }

      if ("user" in response) {
        // Set Zustand user store
        setUser(response.user); // ✅ Set Zustand user

        // Optional: Fetch session again if you want full consistency
        await fetchSession();

        // Update Redux if still needed
        dispatch(
          setUserInfo({
            id: response.user.userId,
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            email: response.user.email,
            phone: response.user.phoneNumber,
          })
        );

        toast({
          title: "Login successful!",
          description: "Redirecting to your account...",
        });

        // Redirect
        router.push(from);
        return;
      }
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response: LoginResponse = await loginUser({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      // if ("user" in response) {
      //   // The `loginUser` function will return the user data.
      //   // Call the context's login function to update the global state.
      //   login(response.user);
      //   router.push("/");
      // }

      if (isActionError(response) && response.error) {
        toast({
          title: "Login failed",
          description: response.error,
          variant: "destructive",
        });
        return;
      }

      // if (!response || "error" in response || !response.user) {
      //   // Handle error case
      //   console.error("Login failed:", response?.error);
      //   return;
      // }

      if ("error" in response) {
        console.error("Login failed:", response.error);
        return;
      }

      const formattedUser = {
        id: response?.user?.userId,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        phone: response.user.phoneNumber,
      };

      dispatch(setUserInfo(formattedUser));
      toast({
        title: "Login successful!",
        description: "Redirecting to dashboard...",
      });

      // router.push("/");
      // router.replace("/"); // soft navigate
      // router.refresh(); // force reload to update context-dependent components
      console.log("response :", response);
      if ("user" in response) {
        await login(response.user); // waits for session to refetch
        window.location.href = from;

        // window.location.href = "/"; // <-- Hard reload
        return;

        // setTimeout(() => {
        //   // router.replace("/");
        //   router.push("/");
        //   router.refresh();
        // }, 0);
      }
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }; */

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mx-4">
      {/* Welcome Section */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        {/* <Image
          src={"/person-profile.svg"}
          alt="Person"
          width={75}
          height={71}
          className="mb-4"
        /> */}
        <h1 className="text-2xl sm:text-3xl font-bold text-heading-dark mb-2 px-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-sm sm:text-base px-2">
          Sign in to G-Rollz
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-heading-dark mb-2">
            Sign In
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-2">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
            />

            <div
              className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
            <div className="flex justify-end mt-1">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-500 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center pt-4">
            <ActionButton
              type="submit"
              variant="continue"
              className="w-full sm:w-[269px]"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Login"}
            </ActionButton>
          </div>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="text-center mt-6 sm:mt-8 px-4">
        <p className="text-xs sm:text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:text-blue-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
