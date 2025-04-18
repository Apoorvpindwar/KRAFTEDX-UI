"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@/components/user-button";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-2 shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              FluidAuth
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              href="/interactive-background" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Interactive
            </Link>
            {isSignedIn ? (
              <Link 
                href="/dashboard" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <ModeToggle />
              {isSignedIn && <UserButton />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            {isSignedIn && <UserButton />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm p-4">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/interactive-background" 
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Interactive
            </Link>
            {isSignedIn ? (
              <Link 
                href="/dashboard" 
                className="text-sm font-medium py-2 transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/sign-in" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link 
                  href="/sign-up"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}