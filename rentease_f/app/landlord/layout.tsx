"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
  BarChart3,
  Users,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    let errorMessage = "There was a problem logging out. Please try again.";

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
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-lg font-bold">RentEase</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/landlord/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/dashboard"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/landlord/properties"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/properties" ||
                pathname.startsWith("/landlord/properties/")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Building2 className="h-5 w-5" />
              <span>Properties</span>
            </Link>
            <Link
              href="/landlord/bookings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/bookings"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Bookings</span>
              <Badge className="ml-auto">2</Badge>
            </Link>
            <Link
              href="/landlord/tenants"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/tenants"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Tenants</span>
            </Link>
            <Link
              href="/landlord/payments"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/payments"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </Link>
            <Link
              href="/landlord/analytics"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/analytics"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/landlord/messages"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/messages"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
              <Badge className="ml-auto">5</Badge>
            </Link>
            <Link
              href="/landlord/notifications"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/notifications"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              <Badge className="ml-auto">3</Badge>
            </Link>
            <Link
              href="/landlord/profile"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/profile"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/landlord/settings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/landlord/settings"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
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
        <main className="flex-1 lg:pl-64">{children}</main>

        {/* Mobile sidebar trigger (only shows on small screens) */}
        <div className="fixed bottom-4 right-4 z-10 lg:hidden">
          <Button size="icon" className="h-12 w-12 rounded-full">
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
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
