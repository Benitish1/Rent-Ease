import { Search, Home, Calendar, CreditCard } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Filter",
      description:
        "Browse thousands of properties and filter by location, price, and amenities to find your perfect match.",
    },
    {
      icon: Home,
      title: "Book Viewings",
      description: "Schedule in-person or virtual viewings directly through the platform at times that work for you.",
    },
    {
      icon: Calendar,
      title: "Secure Your Rental",
      description: "Apply for your chosen property, sign documents electronically, and confirm your booking.",
    },
    {
      icon: CreditCard,
      title: "Safe Payments",
      description:
        "Make secure payments through our platform, with funds only released to landlords after you move in.",
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <step.icon className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
