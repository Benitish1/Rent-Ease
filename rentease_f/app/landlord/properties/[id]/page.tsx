import Link from "next/link"
import Image from "next/image"
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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LandlordLayout } from "@/components/landlord-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
    // Mock data for a single property
    const property = {
        id: params.id,
        title: "Luxury Villa with Pool",
        description:
            "This stunning luxury villa offers the perfect blend of modern design and comfort. Featuring a private pool, spacious living areas, and premium finishes throughout, it's an ideal home for those seeking a high-end living experience in Kigali's most prestigious neighborhood.",
        location: "Nyarutarama, Kigali",
        price: 2500,
        deposit: 5000,
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        images: [
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
        ],
        status: "occupied",
        type: "villa",
        yearBuilt: 2020,
        furnished: "fully",
        parking: 2,
        amenities: [
            { name: "WiFi", icon: Wifi },
            { name: "Parking", icon: Car },
            { name: "TV", icon: Tv },
            { name: "Kitchen", icon: Utensils },
            { name: "Air Conditioning", icon: Snowflake },
        ],
        tenants: [
            {
                name: "John Smith",
                image: "/placeholder.svg?height=100&width=100",
                email: "john.smith@example.com",
                phone: "+250 789 123 456",
                moveInDate: "2023-05-15",
                leaseEnd: "2024-05-15",
            },
            {
                name: "Lisa Smith",
                image: "/placeholder.svg?height=100&width=100",
                email: "lisa.smith@example.com",
                phone: "+250 789 123 457",
                moveInDate: "2023-05-15",
                leaseEnd: "2024-05-15",
            },
        ],
        financials: {
            monthlyRent: 2500,
            securityDeposit: 5000,
            maintenanceCosts: 250,
            propertyTax: 300,
            insurance: 150,
            utilities: 200,
            netIncome: 1600,
        },
        maintenanceHistory: [
            {
                date: "2023-02-10",
                issue: "Plumbing repair",
                cost: 350,
                status: "completed",
            },
            {
                date: "2022-11-15",
                issue: "HVAC maintenance",
                cost: 200,
                status: "completed",
            },
        ],
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "occupied":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Occupied
                    </Badge>
                )
            case "vacant":
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                        <XCircle className="mr-1 h-3 w-3" />
                        Vacant
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date)
    }

    return (
        <LandlordLayout>
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
                                <h1 className="text-2xl font-bold tracking-tight">{property.title}</h1>
                                {getStatusBadge(property.status)}
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{property.location}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
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
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Built in {property.yearBuilt}</p>
                                </div>
                            </div>
                        </div>

                        <Tabs defaultValue="details">
                            <TabsList className="mb-6 grid w-full grid-cols-4">
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="tenants">Tenants</TabsTrigger>
                                <TabsTrigger value="financials">Financials</TabsTrigger>
                                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold">About this property</h2>
                                    <p className="mt-2 text-muted-foreground">{property.description}</p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold">Amenities</h3>
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
                            <TabsContent value="tenants" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold">Current Tenants</h2>
                                    <div className="mt-4 space-y-4">
                                        {property.tenants.map((tenant, index) => (
                                            <div key={index} className="rounded-lg border p-4">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={tenant.image || "/placeholder.svg"} alt={tenant.name} />
                                                        <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-semibold">{tenant.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{tenant.email}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Phone</p>
                                                        <p>{tenant.phone}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Move-in Date</p>
                                                        <p>{formatDate(tenant.moveInDate)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Lease End Date</p>
                                                        <p>{formatDate(tenant.leaseEnd)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Lease Duration</p>
                                                        <p>12 months</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Button variant="outline" size="sm">
                                                        View Tenant Details
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="financials" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold">Financial Overview</h2>
                                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium">Monthly Rent</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">${property.financials.monthlyRent}</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium">Security Deposit</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">${property.financials.securityDeposit}</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium">Net Monthly Income</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">${property.financials.netIncome}</div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="mt-6 rounded-lg border p-6">
                                        <h3 className="mb-4 text-lg font-semibold">Monthly Expenses</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span>Maintenance</span>
                                                <span className="font-medium">${property.financials.maintenanceCosts}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Property Tax</span>
                                                <span className="font-medium">${property.financials.propertyTax}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Insurance</span>
                                                <span className="font-medium">${property.financials.insurance}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Utilities</span>
                                                <span className="font-medium">${property.financials.utilities}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between font-semibold">
                                                <span>Total Expenses</span>
                                                <span>
                          $
                                                    {property.financials.maintenanceCosts +
                                                        property.financials.propertyTax +
                                                        property.financials.insurance +
                                                        property.financials.utilities}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="maintenance" className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">Maintenance History</h2>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Maintenance Record
                                        </Button>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        {property.maintenanceHistory.map((record, index) => (
                                            <div key={index} className="rounded-lg border p-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">{record.issue}</h3>
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                                        {record.status}
                                                    </Badge>
                                                </div>
                                                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Date</p>
                                                        <p>{formatDate(record.date)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Cost</p>
                                                        <p>${record.cost}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
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
                                    <h3 className="font-semibold mb-2">Property Status</h3>
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(property.status)}
                                        <span className="text-sm text-muted-foreground">
                      {property.status === "occupied" ? "Currently rented" : "Available for rent"}
                    </span>
                                    </div>

                                    {property.status === "occupied" && (
                                        <div className="mt-4">
                                            <p className="text-sm text-muted-foreground mb-1">Lease ends in</p>
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span>May 15, 2023</span>
                                                <span>May 15, 2024</span>
                                            </div>
                                            <Progress value={33} className="h-2" />
                                            <p className="text-xs text-muted-foreground mt-2 text-center">8 months remaining</p>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-lg border p-4">
                                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                                    <div className="space-y-2">
                                        <Button className="w-full" asChild>
                                            <Link href={`/landlord/properties/${property.id}/tenants`}>
                                                <Users className="mr-2 h-4 w-4" />
                                                Manage Tenants
                                            </Link>
                                        </Button>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/landlord/properties/${property.id}/maintenance`}>Schedule Maintenance</Link>
                                        </Button>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/landlord/properties/${property.id}/documents`}>View Documents</Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <h3 className="font-semibold mb-2">Property Performance</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Occupancy Rate</span>
                                            <span className="font-medium">92%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Avg. Days Vacant</span>
                                            <span className="font-medium">12 days</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Annual Return</span>
                                            <span className="font-medium">8.4%</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LandlordLayout>
    )
}
