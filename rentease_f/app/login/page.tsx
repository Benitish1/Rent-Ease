"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginLandlord, loginTenant, loginAdmin } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"tenant" | "landlord" | "admin">("tenant");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      // Validate password
      if (password.length < 8) {
        setError("Password must be at least 8 characters long");
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

      // Clear form data
      setEmail("");
      setPassword("");

      // Redirect to appropriate dashboard
      router.push(`/${role}/dashboard`);
    } catch (err: any) {
      setError(
        err.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="Modern apartment interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="p-12 text-white max-w-md">
            <div className="flex items-center gap-2 mb-8">
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
            <h1 className="text-3xl font-bold mb-4">
              Find your perfect home with ease
            </h1>
            <p className="text-white/80">
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={isLoading}
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" disabled={isLoading}>
              Google
            </Button>
            <Button variant="outline" className="w-full" disabled={isLoading}>
              Facebook
            </Button>
          </div>

          <div className="mt-8 text-center text-sm">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
