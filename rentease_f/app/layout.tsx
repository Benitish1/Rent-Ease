import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "RentEase - Modern Rental Web Application",
    description: "Find your perfect home with RentEase",
    icons: {
        icon: [
            {
                url: "/custom-favicon.ico",
                sizes: "any",
            },
        ],
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="icon" href="/custom-favicon.ico" />
        </head>
        <body className={inter.className}>
        {children}
        <Script id="remove-v0-branding" strategy="afterInteractive">
            {`
            function removeV0Branding() {
              // Remove any favicon links that might contain v0 branding
              const links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
              links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.includes('custom-favicon.ico')) {
                  link.remove();
                }
              });
              
              // Remove any elements with v0 in class, id, or data attributes
              const elements = document.querySelectorAll('[class*="v0"], [id*="v0"], [data-v0]');
              elements.forEach(el => el.remove());
              
              // Force our custom favicon
              if (!document.querySelector('link[href="/custom-favicon.ico"]')) {
                const link = document.createElement('link');
                link.rel = 'icon';
                link.href = '/custom-favicon.ico';
                document.head.appendChild(link);
              }
            }
            
            // Run immediately and then periodically to catch any dynamically added elements
            removeV0Branding();
            setInterval(removeV0Branding, 1000);
          `}
        </Script>
        </body>
        </html>
    )
}
