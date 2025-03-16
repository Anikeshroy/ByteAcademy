"use client"

import Link from "next/link"
import { Home, Info, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import InstallPWAButton from "@/components/install-pwa-button"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span>ByteAcademy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <InstallPWAButton />
          <ThemeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <InstallPWAButton />
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium" onClick={toggleMobileMenu}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-sm font-medium" onClick={toggleMobileMenu}>
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

