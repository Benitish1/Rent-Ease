"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { PropertyForm } from "@/components/property-form";

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  image: string;
  type?: string;
  address?: string;
  district?: string;
  yearBuilt?: number;
  parkingSpaces?: number;
  furnished?: string;
  amenities?: string[];
  videoUrl?: string;
  deposit?: number;
  availableFrom?: string;
  minLeaseMonths?: number;
  utilitiesIncluded?: string[];
  pets?: string;
  smoking?: string;
  events?: string;
  maxOccupants?: number;
  landlordId?: number;
}

export default function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:8082/api/properties/${resolvedParams.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }
        const data = await response.json();
        console.log("Fetched property data:", data); // Debug log
        setProperty({
          id: data.id,
          title: data.title,
          description: data.description,
          location: `${data.neighborhood}, ${data.city}`,
          price: data.price.toString(),
          bedrooms: data.bedrooms.toString(),
          bathrooms: data.bathrooms.toString(),
          area: data.area.toString(),
          image: data.mainPhoto || "/placeholder.svg",
          type: data.type,
          address: data.address,
          district: data.district,
          yearBuilt: data.yearBuilt,
          parkingSpaces: data.parkingSpaces,
          furnished: data.furnished,
          amenities: data.amenities,
          videoUrl: data.videoUrl,
          deposit: data.deposit,
          availableFrom: data.availableFrom,
          minLeaseMonths: data.minLeaseMonths,
          utilitiesIncluded: data.utilitiesIncluded,
          pets: data.pets,
          smoking: data.smoking,
          events: data.events,
          maxOccupants: data.maxOccupants,
          landlordId: data.landlordId,
        });
      } catch (err) {
        console.error("Error fetching property:", err); // Debug log
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [resolvedParams.id]);

  const handleSubmit = async (data: any) => {
    try {
      if (!property?.landlordId) {
        throw new Error("Landlord ID not found");
      }

      // Safely handle location data
      let neighborhood = "";
      let city = "";

      if (data.location && typeof data.location === "string") {
        const locationParts = data.location.split(",");
        if (locationParts.length >= 2) {
          neighborhood = locationParts[0].trim();
          city = locationParts[1].trim();
        } else {
          // If location doesn't have both parts, use the whole string as neighborhood
          neighborhood = data.location.trim();
          city = ""; // Set a default city or leave empty
        }
      }

      // Format the date properly
      const availableFrom = data.availableFrom
        ? new Date(data.availableFrom).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const propertyData = {
        title: data.title,
        description: data.description,
        type: data.type || "house", // Default to house if not specified
        address: data.address || "",
        neighborhood: neighborhood,
        city: city,
        district: data.district || "",
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseFloat(data.bathrooms),
        area: parseFloat(data.area),
        yearBuilt: data.yearBuilt || 2024,
        parkingSpaces: data.parkingSpaces || 0,
        furnished: data.furnished || "unfurnished",
        amenities: data.amenities || [],
        videoUrl: data.videoUrl || "",
        price: parseFloat(data.price),
        deposit: data.deposit || 0,
        availableFrom: availableFrom,
        minLeaseMonths: data.minLeaseMonths || 12,
        utilitiesIncluded: data.utilitiesIncluded || [],
        pets: data.pets || "not allowed",
        smoking: data.smoking || "not allowed",
        events: data.events || "not allowed",
        maxOccupants: data.maxOccupants || 1,
      };

      console.log("Sending update with data:", propertyData); // Debug log

      const formData = new FormData();
      formData.append(
        "property",
        new Blob([JSON.stringify(propertyData)], {
          type: "application/json",
        })
      );

      // First, try to update the property
      const updateResponse = await fetch(
        `http://localhost:8082/api/properties/${resolvedParams.id}?landlordId=${property.landlordId}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log("Update response status:", updateResponse.status); // Debug log

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.error("Update error response:", errorData); // Debug log
        throw new Error(errorData.message || "Failed to update property");
      }

      const responseData = await updateResponse.json();
      console.log("Update successful, response:", responseData); // Debug log

      // After successful update, fetch the updated property to verify
      const verifyResponse = await fetch(
        `http://localhost:8082/api/properties/${resolvedParams.id}`
      );

      if (!verifyResponse.ok) {
        throw new Error("Failed to verify property update");
      }

      const updatedProperty = await verifyResponse.json();
      console.log("Verified updated property:", updatedProperty); // Debug log

      // Wait a moment before redirecting to ensure the update is processed
      setTimeout(() => {
        router.push("/landlord/properties");
        // Force a refresh of the properties page
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error("Error in handleSubmit:", err); // Debug log
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container py-8 text-red-500">Error: {error}</div>;
  }

  if (!property) {
    return <div className="container py-8">Property not found</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Edit Property</h1>
      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        submitLabel="Update Property"
      />
    </div>
  );
}
