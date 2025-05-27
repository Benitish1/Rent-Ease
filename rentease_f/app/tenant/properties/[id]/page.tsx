"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Heart, Bed, Bath, Square, Calendar, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8082/api/properties/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }

        const data = await response.json();
        setProperty(data);

        // Check if property is in favorites
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
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

          if (favoritesResponse.ok) {
            const favorites = await favoritesResponse.json();
            setIsFavorited(
              favorites.some((f: any) => f.property.id === Number(id))
            );
          }
        }
      } catch (err: any) {
        console.error("Error fetching property details:", err);
        setError(err.message || "Failed to fetch property details");
        toast({
          title: "Error",
          description: err.message || "Failed to fetch property details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("User not logged in");
      }
      const user = JSON.parse(userData);

      const response = await fetch(
        `http://localhost:8082/api/users/${user.id}/favorites`,
        {
          method: isFavorited ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: Number(id),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          isFavorited
            ? "Failed to remove from favorites"
            : "Failed to add to favorites"
        );
      }

      setIsFavorited(!isFavorited);
      toast({
        title: isFavorited ? "Removed from favorites" : "Added to favorites",
        description: isFavorited
          ? "The property has been removed from your favorites."
          : "The property has been added to your favorites.",
      });
    } catch (err: any) {
      console.error("Error handling favorites:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to update favorites",
        variant: "destructive",
      });
    }
  };

  const handleBookProperty = async () => {
    try {
      const userData = localStorage.getItem("user");
      console.log("Raw user data from localStorage:", userData);

      if (!userData) {
        throw new Error("User not logged in");
      }

      const user = JSON.parse(userData);
      console.log("Parsed user data:", user);

      if (!user.id) {
        throw new Error("Invalid user data: missing user ID");
      }

      // First check if user already has a booking for this property
      const checkBookingResponse = await fetch(
        `http://localhost:8082/api/bookings/tenant/${user.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (checkBookingResponse.ok) {
        const existingBookings = await checkBookingResponse.json();
        const hasExistingBooking = existingBookings.some(
          (booking: any) =>
            booking.property.id === Number(id) &&
            (booking.status === "PENDING" || booking.status === "APPROVED")
        );

        if (hasExistingBooking) {
          toast({
            title: "Existing Booking Found",
            description: (
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="font-medium text-yellow-800">
                    You already have a booking for this property.
                  </p>
                  <p className="mt-1 text-sm text-yellow-700">
                    Please check your existing booking status or cancel it if
                    you want to make a new request.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/tenant/bookings"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    View Your Bookings
                  </Link>
                  <Link
                    href="/tenant/properties"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Browse Other Properties
                  </Link>
                </div>
              </div>
            ),
            variant: "default",
            duration: 10000,
          });
          return;
        }
      }

      const requestData = {
        propertyId: Number(id),
        tenantId: user.id,
        startDate: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
      };

      console.log("Request data:", requestData);

      const response = await fetch("http://localhost:8082/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);

      if (!response.ok) {
        throw new Error(responseText || "Failed to book property");
      }

      toast({
        title: "Booking Request Sent",
        description: (
          <div className="flex flex-col gap-2">
            <p>
              Your booking request has been sent to the landlord for approval.
            </p>
            <div className="flex gap-2">
              <Link
                href="/tenant/bookings"
                className="text-primary hover:underline"
              >
                View your bookings
              </Link>
              <span>or</span>
              <Link
                href="/tenant/properties"
                className="text-primary hover:underline"
              >
                Browse other properties
              </Link>
            </div>
          </div>
        ),
      });
    } catch (err: any) {
      console.error("Error booking property:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to book property",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4">Loading property details...</div>
          <div className="text-sm text-muted-foreground">
            Please wait while we fetch the property information
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500">
        <h3 className="font-semibold">Error Loading Property</h3>
        <p>{error}</p>
        <p className="mt-2 text-sm">
          Please check the console for more details
        </p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold">Property Not Found</h3>
        <p className="text-muted-foreground">
          The property you're looking for doesn't exist or has been removed
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
            <Image
              src={property.mainPhoto || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">{property.title}</h1>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
                <p className="font-semibold">{property.bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
                <p className="font-semibold">{property.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="font-semibold">{property.area} m²</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Available From</p>
                <p className="font-semibold">
                  {new Date(property.availableFrom).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <p>
                  {property.address}, {property.neighborhood}, {property.city}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {property.amenities?.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <p>{amenity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rules & Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pets</p>
                  <p className="font-semibold">{property.pets}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Smoking</p>
                  <p className="font-semibold">{property.smoking}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Events</p>
                  <p className="font-semibold">{property.events}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Max Occupants</p>
                  <p className="font-semibold">{property.maxOccupants}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Price Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Monthly Rent</p>
                  <p className="font-semibold">${property.price}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Security Deposit</p>
                  <p className="font-semibold">${property.deposit}</p>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <p className="font-semibold">Total First Payment</p>
                  <p className="font-semibold">
                    ${property.price + property.deposit}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleBookProperty}
                >
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToFavorites}
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${
                      isFavorited ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
