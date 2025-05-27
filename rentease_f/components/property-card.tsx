"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  MapPin,
  Star,
  Bed,
  Bath,
  Square,
  MoreVertical,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    mainPhoto: string;
    type: string;
    location: string;
    furnished: string;
    availableFrom: string;
    isFavorited?: boolean;
    bookingStatus?: "PENDING" | "APPROVED" | "CANCELLED" | null;
    landlordId: number;
  };
  onAddToFavorites?: () => void;
  onStartChat: () => void;
}

export function PropertyCard({
  property,
  onAddToFavorites,
  onStartChat,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getBookingStatusBadge = () => {
    if (!property.bookingStatus) return null;

    const statusConfig = {
      PENDING: {
        label: "Pending Booking",
        variant: "warning" as const,
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      APPROVED: {
        label: "Booked",
        variant: "success" as const,
        className: "bg-green-100 text-green-800 border-green-200",
      },
      CANCELLED: {
        label: "Cancelled",
        variant: "destructive" as const,
        className: "bg-red-100 text-red-800 border-red-200",
      },
    };

    const config = statusConfig[property.bookingStatus];
    if (!config) return null;

    return (
      <Badge variant={config.variant} className={`ml-2 ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={property.mainPhoto || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover"
        />
        {property.bookingStatus && (
          <div className="absolute top-2 right-2">
            {getBookingStatusBadge()}
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{property.title}</CardTitle>
            <CardDescription className="line-clamp-1">
              {property.location}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            {property.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Bedrooms</p>
            <p className="font-medium">{property.bedrooms}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Bathrooms</p>
            <p className="font-medium">{property.bathrooms}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Area</p>
            <p className="font-medium">{property.area}m²</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground">Description</p>
          <p className="line-clamp-2 text-sm">{property.description}</p>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground">Furnished</p>
          <p className="font-medium capitalize">{property.furnished}</p>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground">Available From</p>
          <p className="font-medium">
            {new Date(property.availableFrom).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Price per month</p>
            <p className="text-2xl font-bold">${property.price}</p>
          </div>
          <Button variant="outline" onClick={onAddToFavorites}>
            <Heart
              className={`mr-2 h-4 w-4 ${
                property.isFavorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {property.isFavorited ? "Favorited" : "Favorite"}
          </Button>
        </div>
        <div className="flex gap-2">
          <Link href={`/tenant/properties/${property.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Link href={`/tenant/properties/${property.id}`} className="flex-1">
            <Button className="w-full">Book Now</Button>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="outline" className="flex-1" onClick={onStartChat}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Landlord
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
