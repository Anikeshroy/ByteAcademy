"use client"

import Link from "next/link"
import { Home, Info, Menu, X, Moon, Sun, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import InstallPWAButton from "@/components/install-pwa-button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import logoImage from "/assets/logo.png"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Handle component mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (!mounted) return;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen, mounted])

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm"
    } supports-[backdrop-filter]:bg-background/60`}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
          <div className="relative flex items-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 to-blue-500/60 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-background rounded-full p-1.5 overflow-hidden">
              <Image 
                src={logoImage} 
                alt="ByteAcademy Logo" 
                width={20} 
                height={20} 
                className="h-5 w-5 object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
          </div>
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-primary transition-all duration-500">ByteAcademy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-muted/30">
            <Link 
              href="/" 
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                pathname === "/" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "hover:bg-background/70 hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                pathname === "/about" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "hover:bg-background/70 hover:text-foreground"
              }`}
            >
              About
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <InstallPWAButton />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <InstallPWAButton />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMobileMenu} 
            className={`h-9 w-9 transition-all duration-300 ${mobileMenuOpen ? "bg-primary/10 text-primary border-primary/20" : ""}`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Only render on client side to prevent hydration mismatch */}
      {mounted && mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" 
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div 
            className="fixed inset-x-0 top-16 z-50 md:hidden animate-in slide-in-from-top-5 duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="container py-6 bg-background border-x border-b rounded-b-xl shadow-lg">
              <nav className="flex flex-col space-y-1">
                <Link 
                  href="/" 
                  className={`flex items-center gap-3 text-sm font-medium p-3 rounded-lg transition-colors ${
                    pathname === "/" 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted"
                  }`} 
                  onClick={closeMobileMenu}
                >
                  <div className={`p-1.5 rounded-md ${pathname === "/" ? "bg-primary/10" : "bg-muted"}`}>
                    <Home className="h-4 w-4" />
                  </div>
                  <span>Home</span>
                  {pathname === "/" && <Sparkles className="h-3.5 w-3.5 ml-auto text-primary" />}
                </Link>
                
                <Link 
                  href="/about" 
                  className={`flex items-center gap-3 text-sm font-medium p-3 rounded-lg transition-colors ${
                    pathname === "/about" 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted"
                  }`} 
                  onClick={closeMobileMenu}
                >
                  <div className={`p-1.5 rounded-md ${pathname === "/about" ? "bg-primary/10" : "bg-muted"}`}>
                    <Info className="h-4 w-4" />
                  </div>
                  <span>About</span>
                  {pathname === "/about" && <Sparkles className="h-3.5 w-3.5 ml-auto text-primary" />}
                </Link>
                
                <div className="pt-4 mt-4 border-t border-muted">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <div className="p-1.5 rounded-md bg-background">
                        <Sun className="h-4 w-4 dark:hidden" />
                        <Moon className="h-4 w-4 hidden dark:block" />
                      </div>
                      <span>Theme</span>
                    </div>
                    <div onClick={closeMobileMenu}>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

