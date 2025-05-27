"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Heart, Calendar } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function TenantDashboardPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    favoriteProperties: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          throw new Error("User not logged in");
        }
        const user = JSON.parse(userData);

        // Fetch bookings
        const bookingsResponse = await fetch(
          `http://localhost:8082/api/bookings/tenant/${user.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        // Fetch favorites
        const favoritesResponse = await fetch(
          `http://localhost:8082/api/users/${user.id}/favorites`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const bookings = bookingsResponse.ok
          ? await bookingsResponse.json()
          : [];
        const favorites = favoritesResponse.ok
          ? await favoritesResponse.json()
          : [];

        setStats({
          totalBookings: bookings.length,
          pendingBookings: bookings.filter((b: any) => b.status === "PENDING")
            .length,
          approvedBookings: bookings.filter((b: any) => b.status === "APPROVED")
            .length,
          favoriteProperties: favorites.length,
        });
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        toast({
          title: "Error",
          description: err.message || "Failed to fetch dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your tenant dashboard
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mb-4">Loading dashboard data...</div>
            <div className="text-sm text-muted-foreground">
              Please wait while we fetch your information
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                All your booking requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingBookings}</div>
              <p className="text-xs text-muted-foreground">
                Waiting for landlord approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Bookings
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedBookings}</div>
              <p className="text-xs text-muted-foreground">
                Successfully booked properties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Favorite Properties
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.favoriteProperties}
              </div>
              <p className="text-xs text-muted-foreground">
                Properties you've saved
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/tenant/properties">
              <Button className="w-full justify-start gap-2">
                <Building2 className="h-4 w-4" />
                Browse Properties
              </Button>
            </Link>
            <Link href="/tenant/favorites">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Heart className="h-4 w-4" />
                View Favorites
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your recent booking requests and property interactions will appear
              here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
