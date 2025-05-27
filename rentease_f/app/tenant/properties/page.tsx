"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function PropertiesPage() {
  const { toast } = useToast();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log("Starting to fetch properties...");
        const response = await fetch("http://localhost:8082/api/properties", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        console.log(
          "Response headers:",
          Object.fromEntries(response.headers.entries())
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(
            `Failed to fetch properties: ${response.status} ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Raw response data:", data);

        if (!Array.isArray(data)) {
          console.error("Expected array but got:", typeof data);
          throw new Error(
            "Invalid response format: expected an array of properties"
          );
        }

        // Get user's favorites and bookings
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);

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

          const favorites = favoritesResponse.ok
            ? await favoritesResponse.json()
            : [];
          const bookings = bookingsResponse.ok
            ? await bookingsResponse.json()
            : [];

          console.log("Fetched bookings:", bookings);

          const favoriteIds = favorites.map((f: any) => f.property.id);
          const bookingMap = new Map(
            bookings.map((b: any) => {
              console.log("Processing booking:", b);
              return [b.property.id, b.status];
            })
          );

          console.log("Booking map:", Object.fromEntries(bookingMap));

          const propertiesWithStatus = data.map((property: any) => {
            const status = bookingMap.get(property.id);
            console.log(`Property ${property.id} status:`, status);
            return {
              ...property,
              isFavorited: favoriteIds.includes(property.id),
              bookingStatus: status || null,
            };
          });

          console.log("Properties with status:", propertiesWithStatus);

          setProperties(propertiesWithStatus);
        } else {
          setProperties(data);
        }

        console.log("Number of properties received:", data.length);
        if (data.length > 0) {
          console.log("First property:", data[0]);
        } else {
          console.log("No properties found in the response");
        }
      } catch (err: any) {
        console.error("Detailed error:", err);
        setError(err.message || "Error fetching properties");
        toast({
          title: "Error",
          description: err.message || "Failed to fetch properties",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleAddToFavorites = async (propertyId: number) => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("User not logged in");
      }
      const user = JSON.parse(userData);

      // Check if the property is already favorited
      const property = properties.find((p) => p.id === propertyId);
      const isFavorited = property?.isFavorited;

      const response = await fetch(
        `http://localhost:8082/api/users/${user.id}/favorites`,
        {
          method: isFavorited ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId,
          }),
        }
      );

      if (!response.ok)
        throw new Error(
          isFavorited
            ? "Failed to remove from favorites"
            : "Failed to add to favorites"
        );

      // Update the UI to reflect the new favorite status
      setProperties(
        properties.map((property) =>
          property.id === propertyId
            ? { ...property, isFavorited: !isFavorited }
            : property
        )
      );

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

  const handleStartChat = async (propertyId: number, landlordId: number) => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("User not logged in");
      }
      const user = JSON.parse(userData);

      const response = await fetch("http://localhost:8082/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          tenantId: user.id,
          landlordId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to start chat");
      }

      const chat = await response.json();

      // Navigate to the messages page with the new chat selected
      window.location.href = `/tenant/messages?chatId=${chat.id}`;

      toast({
        title: "Chat Started",
        description: "You can now message the landlord about this property.",
      });
    } catch (err: any) {
      console.error("Error starting chat:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to start chat",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Available Properties</h1>
        <p className="text-muted-foreground">
          Browse through our selection of available properties
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mb-4">Loading properties...</div>
            <div className="text-sm text-muted-foreground">
              Please wait while we fetch the latest properties
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500">
          <h3 className="font-semibold">Error Loading Properties</h3>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Please check the console for more details
          </p>
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No Properties Found</h3>
          <p className="text-muted-foreground">
            There are no properties available at the moment
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            (Received {properties.length} properties from the server)
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={{
                id: property.id,
                title: property.title,
                description: property.description,
                price: property.price,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                area: property.area,
                mainPhoto: property.mainPhoto,
                type: property.type,
                location: `${property.neighborhood}, ${property.city}`,
                furnished: property.furnished,
                availableFrom: property.availableFrom,
                isFavorited: property.isFavorited,
                bookingStatus: property.bookingStatus,
                landlordId: property.landlordId,
              }}
              onAddToFavorites={() => handleAddToFavorites(property.id)}
              onStartChat={() =>
                handleStartChat(property.id, property.landlordId)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
