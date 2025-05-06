'use client'

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { LandlordLayout } from "@/components/landlord-layout"
import { Card, CardContent } from "@/components/ui/card"
import {createProperty} from "@/lib/property";

export default function AddPropertyPage() {
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: "",
        address: "",
        neighborhood: "",
        city: "",
        district: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        yearBuilt: "",
        parking: "",
        furnished: "",
        price: "",
        deposit: "",
        availableFrom: "",
        minLease: "",
        maxOccupants: "",
        video: "",
        amenities: {
            wifi: false,
            ac: false,
            heating: false,
            tv: false,
            kitchen: false,
            washer: false,
            dryer: false,
            pool: false,
            gym: false,
            parking: false,
            elevator: false,
            security: false
        },
        utilities: {
            water: false,
            electricity: false,
            gas: false,
            internet: false,
            cable: false
        },
        images: [] as File[] // Add this line for images
    })

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    // Handle select changes (for select inputs like type, furnished)
    const handleSelectChange = (key: keyof typeof formData) => (value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    // Handle checkbox changes (for amenities and utilities)
    const handleCheckboxChange = (category: "amenities" | "utilities", field: string) => (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [category]: { ...prev[category], [field]: checked }
        }))
    }
    // Handle image file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const imageFiles = Array.from(files);
            setFormData((prev) => ({
                ...prev,
                images: imageFiles
            }));
        }
    }



    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Hardcoded landlordId = 8
        const landlordId = "8"

        const formDataToSend = new FormData()

        const propertyPayload = {
            landlordId,
            title: formData.title,
            type: formData.type,
            description: formData.description,
            address: formData.address,
            neighborhood: formData.neighborhood,
            city: formData.city,
            district: formData.district,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            area: formData.area,
            yearBuilt: formData.yearBuilt,
            parking: formData.parking,
            furnished: formData.furnished,
            price: formData.price,
            deposit: formData.deposit,
            availableFrom: formData.availableFrom,
            minLease: formData.minLease,
            maxOccupants: formData.maxOccupants,
            video: formData.video,

            amenities: Array.isArray(formData.amenities)
                ? formData.amenities
                : Object.keys(formData.amenities).filter((k) => formData.amenities[k]),

            utilities: Array.isArray(formData.utilities)
                ? formData.utilities
                : Object.keys(formData.utilities).filter((k) => formData.utilities[k]),
        }


        formDataToSend.append(
            "property",
            new Blob([JSON.stringify(propertyPayload)], { type: "application/json" })
        )

        formData.images.forEach((img) => {
            formDataToSend.append("images", img)
        })

        try {
            const res = await fetch("http://localhost:8082/api/properties?landlordId=8", {
                method: "POST",
                body: formDataToSend,
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }


        } catch (err) {
            console.error("Upload error:", err)
        }
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
                    <h1 className="text-2xl font-bold tracking-tight">Add New Property</h1>
                    <p className="text-muted-foreground">Fill in the details to list a new property</p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Property Title</Label>
                                    <Input id="title" value={formData.title} onChange={handleChange} placeholder="e.g. Modern Apartment with City View" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Property Type</Label>
                                    <Select onValueChange={handleSelectChange("type")}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="house">House</SelectItem>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="studio">Studio</SelectItem>
                                            <SelectItem value="penthouse">Penthouse</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Describe your property in detail..." rows={5} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Location</h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input id="address" value={formData.address} onChange={handleChange} placeholder="e.g. 123 Main Street" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="neighborhood">Neighborhood</Label>
                                    <Input id="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="e.g. Kigali Heights" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" value={formData.city} onChange={handleChange} placeholder="e.g. Kigali" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="district">District</Label>
                                    <Input id="district" value={formData.district} onChange={handleChange} placeholder="e.g. Gasabo" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Property Details */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                            <div className="grid gap-6 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="bedrooms">Bedrooms</Label>
                                    <Input id="bedrooms" type="number" min="0" value={formData.bedrooms} onChange={handleChange} placeholder="e.g. 2" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bathrooms">Bathrooms</Label>
                                    <Input id="bathrooms" type="number" min="0" step="0.5" value={formData.bathrooms} onChange={handleChange} placeholder="e.g. 1.5" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="area">Area (m²)</Label>
                                    <Input id="area" type="number" min="0" value={formData.area} onChange={handleChange} placeholder="e.g. 85" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="yearBuilt">Year Built</Label>
                                    <Input id="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleChange} placeholder="e.g. 2020" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parking">Parking Spaces</Label>
                                    <Input id="parking" type="number" min="0" value={formData.parking} onChange={handleChange} placeholder="e.g. 1" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="furnished">Furnished</Label>
                                    <Select onValueChange={handleSelectChange("furnished")}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fully">Fully Furnished</SelectItem>
                                            <SelectItem value="partially">Partially Furnished</SelectItem>
                                            <SelectItem value="unfurnished">Unfurnished</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Amenities */}
                            <h3 className="font-medium mb-4">Amenities</h3>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="wifi" checked={formData.amenities.wifi} onCheckedChange={handleCheckboxChange('amenities', 'wifi')} />
                                    <Label htmlFor="wifi">WiFi</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="ac" checked={formData.amenities.ac} onCheckedChange={handleCheckboxChange('amenities', 'ac')} />
                                    <Label htmlFor="ac">Air Conditioning</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="heating" checked={formData.amenities.heating} onCheckedChange={handleCheckboxChange('amenities', 'heating')} />
                                    <Label htmlFor="heating">Heating</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="tv" checked={formData.amenities.tv} onCheckedChange={handleCheckboxChange('amenities', 'tv')} />
                                    <Label htmlFor="tv">TV</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="kitchen" checked={formData.amenities.kitchen} onCheckedChange={handleCheckboxChange('amenities', 'kitchen')} />
                                    <Label htmlFor="kitchen">Kitchen</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="washer" checked={formData.amenities.washer} onCheckedChange={handleCheckboxChange('amenities', 'washer')} />
                                    <Label htmlFor="washer">Washer</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="dryer" checked={formData.amenities.dryer} onCheckedChange={handleCheckboxChange('amenities', 'dryer')} />
                                    <Label htmlFor="dryer">Dryer</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="pool" checked={formData.amenities.pool} onCheckedChange={handleCheckboxChange('amenities', 'pool')} />
                                    <Label htmlFor="pool">Pool</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="gym" checked={formData.amenities.gym} onCheckedChange={handleCheckboxChange('amenities', 'gym')} />
                                    <Label htmlFor="gym">Gym</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="parking" checked={formData.amenities.parking} onCheckedChange={handleCheckboxChange('amenities', 'parking')} />
                                    <Label htmlFor="parking">Parking</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="elevator" checked={formData.amenities.elevator} onCheckedChange={handleCheckboxChange('amenities', 'elevator')} />
                                    <Label htmlFor="elevator">Elevator</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="security" checked={formData.amenities.security} onCheckedChange={handleCheckboxChange('amenities', 'security')} />
                                    <Label htmlFor="security">Security</Label>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Utilities */}
                            <h3 className="font-medium mb-4">Utilities</h3>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="water" checked={formData.utilities.water} onCheckedChange={handleCheckboxChange('utilities', 'water')} />
                                    <Label htmlFor="water">Water</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="electricity" checked={formData.utilities.electricity} onCheckedChange={handleCheckboxChange('utilities', 'electricity')} />
                                    <Label htmlFor="electricity">Electricity</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="gas" checked={formData.utilities.gas} onCheckedChange={handleCheckboxChange('utilities', 'gas')} />
                                    <Label htmlFor="gas">Gas</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="internet" checked={formData.utilities.internet} onCheckedChange={handleCheckboxChange('utilities', 'internet')} />
                                    <Label htmlFor="internet">Internet</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="cable" checked={formData.utilities.cable} onCheckedChange={handleCheckboxChange('utilities', 'cable')} />
                                    <Label htmlFor="cable">Cable</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (per month)</Label>
                                    <Input id="price" type="number" value={formData.price} onChange={handleChange} placeholder="e.g. 500" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="deposit">Deposit</Label>
                                    <Input id="deposit" type="number" value={formData.deposit} onChange={handleChange} placeholder="e.g. 1000" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="availableFrom">Available From</Label>
                                    <Input id="availableFrom" type="date" value={formData.availableFrom} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="minLease">Min Lease Duration (months)</Label>
                                    <Input id="minLease" type="number" value={formData.minLease} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxOccupants">Max Occupants</Label>
                                    <Input id="maxOccupants" type="number" value={formData.maxOccupants} onChange={handleChange} />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="video">Video Tour URL (Optional)</Label>
                                    <Input id="video" value={formData.video} onChange={handleChange} placeholder="e.g. https://example.com/video" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Property Images</h2>
                            <div className="space-y-2">
                                <Label htmlFor="images">Upload Images</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                <p className="text-sm text-muted-foreground">You can upload multiple images (jpg, png, etc.)</p>
                            </div>
                        </CardContent>
                    </Card>


                    {/* Submit Button */}
                    <Button className="w-full" type="submit">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Property
                    </Button>
                </form>
            </div>
        </LandlordLayout>
    )
}
