"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  CreditCard,
  Heart,
  Home,
  MessageSquare,
  Settings,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { PropertyCard } from "@/components/property-card";

export default function TenantDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [availableProperties, setAvailableProperties] = useState<any[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [propertiesError, setPropertiesError] = useState<string | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:8082/api/properties/available"
        );
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setAvailableProperties(data);
      } catch (err: any) {
        setPropertiesError(err.message || "Error fetching properties");
      } finally {
        setLoadingProperties(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {currentUser?.lastName || "User"}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your rentals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200</div>
            <p className="text-xs text-muted-foreground">Due in 5 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Saved Properties
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 from landlords</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Current Rentals</CardTitle>
            <CardDescription>Your active rental properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Apartment"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    Modern Apartment in Kigali Heights
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Kigali Heights, Kigali
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Active
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Lease ends in 8 months
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Studio"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Cozy Studio in City Center</h3>
                  <p className="text-sm text-muted-foreground">
                    Kimihurura, Kigali
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Active
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Lease ends in 3 months
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/tenant/properties" className="w-full">
              <Button variant="outline" className="w-full">
                View All Properties
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Available Properties</CardTitle>
            <CardDescription>
              Browse all available properties from all landlords
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingProperties ? (
              <div>Loading properties...</div>
            ) : propertiesError ? (
              <div className="text-red-500">{propertiesError}</div>
            ) : availableProperties.length === 0 ? (
              <div>No properties available.</div>
            ) : (
              <div className="grid gap-4">
                {availableProperties.slice(0, 3).map((property) => (
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
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/tenant/properties" className="w-full">
              <Button variant="outline" className="w-full">
                View All Properties
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Your latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Rent payment reminder</p>
                  <p className="text-sm text-muted-foreground">
                    Your rent payment for Kigali Heights is due in 5 days.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">New message from landlord</p>
                  <p className="text-sm text-muted-foreground">
                    Michael Chen sent you a message about your maintenance
                    request.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    5 hours ago
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Maintenance scheduled</p>
                  <p className="text-sm text-muted-foreground">
                    Your maintenance request has been scheduled for tomorrow at
                    10 AM.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    1 day ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favorite Properties</CardTitle>
            <CardDescription>Properties you've saved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-md">
                  <Image
                    src="/placeholder.svg?height=56&width=56"
                    alt="Luxury Villa"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Luxury Villa with Pool</h3>
                  <p className="text-sm text-muted-foreground">
                    Nyarutarama, Kigali
                  </p>
                  <p className="text-sm font-semibold">$2,500/month</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-md">
                  <Image
                    src="/placeholder.svg?height=56&width=56"
                    alt="Penthouse"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">
                    Penthouse with Panoramic Views
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Kacyiru, Kigali
                  </p>
                  <p className="text-sm font-semibold">$3,000/month</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-md">
                  <Image
                    src="/placeholder.svg?height=56&width=56"
                    alt="Modern Townhouse"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Modern Townhouse</h3>
                  <p className="text-sm text-muted-foreground">
                    Gisozi, Kigali
                  </p>
                  <p className="text-sm font-semibold">$1,500/month</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Favorites
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lease Status</CardTitle>
            <CardDescription>Your current lease information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Kigali Heights Apartment
                  </span>
                  <span className="text-sm text-muted-foreground">
                    8 months left
                  </span>
                </div>
                <Progress value={33} className="h-2" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    City Center Studio
                  </span>
                  <span className="text-sm text-muted-foreground">
                    3 months left
                  </span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
