// components/sections/auth/signup/signup-section.tsx

"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton } from "@/components/ui/action-button";
import Link from "next/link";
import { registerUser } from "@/services/auth/signup";
import { isActionError } from "@/lib/error";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useSessionStore } from "@/store/useSessionStore";
import { syncModeWithRole } from "@/store/useSessionStore";

const countries = [
  { id: "NL", refName: "Netherlands" },
  { id: "DE", refName: "Germany" },
  { id: "FR", refName: "France" },
  { id: "BE", refName: "Belgium" },
  { id: "UK", refName: "United Kingdom" },
];

export default function SignupSection() {
  const { toast } = useToast();
  const router = useRouter();

  const { setUser, fetchSession } = useSessionStore();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isWholesaler: false,
    companyName: "",
    taxId: "",
    city: "",
    zip: "",
    country: { id: "NL", refName: "Netherlands" },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please re-enter.",
        variant: "destructive",
      });
      return;
    }

    // Validate extra fields if wholesaler
    if (formData.isWholesaler) {
      if (
        !formData.companyName.trim() ||
        !formData.taxId.trim() ||
        !formData.city.trim() ||
        !formData.zip.trim()
      ) {
        toast({
          title: "Missing fields",
          description: "Please provide Company Details for wholesaler account.",
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);
    try {
      const nameParts = formData.fullName.trim().split(" ");
      const role: "b2b" | "customer" = formData.isWholesaler
        ? "b2b"
        : "customer";

      const payload = {
        firstName: nameParts[0] || "",
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
        lastName: nameParts.slice(1).join(" ") || "",
        // ...(nameParts.slice(1).join(" ").trim() && {
        //   lastName: nameParts.slice(1).join(" "),
        // }),
        role,
        isWholesaler: false,
        companyName: "",
        taxId: "",
        city: formData.city,
        zip: formData.zip,
        country: formData.country.id,
      };

      if (formData.isWholesaler) {
        payload.companyName = formData.companyName;
        payload.taxId = formData.taxId;
        payload.city = formData.city;
        payload.zip = formData.zip;
        payload.country = formData.country.id || "";
      }
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
        console.error("Signup failed:", response);
        toast({
          title: "Signup failed",
          description: "Unexpected error occurred.",
          variant: "destructive",
        });
        return;
      }

      // We expect response.user to include role now
      const newUser = response.user;
      // response.user should be of type { userId, firstName, lastName, email, phoneNumber, role }

      // 1. Set user in Zustand
      setUser(newUser);
      syncModeWithRole(newUser);
      await fetchSession();

      toast({
        title: "Account created successfully!",
        description: "Redirecting to your dashboard...",
      });

      router.push("/");
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
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8  mx-auto">
        {/* max-w-2xl */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
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
          {/* Toggle Switch */}
          <div className="flex items-center mb-6">
            <label
              htmlFor="isWholesaler"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  id="isWholesaler"
                  name="isWholesaler"
                  type="checkbox"
                  checked={formData.isWholesaler}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
              </div>
              <span className="ml-3 text-gray-900 font-medium">
                Sign up as Wholesaler
              </span>
            </label>
          </div>

          <div
            className={`flex flex-col ${
              formData.isWholesaler ? "md:flex-row gap-6" : ""
            }`}
          >
            <div
              className={`${
                formData.isWholesaler ? "md:w-1/2" : "w-full"
              } space-y-4 sm:space-y-6`}
            >
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
            </div>

            {/* Right Column - Only for Wholesaler */}
            {formData.isWholesaler && (
              <div className="md:w-1/2 space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="companyName">Company *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Company name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required={formData.isWholesaler}
                    className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="taxId">Tax ID *</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    type="text"
                    placeholder="Tax/EIN Number*"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    required={formData.isWholesaler}
                    className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mt-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country.id}
                    onChange={(e) => {
                      const selected = countries.find(
                        (c) => c.id === e.target.value
                      );
                    }}
                    className="w-full border border-border mt-1 h-10 sm:h-12 rounded-xl px-3 py-2 bg-background text-foreground focus:border-financial-yellow focus:ring-financial-yellow"
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.refName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="taxId">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required={formData.isWholesaler}
                    className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="taxId">zip *</Label>
                  <Input
                    id="zip"
                    name="zip"
                    type="text"
                    placeholder="Zip Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required={formData.isWholesaler}
                    className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
                  />
                </div>
              </div>
            )}
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

/* 
"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton } from "@/components/ui/action-button";
import Link from "next/link";
import Image from "next/image";
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
      };

      dispatch(setUserInfo(formattedUser));

      toast({
        title: "Account created successfully!",
        description: "Redirecting to dashboard...",
      });

      router.push("/");
        router.refresh();
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

  
} */
