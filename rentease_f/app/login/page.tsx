"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginLandlord, loginTenant, loginAdmin } from "@/lib/api";
import { ForgotPasswordDialog } from "@/components/forgot-password-dialog";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"tenant" | "landlord" | "admin">("tenant");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate all required fields
      if (!email.trim()) {
        setError("Email is required");
        setIsLoading(false);
        return;
      }

      if (!password.trim()) {
        setError("Password is required");
        setIsLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      // Validate password
      if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        setIsLoading(false);
        return;
      }

      let response;
      switch (role) {
        case "landlord":
          response = await loginLandlord(email, password);
          break;
        case "tenant":
          response = await loginTenant(email, password);
          break;
        case "admin":
          response = await loginAdmin(email, password);
          break;
        default:
          throw new Error("Invalid role selected");
      }

      if (!response.user) {
        throw new Error("Invalid response from server");
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.user));

      // Clear form data
      setEmail("");
      setPassword("");

      // Redirect to appropriate dashboard
      router.push(`/${role}/dashboard`);
    } catch (err: any) {
      setError(
        err.message || "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070"
          alt="Modern apartment interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 flex items-center">
          <div className="p-12 text-white max-w-xl">
            <div className="flex items-center gap-2 mb-8">
              <div className="rounded-md bg-primary p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary-foreground"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-2xl font-bold">RentEase</span>
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Find your perfect home with ease
            </h1>
            <p className="text-xl text-white/90">
              Join thousands of happy tenants and landlords on the most trusted
              rental platform in Rwanda.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 md:hidden">
              <div className="rounded-md bg-primary p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-foreground"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-xl font-bold">RentEase</span>
            </div>
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={isMounted ? email : ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={isLoading}
                  aria-required="true"
                  minLength={1}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={isMounted ? password : ""}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={isLoading}
                  aria-required="true"
                  minLength={8}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" disabled={isLoading} />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none"
                >
                  Remember me
                </label>
              </div>
              <div className="space-y-2">
                <Label>Login as</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={role === "tenant" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => {
                      setRole("tenant");
                      setError("");
                    }}
                    disabled={isLoading}
                  >
                    Tenant
                  </Button>
                  <Button
                    type="button"
                    variant={role === "landlord" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => {
                      setRole("landlord");
                      setError("");
                    }}
                    disabled={isLoading}
                  >
                    Landlord
                  </Button>
                  <Button
                    type="button"
                    variant={role === "admin" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => {
                      setRole("admin");
                      setError("");
                    }}
                    disabled={isLoading}
                  >
                    Admin
                  </Button>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <ForgotPasswordDialog
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}
