"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Plus,
  BarChart3,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function LandlordDashboard() {
  const router = useRouter();
  const {toast} = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const [currentUser, setCurrentUser] = useState<{ lastName: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setCurrentUser({lastName: data.lastName});
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser(null);
      }
    };

    fetchUser();
  }, []);


  // Check for session expiration
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        handleSessionExpired();
      }
    };

    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSessionExpired = () => {
    toast({
      title: "Session Expired",
      description: "Your session has expired. Please log in again.",
      variant: "destructive",
    });
    router.push("/login");
  };

  const handleLogout = async () => {
    let errorMessage = "There was a problem logging out. Please try again."; // Declare the errorMessage initially

    try {
      setIsLoggingOut(true);
      const result = await logout();

      // Show success message
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });

      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);

      // Handle specific error cases
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = "Your session has expired. Please log in again.";
            break;
          case 403:
            errorMessage = "You don't have permission to perform this action.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your internet connection.";
      }
    }

    toast({
      title: "Logout Failed",
      description: errorMessage,
      variant: "destructive",
    });

    router.push("/login");

    setIsLoggingOut(false);
    setShowLogoutDialog(false);
  };


  return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r bg-background lg:block">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="rounded-md bg-primary p-1">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary-foreground"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">RentEase</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              <Link
                  href="/landlord/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
              >
                <Home className="h-5 w-5"/>
                <span>Dashboard</span>
              </Link>
              <Link
                  href="/landlord/properties"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Home className="h-5 w-5"/>
                <span>Properties</span>
              </Link>
              <Link
                  href="/landlord/bookings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Calendar className="h-5 w-5"/>
                <span>Bookings</span>
                <Badge className="ml-auto">2</Badge>
              </Link>
              <Link
                  href="/landlord/tenants"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Users className="h-5 w-5"/>
                <span>Tenants</span>
              </Link>
              <Link
                  href="/landlord/payments"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <CreditCard className="h-5 w-5"/>
                <span>Payments</span>
              </Link>
              <Link
                  href="/landlord/analytics"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <BarChart3 className="h-5 w-5"/>
                <span>Analytics</span>
              </Link>
              <Link
                  href="/landlord/messages"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <MessageSquare className="h-5 w-5"/>
                <span>Messages</span>
                <Badge className="ml-auto">5</Badge>
              </Link>
              <Link
                  href="/landlord/notifications"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Bell className="h-5 w-5"/>
                <span>Notifications</span>
                <Badge className="ml-auto">3</Badge>
              </Link>
              <Link
                  href="/landlord/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <User className="h-5 w-5"/>
                <span>Profile</span>
              </Link>
              <Link
                  href="/landlord/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Settings className="h-5 w-5"/>
                <span>Settings</span>
              </Link>
            </nav>
            <div className="absolute bottom-0 w-full border-t p-4">
              <AlertDialog
                  open={showLogoutDialog}
                  onOpenChange={setShowLogoutDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground"
                      disabled={isLoggingOut}
                  >
                    <LogOut className="mr-2 h-5 w-5"/>
                    {isLoggingOut ? "Logging out..." : "Log out"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will need to log in again to access your account. Any
                      unsaved changes will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isLoggingOut ? "Logging out..." : "Log out"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 lg:ml-64">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
              <Button variant="outline" size="icon" className="lg:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
              <div className="ml-auto flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5"/>
                  <span className="sr-only">Notifications</span>
                  <span
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  3
                </span>
                </Button>
                <Avatar>
                  <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                  />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
              </div>
            </header>

            <div className="p-6">
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">
                  Welcome back, {currentUser?.lastName}
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your properties.
                </p>
              </div>
            </div>


            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Properties
                  </CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Tenants
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Revenue
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,500</div>
                  <p className="text-xs text-muted-foreground">
                    +$1,200 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Occupancy Rate
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Property Overview</CardTitle>
                  <CardDescription>
                    Status of your rental properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Luxury Villa"
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Luxury Villa with Pool
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Nyarutarama, Kigali
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 hover:bg-green-50"
                          >
                            Occupied
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            3 tenants
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$2,500/mo</p>
                        <p className="text-sm text-muted-foreground">
                          8 months left on lease
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Modern Apartment"
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Modern Apartment with City View
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Kigali Heights, Kigali
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 hover:bg-green-50"
                          >
                            Occupied
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            2 tenants
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$1,200/mo</p>
                        <p className="text-sm text-muted-foreground">
                          5 months left on lease
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Cozy Studio"
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Cozy Studio in City Center
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Kimihurura, Kigali
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 hover:bg-green-50"
                          >
                            Occupied
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            1 tenant
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$800/mo</p>
                        <p className="text-sm text-muted-foreground">
                          3 months left on lease
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Family Home"
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Family Home with Garden
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Kibagabaga, Kigali
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 hover:bg-green-50"
                          >
                            Occupied
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            4 tenants
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$1,800/mo</p>
                        <p className="text-sm text-muted-foreground">
                          11 months left on lease
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Penthouse"
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Penthouse with Panoramic Views
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Kacyiru, Kigali
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 hover:bg-amber-50"
                          >
                            Vacant
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Listed 2 weeks ago
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$3,000/mo</p>
                        <p className="text-sm text-muted-foreground">
                          Available now
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View All Properties</Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Property
                  </Button>
                </CardFooter>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Booking Requests</CardTitle>
                  <CardDescription>
                    Recent property booking requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="User"
                              fill
                              className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Sarah Johnson</h3>
                          <p className="text-sm text-muted-foreground">
                            For: Penthouse with Panoramic Views
                          </p>
                        </div>
                        <Badge>New</Badge>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="flex justify-between text-sm">
                          <span>Move-in date:</span>
                          <span className="font-medium">June 15, 2023</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <span className="font-medium">12 months</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Occupants:</span>
                          <span className="font-medium">2 adults</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="w-full">
                            Accept
                          </Button>
                          <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="User"
                              fill
                              className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">David Mutabazi</h3>
                          <p className="text-sm text-muted-foreground">
                            For: Penthouse with Panoramic Views
                          </p>
                        </div>
                        <Badge>New</Badge>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="flex justify-between text-sm">
                          <span>Move-in date:</span>
                          <span className="font-medium">July 1, 2023</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <span className="font-medium">24 months</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Occupants:</span>
                          <span className="font-medium">1 adult</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="w-full">
                            Accept
                          </Button>
                          <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Requests
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <CheckCircle2 className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Luxury Villa
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: John & Lisa Smith
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$2,500</p>
                        <p className="text-xs text-muted-foreground">
                          May 1, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <CheckCircle2 className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Modern Apartment
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: Sarah Johnson
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$1,200</p>
                        <p className="text-xs text-muted-foreground">
                          May 1, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <CheckCircle2 className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Cozy Studio
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: Michael Chen
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$800</p>
                        <p className="text-xs text-muted-foreground">
                          May 1, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <CheckCircle2 className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Family Home
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: Amina Diallo
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$1,800</p>
                        <p className="text-xs text-muted-foreground">
                          May 1, 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                  <CardDescription>Expected income</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Luxury Villa
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: John & Lisa Smith
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$2,500</p>
                        <p className="text-xs text-muted-foreground">
                          Due June 1, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Modern Apartment
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: Sarah Johnson
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$1,200</p>
                        <p className="text-xs text-muted-foreground">
                          Due June 1, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Cozy Studio
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: Michael Chen
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$800</p>
                        <p className="text-xs text-muted-foreground">
                          Due June 1, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Family Home
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: Amina Diallo
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$1,800</p>
                        <p className="text-xs text-muted-foreground">
                          Due June 1, 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Payment Schedule
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Requests</CardTitle>
                  <CardDescription>Property maintenance issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                        <Clock className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Plumbing Issue</p>
                        <p className="text-sm text-muted-foreground">
                          Modern Apartment - Sarah Johnson
                        </p>
                      </div>
                      <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 hover:bg-amber-50"
                      >
                        Pending
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <CheckCircle2 className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">AC Repair</p>
                        <p className="text-sm text-muted-foreground">
                          Luxury Villa - John Smith
                        </p>
                      </div>
                      <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50"
                      >
                        Resolved
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                        <Clock className="h-5 w-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Electrical Issue</p>
                        <p className="text-sm text-muted-foreground">
                          Cozy Studio - Michael Chen
                        </p>
                      </div>
                      <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 hover:bg-amber-50"
                      >
                        In Progress
                      </Badge>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Schedule Maintenance</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        You have 2 pending maintenance requests that need to be
                        scheduled.
                      </p>
                      <Button className="mt-3 w-full">Schedule Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
  );
}

