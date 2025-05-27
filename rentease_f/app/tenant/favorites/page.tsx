"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/property-card";
import { useToast } from "@/components/ui/use-toast";

export default function FavoritesPage() {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          throw new Error("User not logged in");
        }
        const user = JSON.parse(userData);

        const response = await fetch(
          `http://localhost:8082/api/users/${user.id}/favorites`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        setFavorites(data.map((f: any) => f.property));
      } catch (err: any) {
        console.error("Error fetching favorites:", err);
        setError(err.message || "Failed to fetch favorites");
        toast({
          title: "Error",
          description: err.message || "Failed to fetch favorites",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [toast]);

  const handleRemoveFromFavorites = async (propertyId: number) => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("User not logged in");
      }
      const user = JSON.parse(userData);

      const response = await fetch(
        `http://localhost:8082/api/users/${user.id}/favorites`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }

      setFavorites(favorites.filter((f) => f.id !== propertyId));
      toast({
        title: "Success",
        description: "Property removed from favorites",
      });
    } catch (err: any) {
      console.error("Error removing from favorites:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to remove from favorites",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Favorite Properties</h1>
        <p className="text-muted-foreground">
          View and manage your favorite properties
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mb-4">Loading favorites...</div>
            <div className="text-sm text-muted-foreground">
              Please wait while we fetch your favorite properties
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500">
          <h3 className="font-semibold">Error Loading Favorites</h3>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Please check the console for more details
          </p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No Favorites Yet</h3>
          <p className="text-muted-foreground">
            You haven't added any properties to your favorites
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property) => (
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
                isFavorited: true,
                bookingStatus: property.bookingStatus,
              }}
              onAddToFavorites={() => handleRemoveFromFavorites(property.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
