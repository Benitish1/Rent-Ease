"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  CreditCard,
  Heart,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
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
import { Progress } from "@/components/ui/progress";
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

export default function TenantDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Check for session expiration
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        handleSessionExpired();
      }
    };

    // Check session every minute
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
    try {
      setIsLoggingOut(true);
      const result = await logout();

      // Show success message
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });

      // Redirect to login page
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);

      // Handle specific error cases
      let errorMessage = "There was a problem logging out. Please try again.";
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

      // Show error message
      toast({
        title: "Logout Failed",
        description: errorMessage,
        variant: "destructive",
      });

      // Still redirect to login page even if logout fails
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
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
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-lg font-bold">RentEase</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/tenant/dashboard"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/tenant/bookings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="h-5 w-5" />
              <span>Bookings</span>
            </Link>
            <Link
              href="/tenant/favorites"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
            <Link
              href="/tenant/payments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </Link>
            <Link
              href="/tenant/messages"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
              <Badge className="ml-auto">3</Badge>
            </Link>
            <Link
              href="/tenant/notifications"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              <Badge className="ml-auto">5</Badge>
            </Link>
            <Link
              href="/tenant/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/tenant/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-5 w-5" />
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
                  <LogOut className="mr-2 h-5 w-5" />
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
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  5
                </span>
              </Button>
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">
                Welcome back, John
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your rentals.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Bookings
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Payments
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,200</div>
                  <p className="text-xs text-muted-foreground">Due in 5 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Saved Properties
                  </CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    +3 new this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unread Messages
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    2 from landlords
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Current Rentals</CardTitle>
                  <CardDescription>
                    Your active rental properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Apartment"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Modern Apartment in Kigali Heights
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Kigali Heights, Kigali
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Lease ends in 8 months
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Studio"
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
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Lease ends in 3 months
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Properties
                  </Button>
                </CardFooter>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                  <CardDescription>Your scheduled payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Kigali Heights
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due in 5 days
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$800</p>
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 hover:bg-amber-50"
                        >
                          Pending
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - City Center
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due in 12 days
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$400</p>
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 hover:bg-amber-50"
                        >
                          Pending
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Security Deposit - Kigali Heights
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Paid on May 1, 2023
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$1,600</p>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50"
                        >
                          Paid
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Payments
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Your latest updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Rent payment reminder</p>
                        <p className="text-sm text-muted-foreground">
                          Your rent payment for Kigali Heights is due in 5 days.
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">New message from landlord</p>
                        <p className="text-sm text-muted-foreground">
                          Michael Chen sent you a message about your maintenance
                          request.
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          5 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Maintenance scheduled</p>
                        <p className="text-sm text-muted-foreground">
                          Your maintenance request has been scheduled for
                          tomorrow at 10 AM.
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          1 day ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Favorite Properties</CardTitle>
                  <CardDescription>Properties you've saved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=56&width=56"
                          alt="Luxury Villa"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Luxury Villa with Pool</h3>
                        <p className="text-sm text-muted-foreground">
                          Nyarutarama, Kigali
                        </p>
                        <p className="text-sm font-semibold">$2,500/month</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=56&width=56"
                          alt="Penthouse"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          Penthouse with Panoramic Views
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Kacyiru, Kigali
                        </p>
                        <p className="text-sm font-semibold">$3,000/month</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=56&width=56"
                          alt="Modern Townhouse"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Modern Townhouse</h3>
                        <p className="text-sm text-muted-foreground">
                          Gisozi, Kigali
                        </p>
                        <p className="text-sm font-semibold">$1,500/month</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Favorites
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lease Status</CardTitle>
                  <CardDescription>
                    Your current lease information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Kigali Heights Apartment
                        </span>
                        <span className="text-sm text-muted-foreground">
                          8 months left
                        </span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          City Center Studio
                        </span>
                        <span className="text-sm text-muted-foreground">
                          3 months left
                        </span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Lease Renewal</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Your lease for City Center Studio will expire in 3
                        months. Would you like to renew?
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm">Renew Lease</Button>
                        <Button variant="outline" size="sm">
                          Not Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
