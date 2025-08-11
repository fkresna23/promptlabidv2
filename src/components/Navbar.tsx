"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Crown, Menu, X, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PL</span>
            </div>
            <span className="font-bold text-xl text-gray-900">PromptLab</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search categories and prompts..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/categories" className="text-gray-600 hover:text-gray-900">
              Categories
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            
            {/* Authentication - Desktop */}
            <SignedOut>
              <Button variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button variant="premium" asChild>
                <Link href="/sign-up" className="flex items-center space-x-2">
                  <Crown className="h-4 w-4" />
                  <span>Get Started</span>
                </Link>
              </Button>
            </SignedOut>
            
            <SignedIn>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin">Admin</Link>
              </Button>
              <Button variant="premium" asChild>
                <Link href="/upgrade" className="flex items-center space-x-2">
                  <Crown className="h-4 w-4" />
                  <span>Upgrade</span>
                </Link>
              </Button>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search prompts..."
                  className="pl-10 pr-4 w-full"
                />
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/categories"
                  className="block py-2 text-gray-600 hover:text-gray-900"
                >
                  Categories
                </Link>
                <Link
                  href="/pricing"
                  className="block py-2 text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="block py-2 text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                </SignedIn>
              </div>
              
              {/* Mobile Action Buttons */}
              <div className="space-y-2 pt-4 border-t">
                <SignedOut>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button variant="premium" className="w-full" asChild>
                    <Link href="/sign-up" className="flex items-center justify-center space-x-2">
                      <Crown className="h-4 w-4" />
                      <span>Get Started</span>
                    </Link>
                  </Button>
                </SignedOut>
                
                <SignedIn>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                  <Button variant="premium" className="w-full" asChild>
                    <Link href="/upgrade" className="flex items-center justify-center space-x-2">
                      <Crown className="h-4 w-4" />
                      <span>Upgrade to Premium</span>
                    </Link>
                  </Button>
                  <div className="pt-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
