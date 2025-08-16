import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BusinessFlow - Time Tracking & Invoicing Made Simple",
  description:
    "Track time, log expenses, send invoices, and get paid online. Real-time project profitability for freelancers and small businesses.",
};

// Development navigation component
function DevNavigation() {
  return (
    <div className="bg-yellow-100 border-b border-yellow-200 p-2">
      <div className="container mx-auto">
        <p className="text-xs text-yellow-800 mb-2">
          🚧 Development Navigation (remove in production)
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">
              Landing
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost" size="sm">
              Sign Up
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/clients">
            <Button variant="ghost" size="sm">
              Clients
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="ghost" size="sm">
              Projects
            </Button>
          </Link>
          <Link href="/time-tracking">
            <Button variant="ghost" size="sm">
              Time Tracking
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost" size="sm">
              Account
            </Button>
          </Link>
          <Link href="/expenses">
            <Button variant="ghost" size="sm">
              Expenses
            </Button>
          </Link>
          <Link href="/invoices">
            <Button variant="ghost" size="sm">
              Invoices
            </Button>
          </Link>
          <Link href="/payments">
            <Button variant="ghost" size="sm">
              Payments
            </Button>
          </Link>
          <Link href="/components">
            <Button variant="ghost" size="sm">
              Components
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <DevNavigation /> */}
        {children}
      </body>
    </html>
  );
}
