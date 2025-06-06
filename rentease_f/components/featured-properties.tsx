import { PropertyCard } from "@/components/property-card";

export function FeaturedProperties() {
  // Mock data for featured properties
  const properties = [
    {
      id: "prop1",
      title: "Modern Apartment with City View",
      location: "Kigali Heights, Kigali",
      price: 1200,
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
      rating: 4.8,
      isFeatured: true,
    },
    {
      id: "prop2",
      title: "Luxury Villa with Pool",
      location: "Nyarutarama, Kigali",
      price: 2500,
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
      rating: 4.9,
      isFeatured: true,
    },
    {
      id: "prop3",
      title: "Cozy Studio in City Center",
      location: "Kimihurura, Kigali",
      price: 800,
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070",
      rating: 4.6,
      isNew: true,
    },
    {
      id: "prop4",
      title: "Family Home with Garden",
      location: "Kibagabaga, Kigali",
      price: 1800,
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070",
      rating: 4.7,
    },
    {
      id: "prop5",
      title: "Penthouse with Panoramic Views",
      location: "Kacyiru, Kigali",
      price: 3000,
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
      rating: 5.0,
      isFeatured: true,
    },
    {
      id: "prop6",
      title: "Modern Townhouse",
      location: "Gisozi, Kigali",
      price: 1500,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 140,
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070",
      rating: 4.5,
      isNew: true,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={{
            id: Number(property.id.replace("prop", "")),
            title: property.title,
            description: "A beautiful property in a great location",
            price: property.price,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area: property.area,
            mainPhoto: property.image,
            type: "apartment",
            location: property.location,
            furnished: "furnished",
            availableFrom: new Date().toISOString(),
            isFavorited: false,
          }}
        />
      ))}
    </div>
  );
}
