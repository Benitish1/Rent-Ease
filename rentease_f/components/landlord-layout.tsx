import type React from "react"
import Link from "next/link"
import {
    Home,
    Calendar,
    CreditCard,
    Users,
    MessageSquare,
    Bell,
    User,
    Settings,
    LogOut,
    BarChart3,
    Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface LandlordLayoutProps {
    children: React.ReactNode
}

export function LandlordLayout({ children }: LandlordLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                {/* Sidebar */}
                <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r bg-background lg:block">
                    <div className="flex h-16 items-center border-b px-6">
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
                                    className="h-5 w-5 text-primary-foreground"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold">RentEase</span>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-1 p-4">
                        <Link
                            href="/landlord/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <Home className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/landlord/properties"
                            className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
                        >
                            <Home className="h-5 w-5" />
                            <span>Properties</span>
                        </Link>
                        <Link
                            href="/landlord/bookings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <Calendar className="h-5 w-5" />
                            <span>Bookings</span>
                            <Badge className="ml-auto">2</Badge>
                        </Link>
                        <Link
                            href="/landlord/tenants"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <Users className="h-5 w-5" />
                            <span>Tenants</span>
                        </Link>
                        <Link
                            href="/landlord/payments"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <CreditCard className="h-5 w-5" />
                            <span>Payments</span>
                        </Link>
                        <Link
                            href="/landlord/analytics"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <BarChart3 className="h-5 w-5" />
                            <span>Analytics</span>
                        </Link>
                        <Link
                            href="/landlord/messages"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <MessageSquare className="h-5 w-5" />
                            <span>Messages</span>
                            <Badge className="ml-auto">5</Badge>
                        </Link>
                        <Link
                            href="/landlord/notifications"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <Bell className="h-5 w-5" />
                            <span>Notifications</span>
                            <Badge className="ml-auto">3</Badge>
                        </Link>
                        <Link
                            href="/landlord/profile"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </Link>
                        <Link
                            href="/landlord/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </Link>
                    </nav>
                    <div className="absolute bottom-0 w-full border-t p-4">
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                            <LogOut className="mr-2 h-5 w-5" />
                            Log out
                        </Button>
                    </div>
                </aside>

                {/* Mobile header */}
                <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-4 border-b bg-background px-6 lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <div className="flex h-16 items-center border-b px-6">
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
                                            className="h-5 w-5 text-primary-foreground"
                                        >
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-bold">RentEase</span>
                                </Link>
                            </div>
                            <nav className="flex flex-col gap-1 p-4">
                                <Link
                                    href="/landlord/dashboard"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link
                                    href="/landlord/properties"
                                    className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    <span>Properties</span>
                                </Link>
                                <Link
                                    href="/landlord/bookings"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Calendar className="h-5 w-5" />
                                    <span>Bookings</span>
                                    <Badge className="ml-auto">2</Badge>
                                </Link>
                                <Link
                                    href="/landlord/tenants"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Users className="h-5 w-5" />
                                    <span>Tenants</span>
                                </Link>
                                <Link
                                    href="/landlord/payments"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <CreditCard className="h-5 w-5" />
                                    <span>Payments</span>
                                </Link>
                                <Link
                                    href="/landlord/analytics"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <BarChart3 className="h-5 w-5" />
                                    <span>Analytics</span>
                                </Link>
                                <Link
                                    href="/landlord/messages"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <MessageSquare className="h-5 w-5" />
                                    <span>Messages</span>
                                    <Badge className="ml-auto">5</Badge>
                                </Link>
                                <Link
                                    href="/landlord/notifications"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Bell className="h-5 w-5" />
                                    <span>Notifications</span>
                                    <Badge className="ml-auto">3</Badge>
                                </Link>
                                <Link
                                    href="/landlord/profile"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <User className="h-5 w-5" />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    href="/landlord/settings"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Settings className="h-5 w-5" />
                                    <span>Settings</span>
                                </Link>
                            </nav>
                            <div className="absolute bottom-0 w-full border-t p-4">
                                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Log out
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center gap-2">
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

                    <div className="ml-auto flex items-center gap-4">
                        <Button variant="outline" size="icon">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
                        </Button>
                        <Avatar>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                            <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 lg:ml-64">{children}</main>
            </div>
        </div>
    )
}
