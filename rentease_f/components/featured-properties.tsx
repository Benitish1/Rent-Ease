import { PropertyCard } from "@/components/property-card"

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
      image: "/properties/modern-apartment.png",
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
      image: "/properties/luxury-villa.png",
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
      image: "/properties/cozy-studio.png",
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
      image: "/properties/family-home.png",
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
      image: "/properties/penthouse.png",
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
      image: "/properties/townhouse.png",
      rating: 4.5,
      isNew: true,
    },
  ]

  return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
        ))}
      </div>
  )
}
