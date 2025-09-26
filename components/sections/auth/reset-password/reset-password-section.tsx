"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ActionButton } from "@/components/ui/action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast({
        title: "Invalid link",
        description: "No reset token provided.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword !== confirm) {
      toast({
        title: "Passwords do not match",
        description: "Please enter matching passwords.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to reset password");
      }
      toast({
        title: "Password reset successful!",
        description: "You can now login with your new password.",
      });
      // Optionally redirect to login
      window.location.href = "/login";
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div>
          <ActionButton type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </ActionButton>
        </div>
      </form>
    </div>
  );
}
/* "use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton } from "@/components/ui/action-button";
import Link from "next/link";
import Image from "next/image";
import { isActionError } from "@/lib/error";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { verifyResetToken } from "@/services/auth/verify-reset-token";
import { resetPassword } from "@/services/auth/reset-password";

export default function ResetPasswordSection() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenValid(false);
        setVerifying(false);
        return;
      }

      try {
        const response = await verifyResetToken(token);

        if (isActionError(response)) {
          setTokenValid(false);
        } else {
          setTokenValid(true);
          setUserId(response.user);
        }
      } catch (error) {
        setTokenValid(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!token) {
      toast({
        title: "Invalid token",
        description: "Reset token is missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword({
        userId,
        password,
      });

      if (isActionError(response)) {
        toast({
          title: "Reset failed",
          description:
            response.message || "Failed to reset password. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setPasswordReset(true);
      toast({
        title: "Password reset successful!",
        description: "Your password has been updated successfully.",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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

  // Loading state while verifying token
  if (verifying) {
    return (
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mx-4">
        <div className="flex flex-col items-center text-center py-12">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-heading-dark mb-2">
            Verifying Reset Link...
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your reset token.
          </p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!tokenValid) {
    return (
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mx-4">
        <div className="flex flex-col items-center text-center py-12">
          <XCircle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-heading-dark mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-md">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>

          <div className="space-y-3">
            <Link href="/forgot-password">
              <ActionButton variant="continue" className="w-full sm:w-auto">
                Request New Reset Link
              </ActionButton>
            </Link>

            <div>
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (passwordReset) {
    return (
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mx-4">
        <div className="flex flex-col items-center text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-heading-dark mb-2">
            Password Reset Successful!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-md">
            Your password has been updated successfully. You will be redirected
            to the login page shortly.
          </p>

          <Link href="/login">
            <ActionButton variant="continue">Go to Login</ActionButton>
          </Link>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mx-4">
 
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-heading-dark mb-2 px-2">
          Reset Your Password
        </h1>
        <p className="text-gray-600 text-sm sm:text-base px-2">
          Enter your new password below
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <Label htmlFor="password">New Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your new password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
              disabled={loading}
              minLength={8}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-financial-yellow focus:ring-financial-yellow"
              required
              disabled={loading}
              minLength={8}
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
                "Reset Password"
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
    </div>
  );
} */
