import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Bath,
  Bed,
  Calendar,
  Check,
  Heart,
  MapPin,
  Share,
  Square,
  Star,
  Wifi,
  Car,
  Tv,
  Utensils,
  Snowflake,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { PropertyCard } from "@/components/property-card"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  // Mock data for a single property
  const property = {
    id: params.id,
    title: "Luxury Villa with Pool",
    description:
      "This stunning luxury villa offers the perfect blend of modern design and comfort. Featuring a private pool, spacious living areas, and premium finishes throughout, it's an ideal home for those seeking a high-end living experience in Kigali's most prestigious neighborhood.",
    location: "Nyarutarama, Kigali",
    price: 2500,
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    rating: 4.9,
    reviews: 24,
    features: [
      "Private pool",
      "Garden",
      "Parking",
      "Security system",
      "High-speed internet",
      "Air conditioning",
      "Modern kitchen",
      "Laundry room",
    ],
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Parking", icon: Car },
      { name: "TV", icon: Tv },
      { name: "Kitchen", icon: Utensils },
      { name: "Air Conditioning", icon: Snowflake },
    ],
    landlord: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=100&width=100",
      responseRate: 98,
      responseTime: "within an hour",
      joined: "January 2020",
    },
  }

  // Mock data for similar properties
  const similarProperties = [
    {
      id: "prop5",
      title: "Penthouse with Panoramic Views",
      location: "Kacyiru, Kigali",
      price: 3000,
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      isNew: true,
    },
    {
      id: "prop7",
      title: "Charming Cottage",
      location: "Remera, Kigali",
      price: 950,
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.3,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/properties">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to properties
            </Link>
          </Button>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
              <div className="mt-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-muted-foreground">({property.reviews} reviews)</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative col-span-1 row-span-2 aspect-[3/2] overflow-hidden rounded-lg md:col-span-2 lg:col-span-2">
            <Image src={property.images[0] || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative aspect-[3/2] overflow-hidden rounded-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${property.title} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            <div className="mb-8 flex flex-wrap gap-4 rounded-lg border p-6">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{property.bedrooms} Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{property.bathrooms} Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{property.area} m²</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">About this property</h2>
                  <p className="mt-2 text-muted-foreground">{property.description}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Features</h3>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="amenities" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Amenities</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 rounded-lg border p-4">
                        <amenity.icon className="h-6 w-6 text-primary" />
                        <span className="font-medium">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-muted-foreground">({property.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Mock reviews */}
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src="/placeholder.svg?height=100&width=100"
                            alt="Reviewer"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">March 2023</p>
                        </div>
                      </div>
                      <div className="mb-2 flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        Amazing property! The location is perfect and the amenities are top-notch. The host was very
                        responsive and helpful.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src="/placeholder.svg?height=100&width=100"
                            alt="Reviewer"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-sm text-muted-foreground">February 2023</p>
                        </div>
                      </div>
                      <div className="mb-2 flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        Beautiful villa with great views. The pool was perfect and the interior is very well designed.
                        Would definitely stay here again!
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Load more reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold">Similar Properties</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similarProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold">${property.price.toLocaleString()}</span>
                  <span className="text-sm font-normal text-muted-foreground">per month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={property.landlord.image || "/placeholder.svg"}
                        alt={property.landlord.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{property.landlord.name}</p>
                      <p className="text-sm text-muted-foreground">Joined in {property.landlord.joined}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Response rate:</span>
                      <span className="font-medium">{property.landlord.responseRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response time:</span>
                      <span className="font-medium">{property.landlord.responseTime}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Contact Landlord
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Move-in date"
                        className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    <div className="relative">
                      <select className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="">Lease duration</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg border p-4">
                    <div className="flex justify-between">
                      <span>Monthly rent</span>
                      <span className="font-medium">${property.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security deposit</span>
                      <span className="font-medium">${(property.price * 2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span className="font-medium">${(property.price * 0.1).toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total due at signing</span>
                      <span>${(property.price * 3.1).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full">Book Viewing</Button>
                  <Button variant="outline" className="w-full">
                    Apply Now
                  </Button>
                </div>

                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Verified
                    </Badge>
                    This property has been verified by RentEase
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
