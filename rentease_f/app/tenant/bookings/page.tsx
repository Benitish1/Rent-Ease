"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          throw new Error("User not logged in");
        }
        const user = JSON.parse(userData);

        const response = await fetch(
          `http://localhost:8082/api/bookings/tenant/${user.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to fetch bookings");
        toast({
          title: "Error",
          description: err.message || "Failed to fetch bookings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });
    } catch (err: any) {
      console.error("Error cancelling booking:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to cancel booking",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      CANCELLED: "bg-gray-100 text-gray-800",
      COMPLETED: "bg-blue-100 text-blue-800",
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4">Loading bookings...</div>
          <div className="text-sm text-muted-foreground">
            Please wait while we fetch your bookings
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500">
        <h3 className="font-semibold">Error Loading Bookings</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your property bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No Bookings Found</h3>
          <p className="text-muted-foreground">
            You haven't made any bookings yet
          </p>
          <Link href="/tenant/properties">
            <Button className="mt-4">Browse Properties</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{booking.property.title}</CardTitle>
                    <CardDescription>
                      {booking.property.address}, {booking.property.city}
                    </CardDescription>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Start Date
                      </p>
                      <p className="font-medium">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Link href={`/tenant/properties/${booking.property.id}`}>
                      <Button variant="outline">View Property</Button>
                    </Link>
                    {booking.status === "PENDING" && (
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
