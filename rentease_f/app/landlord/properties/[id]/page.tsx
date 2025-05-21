"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  CheckCircle,
  XCircle,
  Wifi,
  Car,
  Tv,
  Utensils,
  Snowflake,
  Users,
  Plus,
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  Shield,
  Home,
  Building,
  Building2,
  Hotel,
  Phone,
  Mail,
  Globe,
  Star,
  School,
  ShoppingBag,
  Bus,
  Train,
  Coffee,
  Hospital,
  AlertCircle,
  Info,
  Video,
  CalendarDays,
  Key,
  Users2,
  Ban,
  PartyPopper,
  Droplet,
  Zap,
  Flame,
  WifiOff,
  Tv2,
  ParkingCircle,
  Elevator,
  Dumbbell,
  Pool,
  Washer,
  Dryer,
  Download,
  Store,
  BuildingIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProperty } from "../../../../lib/api.js";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const propertyId = parseInt(params.id as string);
        if (isNaN(propertyId)) {
          throw new Error("Invalid property ID");
        }
        const data = await fetchProperty(propertyId);
        setProperty(data);
      } catch (err) {
        console.error("Error loading property:", err);
        toast({
          title: "Error",
          description: "Failed to load property details",
          variant: "destructive",
        });
      }
    };

    loadProperty();
  }, [params.id, toast]);

  const handleExportPDF = async () => {
    try {
      toast({
        title: "Exporting PDF",
        description: "Please wait while we generate your PDF...",
      });

      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("property-content");

      if (!element) {
        throw new Error("Could not find content to export");
      }

      const options = {
        filename: `${property.title}-details.pdf`,
        margin: 10,
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          windowWidth: element.offsetWidth,
          windowHeight: element.offsetHeight,
        },
      };

      const worker = html2pdf().from(element).set(options);

      await worker.save();

      toast({
        title: "Success",
        description: "Property details exported to PDF successfully",
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!property) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center">
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Available
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            <XCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "RENTED":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Rented
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Rejected
          </Badge>
        );
      case "INACTIVE":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/landlord/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to properties
          </Link>
        </Button>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {property.title}
              </h1>
              {getStatusBadge(property.status)}
            </div>
            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {property.address}, {property.city}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" />
              Export to PDF
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/landlord/properties/${property.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Property
              </Link>
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div id="property-content" style={{ width: "100%", maxWidth: "100%" }}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative col-span-1 row-span-2 aspect-[3/2] overflow-hidden rounded-lg md:col-span-2 lg:col-span-2">
              <Image
                src={property.mainPhoto || "/placeholder.svg"}
                alt={property.title || "Property"}
                fill
                className="object-cover"
              />
            </div>
            {(property.additionalPhotos || [])
              .slice(0, 4)
              .map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/2] overflow-hidden rounded-lg"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${property.title || "Property"} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <div>
              <div className="page-break-after mb-8 flex flex-wrap gap-4 rounded-lg border p-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{property.bedrooms} Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {property.bathrooms} Bathrooms
                    </p>
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
                <TabsList className="mb-6 grid w-full grid-cols-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="tenants">Tenants</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="rules">Rules</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="utilities">Utilities</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      About this property
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {property.description}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Location</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Neighborhood
                        </p>
                        <p className="font-medium">{property.neighborhood}</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          District
                        </p>
                        <p className="font-medium">{property.district}</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">City</p>
                        <p className="font-medium">{property.city}</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{property.address}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">
                      Property Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Property Type
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          {property.type === "house" && (
                            <Home className="h-5 w-5 text-muted-foreground" />
                          )}
                          {property.type === "apartment" && (
                            <Building className="h-5 w-5 text-muted-foreground" />
                          )}
                          {property.type === "villa" && (
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          )}
                          {property.type === "penthouse" && (
                            <Hotel className="h-5 w-5 text-muted-foreground" />
                          )}
                          <p className="font-medium capitalize">
                            {property.type}
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Year Built
                        </p>
                        <p className="font-medium">
                          {property.yearBuilt || "N/A"}
                        </p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Furnished Status
                        </p>
                        <p className="font-medium capitalize">
                          {property.furnished || "N/A"}
                        </p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Parking Spaces
                        </p>
                        <p className="font-medium">
                          {property.parkingSpaces || "0"}
                        </p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Minimum Lease
                        </p>
                        <p className="font-medium">
                          {property.minLeaseMonths || "0"} months
                        </p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Available From
                        </p>
                        <p className="font-medium">
                          {property.availableFrom
                            ? formatDate(property.availableFrom)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {(property.amenities || []).map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 rounded-lg border p-3"
                        >
                          {amenity === "wifi" && (
                            <Wifi className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "parking" && (
                            <ParkingCircle className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "tv" && (
                            <Tv2 className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "kitchen" && (
                            <Utensils className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "ac" && (
                            <Snowflake className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "security" && (
                            <Shield className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "elevator" && (
                            <Elevator className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "gym" && (
                            <Dumbbell className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "pool" && (
                            <Pool className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "washer" && (
                            <Washer className="h-5 w-5 text-muted-foreground" />
                          )}
                          {amenity === "dryer" && (
                            <Dryer className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tenants" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Current Tenants</h2>
                    <div className="mt-4 space-y-4">
                      {(property.tenants || []).map((tenant, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={tenant.image || "/placeholder.svg"}
                                alt={tenant.name || "Tenant"}
                              />
                              <AvatarFallback>
                                {(tenant.name || "T")[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">
                                {tenant.name || "Unknown Tenant"}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {tenant.email || "No email provided"}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Phone
                              </p>
                              <p>{tenant.phone || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Move-in Date
                              </p>
                              <p>
                                {tenant.moveInDate
                                  ? formatDate(tenant.moveInDate)
                                  : "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Lease End Date
                              </p>
                              <p>
                                {tenant.leaseEnd
                                  ? formatDate(tenant.leaseEnd)
                                  : "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Lease Duration
                              </p>
                              <p>{tenant.leaseDuration || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="financials" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Financial Overview
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Monthly Rent
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            ${property.price?.toLocaleString() || "0"}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Security Deposit
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            ${property.securityDeposit?.toLocaleString() || "0"}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Net Monthly Income
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            ${property.netIncome?.toLocaleString() || "0"}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6 rounded-lg border p-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Monthly Expenses
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Maintenance</span>
                          <span className="font-medium">
                            $
                            {property.maintenanceCosts?.toLocaleString() || "0"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Property Tax</span>
                          <span className="font-medium">
                            ${property.propertyTax?.toLocaleString() || "0"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Insurance</span>
                          <span className="font-medium">
                            ${property.insurance?.toLocaleString() || "0"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Utilities</span>
                          <span className="font-medium">
                            ${property.utilities?.toLocaleString() || "0"}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-semibold">
                          <span>Total Expenses</span>
                          <span>
                            $
                            {(
                              (property.maintenanceCosts || 0) +
                              (property.propertyTax || 0) +
                              (property.insurance || 0) +
                              (property.utilities || 0)
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg border p-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Property Performance
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                ROI
                              </p>
                              <p className="text-2xl font-bold">8.4%</p>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Avg. Days Vacant
                              </p>
                              <p className="text-2xl font-bold">12</p>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Monthly Profit
                              </p>
                              <p className="text-2xl font-bold">
                                $
                                {(
                                  (property.price || 0) -
                                  ((property.maintenanceCosts || 0) +
                                    (property.propertyTax || 0) +
                                    (property.insurance || 0) +
                                    (property.utilities || 0))
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="maintenance" className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        Maintenance History
                      </h2>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Maintenance Record
                      </Button>
                    </div>
                    <div className="mt-4 space-y-4">
                      {(property.maintenanceHistory || []).map(
                        (record, index) => (
                          <div key={index} className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">
                                {record.issue || "Unknown Issue"}
                              </h3>
                              <Badge
                                variant="outline"
                                className={
                                  record.status === "completed"
                                    ? "bg-green-50 text-green-700"
                                    : record.status === "in_progress"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-amber-50 text-amber-700"
                                }
                              >
                                {record.status === "completed"
                                  ? "Completed"
                                  : record.status === "in_progress"
                                  ? "In Progress"
                                  : "Pending"}
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              {record.description}
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Reported Date
                                </p>
                                <p>
                                  {record.reportedDate
                                    ? formatDate(record.reportedDate)
                                    : "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Completion Date
                                </p>
                                <p>
                                  {record.completionDate
                                    ? formatDate(record.completionDate)
                                    : "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Cost
                                </p>
                                <p>${record.cost?.toLocaleString() || "0"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Contractor
                                </p>
                                <p>{record.contractor || "N/A"}</p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
