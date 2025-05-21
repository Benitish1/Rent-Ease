"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Home,
  Building,
  Building2,
  Hotel,
} from "lucide-react";
import { useEffect, useState } from "react";
import { deleteProperty, fetchProperties, Property } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const propertiesPerPage = 9;
  const { toast } = useToast();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const fetched = await fetchProperties();
      console.log("Fetched properties:", fetched);
      if (Array.isArray(fetched)) {
        setProperties(fetched);
      }
    } catch (err) {
      console.error("Error loading properties:", err);
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return;

    try {
      // Hardcode landlordId to 8 for now
      await deleteProperty(propertyToDelete.id, 8);
      setProperties(properties.filter((p) => p.id !== propertyToDelete.id));
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting property:", err);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    } finally {
      setPropertyToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground">Manage your rental properties</p>
        </div>
        <Button asChild>
          <Link href="/landlord/properties/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search properties..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="sm:w-auto"
          onClick={() => setCurrentPage(1)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">
            All Properties ({properties.length})
          </TabsTrigger>
          <TabsTrigger value="APPROVED">
            Available (
            {properties.filter((p) => p.status === "APPROVED").length})
          </TabsTrigger>
          <TabsTrigger value="PENDING">
            Pending ({properties.filter((p) => p.status === "PENDING").length})
          </TabsTrigger>
          <TabsTrigger value="RENTED">
            Rented ({properties.filter((p) => p.status === "RENTED").length})
          </TabsTrigger>
        </TabsList>

        {["all", "APPROVED", "PENDING", "RENTED"].map((tab) => {
          const filteredProperties = properties
            .filter((p) => tab === "all" || p.status === tab)
            .filter(
              (p) =>
                searchQuery === "" ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
          const totalPages = Math.ceil(
            filteredProperties.length / propertiesPerPage
          );
          const startIndex = (currentPage - 1) * propertiesPerPage;
          const paginatedProperties = filteredProperties.slice(
            startIndex,
            startIndex + propertiesPerPage
          );

          return (
            <TabsContent key={tab} value={tab} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onDelete={() => setPropertyToDelete(property)}
                  />
                ))}
              </div>
              {tab === "RENTED" &&
                properties.filter((p) => p.status === "RENTED").length ===
                  0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <Home className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      No rented properties
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      Properties that are currently rented will appear here.
                    </p>
                  </div>
                )}
              {filteredProperties.length > 0 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <AlertDialog
        open={!!propertyToDelete}
        onOpenChange={() => setPropertyToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function PropertyCard({
  property,
  onDelete,
}: {
  property: Property;
  onDelete: () => void;
}) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

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

  const getPropertyTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "house":
        return <Home className="h-4 w-4" />;
      case "apartment":
        return <Building className="h-4 w-4" />;
      case "villa":
        return <Building2 className="h-4 w-4" />;
      case "penthouse":
        return <Hotel className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={property.mainPhoto || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge(property.status)}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm hover:bg-white/90"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/landlord/properties/${property.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/landlord/properties/${property.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" /> Edit Property
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Property
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
          {getPropertyTypeIcon(property.type)}
          <span className="capitalize">{property.type}</span>
        </div>
        <h3 className="font-semibold line-clamp-1">{property.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {property.address}, {property.city}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium">
            ${property.price?.toLocaleString() || "N/A"}/mo
          </p>
          <div className="flex items-center gap-1 text-sm">
            <span>{property.bedrooms} bd</span>
            <span className="mx-1">•</span>
            <span>{property.bathrooms} ba</span>
            <span className="mx-1">•</span>
            <span>{property.area} m²</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Location:</span>{" "}
            <span className="font-medium">{property.neighborhood}</span>
          </div>
          <div>
            <span className="text-muted-foreground">District:</span>{" "}
            <span className="font-medium">{property.district}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
