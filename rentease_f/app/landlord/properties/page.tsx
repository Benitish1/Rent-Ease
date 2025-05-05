'use client'

import Link from "next/link"
import Image from "next/image"
import {
    Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye,
    CheckCircle, XCircle, Home, Building, Building2, Hotel,
} from "lucide-react"
import { useEffect, useState } from "react"
import { fetchProperties } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import { LandlordLayout } from "@/components/landlord-layout"

type Property = {
    id: string
    title: string
    location: string
    price: number
    bedrooms: number
    bathrooms: number
    area: number
    image: string
    status: "occupied" | "vacant" | "maintenance" | string
    type: string
    tenants: number
    leaseEnd: string | null
}

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([])

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const fetched = await fetchProperties()
                console.log("Fetched properties:", fetched)
                if (Array.isArray(fetched)) {
                    setProperties(fetched)
                }
            } catch (err) {
                console.error("Error loading properties:", err)
            }
        }
        loadProperties()
    }, [])

    return (
        <LandlordLayout>
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
                        <Input type="text" placeholder="Search properties..." className="pl-9" />
                    </div>
                    <Button variant="outline" className="sm:w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>

                <Tabs defaultValue="all" className="mb-6">
                    <TabsList>
                        <TabsTrigger value="all">All Properties ({properties.length})</TabsTrigger>
                        <TabsTrigger value="occupied">Occupied ({properties.filter(p => p.status === 'occupied').length})</TabsTrigger>
                        <TabsTrigger value="vacant">Vacant ({properties.filter(p => p.status === 'vacant').length})</TabsTrigger>
                        <TabsTrigger value="maintenance">Maintenance ({properties.filter(p => p.status === 'maintenance').length})</TabsTrigger>
                    </TabsList>

                    {["all", "occupied", "vacant", "maintenance"].map(tab => (
                        <TabsContent key={tab} value={tab} className="mt-6">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {properties
                                    .filter(p => tab === "all" || p.status === tab)
                                    .map(property => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))}
                            </div>
                            {tab === "maintenance" && properties.filter(p => p.status === "maintenance").length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="rounded-full bg-muted p-6 mb-4">
                                        <Home className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">No properties under maintenance</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Properties that require maintenance or repairs will appear here.
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </LandlordLayout>
    )
}

function PropertyCard({ property }: { property: Property }) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date)
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "occupied":
                return <Badge variant="outline" className="bg-green-50 text-green-700"><CheckCircle className="mr-1 h-3 w-3" />Occupied</Badge>
            case "vacant":
                return <Badge variant="outline" className="bg-amber-50 text-amber-700"><XCircle className="mr-1 h-3 w-3" />Vacant</Badge>
            case "maintenance":
                return <Badge variant="outline" className="bg-blue-50 text-blue-700">Maintenance</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getPropertyTypeIcon = (type: string) => {
        switch (type) {
            case "house": return <Home className="h-4 w-4" />
            case "apartment": return <Building className="h-4 w-4" />
            case "villa": return <Building2 className="h-4 w-4" />
            case "penthouse": return <Hotel className="h-4 w-4" />
            default: return <Home className="h-4 w-4" />
        }
    }

    return (
        <Card className="overflow-hidden">
            <div className="relative aspect-video">
                <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">{getStatusBadge(property.status)}</div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm hover:bg-white/90">
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
                        <DropdownMenuItem className="text-destructive">
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
                <p className="text-sm text-muted-foreground line-clamp-1">{property.location}</p>
                <div className="mt-2 flex items-center justify-between">
                    <p className="font-medium">${property.price?.toLocaleString() || "N/A"}/mo</p>
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
                        <span className="text-muted-foreground">Tenants:</span>{" "}
                        <span className="font-medium">{property.tenants || 0}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Lease ends:</span>{" "}
                        <span className="font-medium">{formatDate(property.leaseEnd)}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
