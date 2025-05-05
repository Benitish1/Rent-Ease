"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { registerLandlord, registerTenant, registerAdmin } from "@/lib/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(""); // Clear error when user makes changes
  };

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>,
    role: string
  ) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Validate password strength
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      // Validate phone number format
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError("Please enter a valid phone number");
        return;
      }

      // Use the appropriate registration function based on role
      let response;
      switch (role.toLowerCase()) {
        case "landlord":
          response = await registerLandlord(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.phone,
            formData.password
          );
          break;
        case "tenant":
          response = await registerTenant(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.phone,
            formData.password
          );
          break;
        case "admin":
          response = await registerAdmin(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.phone,
            formData.password
          );
          break;
        default:
          throw new Error("Invalid role selected");
      }

      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login page
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <Image
          src="/placeholder.svg"
          alt="Modern apartment interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="p-12 text-white max-w-md">
            <div className="flex items-center gap-2 mb-8">
              <div className="rounded-md bg-primary p-1">
                <svg
                  className="h-6 w-6 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-xl font-bold">RentEase</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Join our community today
            </h1>
            <p className="text-white/80">
              Create an account to start browsing properties and connect with
              landlords.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Create an account</h2>
            <p className="text-muted-foreground mt-2">
              Sign up to get started with RentEase
            </p>
          </div>

          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <Tabs defaultValue="tenant" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tenant">Tenant</TabsTrigger>
              <TabsTrigger value="landlord">Landlord</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            {["tenant", "landlord", "admin"].map((role) => (
              <TabsContent key={role} value={role}>
                <form
                  className="space-y-4"
                  onSubmit={(e) => handleSignup(e, role)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      placeholder="+1234567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      minLength={8}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      minLength={8}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`terms-${role}`}
                      required
                      disabled={isLoading}
                    />
                    <Label
                      htmlFor={`terms-${role}`}
                      className="text-sm font-medium leading-none"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        privacy policy
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading
                      ? "Creating Account..."
                      : `Create ${
                          role.charAt(0).toUpperCase() + role.slice(1)
                        } Account`}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
