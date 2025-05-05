import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, ChevronRight, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeaturedProperties } from "@/components/featured-properties"
import { TestimonialCard } from "@/components/testimonial-card"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary-foreground"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-xl font-bold">RentEase</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/properties" className="text-sm font-medium hover:text-primary">
                Properties
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-primary">
                Blog
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium hover:text-primary hidden sm:inline-block">
                Log in
              </Link>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
              <Button variant="outline" size="icon" className="md:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="relative">
            <div className="absolute inset-0 z-0">
              <Image
                  src="/placeholder.svg?height=800&width=1600"
                  alt="Modern apartment interior"
                  fill
                  className="object-cover brightness-[0.7]"
                  priority
              />
            </div>
            <div className="container relative z-10 py-24 md:py-32 lg:py-40">
              <div className="max-w-3xl space-y-5 text-white">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Find Your Perfect Home with RentEase
                </h1>
                <p className="text-lg md:text-xl text-white/90">
                  Browse thousands of properties, book viewings, and secure your next home - all in one place.
                </p>
              </div>
              <div className="mt-8 max-w-4xl">
                <div className="rounded-xl bg-white p-4 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input type="text" placeholder="Location (e.g., Kigali, Rwanda)" className="pl-10 h-12 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:w-1/2">
                      <div className="relative">
                        <select className="h-12 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          <option value="">Price Range</option>
                          <option value="0-500">$0 - $500</option>
                          <option value="500-1000">$500 - $1,000</option>
                          <option value="1000-2000">$1,000 - $2,000</option>
                          <option value="2000+">$2,000+</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
                      </div>
                      <div className="relative">
                        <select className="h-12 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          <option value="">Property Type</option>
                          <option value="apartment">Apartment</option>
                          <option value="house">House</option>
                          <option value="villa">Villa</option>
                          <option value="condo">Condo</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
                      </div>
                    </div>
                    <Button size="lg" className="h-12 px-8">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container py-16 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
                <p className="mt-2 text-muted-foreground">Discover our handpicked selection of premium properties</p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0" asChild>
                <Link href="/properties">
                  View all properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <FeaturedProperties />
          </section>

          <section className="bg-muted py-16 md:py-24">
            <div className="container">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight">How RentEase Works</h2>
                <p className="mt-4 text-muted-foreground">
                  Our streamlined process makes finding and securing your next home simple and stress-free
                </p>
              </div>

              <HowItWorks />
            </div>
          </section>

          <section className="container py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">What Our Clients Say</h2>
              <p className="mt-4 text-muted-foreground">
                Hear from tenants and landlords who have experienced the RentEase difference
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                  name="Sarah Johnson"
                  role="Tenant"
                  image="/placeholder.svg?height=100&width=100"
                  quote="RentEase made finding my apartment so simple. The booking process was seamless, and I was able to move in within a week!"
                  rating={5}
              />
              <TestimonialCard
                  name="Michael Chen"
                  role="Landlord"
                  image="/placeholder.svg?height=100&width=100"
                  quote="As a property owner, RentEase has simplified my rental process. I get quality tenants faster, and the payment system is reliable."
                  rating={5}
              />
              <TestimonialCard
                  name="Amina Diallo"
                  role="Tenant"
                  image="/placeholder.svg?height=100&width=100"
                  quote="The filtering options helped me find exactly what I was looking for. The virtual tours saved me so much time!"
                  rating={4}
              />
            </div>
          </section>

          <section className="bg-primary text-primary-foreground py-16 md:py-24">
            <div className="container">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold tracking-tight">Ready to find your perfect home?</h2>
                  <p className="mt-4 text-primary-foreground/90 text-lg">
                    Join thousands of happy tenants and landlords on RentEase today. Start browsing properties or list
                    your own in minutes.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/properties">Browse Properties</Link>
                  </Button>
                  <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      asChild
                  >
                    <Link href="/landlord/signup">List Your Property</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t bg-background">
          <div className="container py-12 md:py-16">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="rounded-md bg-primary p-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary-foreground"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold">RentEase</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Making property rental simple, secure, and stress-free for everyone.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">For Tenants</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Search Properties
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      How to Rent
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Tenant Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Payment Process
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Tenant FAQs
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">For Landlords</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      List a Property
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Landlord Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Pricing & Fees
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Property Management
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Landlord FAQs
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} RentEase. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  )
}
