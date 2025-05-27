"use client";

import { useRouter } from "next/navigation";
import { PropertyForm } from "@/components/property-form";

export default function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  // Mock data for a single property - in a real app, this would come from an API
  const property = {
    id: params.id,
    title: "Luxury Villa with Pool",
    description:
      "This stunning luxury villa offers the perfect blend of modern design and comfort. Featuring a private pool, spacious living areas, and premium finishes throughout, it's an ideal home for those seeking a high-end living experience in Kigali's most prestigious neighborhood.",
    location: "Nyarutarama, Kigali",
    price: "2500",
    bedrooms: "4",
    bathrooms: "3",
    area: "220",
    image: "/placeholder.svg?height=600&width=800",
  };

  const handleSubmit = async (data: any) => {
    // In a real app, this would make an API call to update the property
    console.log("Updating property:", data);
    // After successful update, redirect to properties page
    router.push("/properties");
  };

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
