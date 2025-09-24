"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton } from "@/components/ui/action-button";
import Link from "next/link";
import Image from "next/image";
import { SecurityFeatures } from "../../homepage/security-features";
import { registerUser } from "@/services/auth/signup";
import { isActionError } from "@/lib/error";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { setUserInfo } from "@/redux/features/user-info-slice";
import { useDispatch } from "react-redux";

export default function SignupSection() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please re-enter.",
        variant: "destructive",
      });
      return;
    }

    const nameParts = formData.fullName.trim().split(" ");
    const payload = {
      firstName: nameParts[0] || "",
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
      ...(nameParts.slice(1).join(" ").trim() && {
        lastName: nameParts.slice(1).join(" "),
      }),
    };

    setLoading(true);
    try {
      const response = await registerUser(payload);
      if (isActionError(response) && response.message) {
        toast({
          title: "Account creation failed",
          description: response.message,
          variant: "destructive",
        });
        return;
      }

      if (!response || "error" in response || !response.user) {
        // Handle error case ?.error
        console.error("Signup failed:", response);
        return;
      }

      const formattedUser = {
        id: response.user.user_id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        phone: response.user.phoneNumber,
        // taxOrganizationStatus:
        //   response.taxOrganization?.status ?? "not_started",
      };

      dispatch(setUserInfo(formattedUser));

      toast({
        title: "Account created successfully!",
        description: "Redirecting to dashboard...",
      });

      router.push("/");
      // router.replace("/"); // soft navigate
        router.refresh(); // force reload to update context-dependent components

      // const hasCompletedSetup = false;

      /* if (hasCompletedSetup) {
        router.push("/bookkeeping");
      } else {
        localStorage.setItem("selectedService", "bookkeeping-setup");
        router.push("/bookkeeping-setup");
      } */
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

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mx-auto">
      {/* Setup Section */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-heading-dark mb-3 sm:mb-4 px-2">
          Let's get you set up
        </h1>
        <p className="text-gray-750 mb-6 sm:mb-8 text-base sm:text-[18px] px-2">
          We'll need some basic information and then you can choose your
          service.
        </p>
        <SecurityFeatures />
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          {/* <Image
            src={"/person-profile.svg"}
            alt="Person"
            width={75}
            height={71}
            className="mb-4"
          /> */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-heading-dark mb-2">
              Your Information
            </h2>
            <p className="text-gray-600 text-sm sm:text-base px-2">
              Let's start with some basic details about you
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
            />
          </div>

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

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
            />
          </div>

          <div className="w-full flex justify-center pt-4">
            <ActionButton
              type="submit"
              variant="continue"
              className="w-full sm:w-[269px]"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Create account"
              )}
            </ActionButton>
          </div>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
