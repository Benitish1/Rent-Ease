"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Bell,
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  BarChart3,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
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

export default function AdminDashboard() {
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
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Users className="h-5 w-5" />
              <span>Users</span>
            </Link>
            <Link
              href="/admin/properties"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Home className="h-5 w-5" />
              <span>Properties</span>
            </Link>
            <Link
              href="/admin/payments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
              <Badge className="ml-auto">12</Badge>
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>Reports</span>
              <Badge className="ml-auto">5</Badge>
            </Link>
            <Link
              href="/admin/messages"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              href="/admin/notifications"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>
            <Link
              href="/admin/settings"
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
                  8
                </span>
              </Button>
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Admin"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Platform overview and management
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">
                    +86 this month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Properties
                  </CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">532</div>
                  <p className="text-xs text-muted-foreground">
                    +24 this month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$128,540</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Platform Commission
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,854</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>
                    New user registrations over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-lg bg-muted/30 flex items-center justify-center">
                    <p className="text-muted-foreground">User Growth Chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Payment Verification</CardTitle>
                  <CardDescription>
                    Recent payments requiring verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Luxury Villa
                        </p>
                        <p className="text-sm text-muted-foreground">
                          $2,500 • John Smith to Michael Chen
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Rent Payment - Modern Apartment
                        </p>
                        <p className="text-sm text-muted-foreground">
                          $1,200 • Sarah Johnson to David Mutabazi
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Security Deposit - Cozy Studio
                        </p>
                        <p className="text-sm text-muted-foreground">
                          $1,600 • Michael Chen to Lisa Wong
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
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
                  <CardTitle>Property Verification</CardTitle>
                  <CardDescription>
                    Properties awaiting verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                        <p className="text-xs text-muted-foreground">
                          Listed by: David Mutabazi
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Verify
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=56&width=56"
                          alt="Riverside Bungalow"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Riverside Bungalow</h3>
                        <p className="text-sm text-muted-foreground">
                          Kicukiro, Kigali
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Listed by: Amina Diallo
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Verify
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=56&width=56"
                          alt="Executive Apartment"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Executive Apartment</h3>
                        <p className="text-sm text-muted-foreground">
                          Nyamirambo, Kigali
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Listed by: John Mugabo
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Verify
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

              <Card>
                <CardHeader>
                  <CardTitle>User Reports</CardTitle>
                  <CardDescription>
                    Recent user reports and issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="destructive">High Priority</Badge>
                        <span className="text-xs text-muted-foreground">
                          2 hours ago
                        </span>
                      </div>
                      <h3 className="font-semibold">
                        Fraudulent Listing Report
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        User reported a suspicious listing with fake images and
                        unrealistic pricing.
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Reported by: Sarah Johnson
                        </span>
                        <Button size="sm">Investigate</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge>Medium Priority</Badge>
                        <span className="text-xs text-muted-foreground">
                          5 hours ago
                        </span>
                      </div>
                      <h3 className="font-semibold">Payment Issue</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        User reported payment was processed but not reflected in
                        the system.
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Reported by: Michael Chen
                        </span>
                        <Button size="sm">Investigate</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Low Priority</Badge>
                        <span className="text-xs text-muted-foreground">
                          1 day ago
                        </span>
                      </div>
                      <h3 className="font-semibold">Account Access Issue</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        User reported difficulty accessing their account after
                        password reset.
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Reported by: John Smith
                        </span>
                        <Button size="sm">Investigate</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Reports
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Statistics</CardTitle>
                  <CardDescription>Key performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        User Retention Rate
                      </span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Property Occupancy Rate
                      </span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Payment Success Rate
                      </span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Platform Uptime
                      </span>
                      <span className="text-sm font-medium">99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-semibold">System Health</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">All systems operational</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Last incident: 15 days ago
                    </p>
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
