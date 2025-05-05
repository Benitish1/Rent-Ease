import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  quote: string
  rating: number
}

export function TestimonialCard({ name, role, image, quote, rating }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`}
            />
          ))}
        </div>
        <blockquote className="flex-grow text-muted-foreground">"{quote}"</blockquote>
      </CardContent>
    </Card>
  )
}
