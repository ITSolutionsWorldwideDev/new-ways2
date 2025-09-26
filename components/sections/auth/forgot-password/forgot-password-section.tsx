"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton } from "@/components/ui/action-button";
import Link from "next/link";
import Image from "next/image";
import { forgotPassword } from "@/services/auth/forgot-password";
import { isActionError } from "@/lib/error";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";


import { useSearchParams } from "next/navigation";

export default function ForgotPasswordSection() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const searchParams = useSearchParams();

   const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword({
        email: trimmedEmail,
      });

      if (isActionError(response)) {
        toast({
          title: "Error",
          description:
            response.message || "Failed to send reset email. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setEmailSent(true);
      toast({
        title: "Email sent!",
        description: "Check your email for password reset instructions.",
      });
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mx-4">
        {/* Success Section */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-heading-dark mb-2 px-2">
            Email Sent!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base px-2 max-w-md">
            We've sent password reset link to <strong>{email}</strong>
          </p>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-heading-dark mb-4">
              Check Your Email
            </h2>
            <div className="space-y-3 text-gray-600 text-sm sm:text-base">
              <p>
                1. Check your inbox for an email from Balance Beam Bookkeeping &
                Tax
              </p>
              <p>2. Click the reset password link in the email</p>
              <p>3. Follow the instructions to create a new password</p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-500 text-sm">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail("");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                try again
              </button>
            </p>

            <Link
              href="/login"
              className="inline-block text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mx-4">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-heading-dark mb-2 px-2">
          Forgot Password?
        </h1>
        <p className="text-gray-600 text-sm sm:text-base px-2">
          Enter your email address and we'll send you a link to reset your
          password
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
              disabled={loading}
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
                "Send Reset Email"
              )}
            </ActionButton>
          </div>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="text-center mt-6 sm:mt-8 px-4">
        <p className="text-xs sm:text-sm text-gray-500">
          By using our service, you agree to our{" "}
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
