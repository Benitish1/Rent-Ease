import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Star, Bed, Bath, Square } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  rating: number
  isFeatured?: boolean
  isNew?: boolean
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  rating,
  isFeatured,
  isNew,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[4/3]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {isFeatured && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          {isNew && (
            <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
              New
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 text-rose-500 backdrop-blur-sm hover:bg-white/90 hover:text-rose-600"
        >
          <Heart className="h-5 w-5" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold line-clamp-1">{title}</h3>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span>
              {bedrooms} {bedrooms === 1 ? "bed" : "beds"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span>
              {bathrooms} {bathrooms === 1 ? "bath" : "baths"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span>{area} m²</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div>
          <p className="text-lg font-semibold">${price.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">per month</p>
        </div>
        <Button asChild>
          <Link href={`/properties/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
