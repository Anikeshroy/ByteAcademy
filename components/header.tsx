"use client"

// Updated header with improved mobile view and fixed positioning
import Link from "next/link"
import { Home, Info, Menu, X, Moon, Sun, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import InstallPWAButton from "@/components/install-pwa-button"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import logoImage from "/assets/logo.png"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const headerHeight = 64; // 4rem or 64px, the height of the header

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Handle component mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    // Apply top margin to body to prevent content from going under navbar
    document.body.style.paddingTop = `${headerHeight}px`;
    
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled for styling
      setScrolled(currentScrollY > 10)
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHeaderVisible(false)
        
        // Close mobile menu when scrolling
        if (mobileMenuOpen) {
          closeMobileMenu()
        }
      } else {
        setHeaderVisible(true)
      }
      
      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mobileMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMobileMenu()
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Handle scroll when mobile menu is open
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
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ${
      scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm"
    } supports-[backdrop-filter]:bg-background/60 transform ${
      headerVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image 
            src={logoImage} 
            alt="ByteAcademy Logo" 
            width={32} 
            height={32} 
            className="h-8 w-8 object-contain md:h-9 md:w-9" 
            priority
          />
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">ByteAcademy</span>
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
            className={`h-9 w-9 transition-all duration-300 ${mobileMenuOpen ? "bg-primary/10 text-primary border-primary/20 ring-1 ring-primary/50" : ""}`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-primary font-bold" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Only render on client side to prevent hydration mismatch */}
      {mounted && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" 
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel */}
          <div 
            ref={mobileMenuRef}
            className="fixed inset-x-0 top-0 z-50 md:hidden animate-in slide-in-from-top-5 duration-300 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="bg-background border-b shadow-lg">
              {/* Header with close button */}
              <div className="container flex items-center justify-between h-16 border-b">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={closeMobileMenu}>
                  <Image 
                    src={logoImage} 
                    alt="ByteAcademy Logo" 
                    width={32} 
                    height={32} 
                    className="h-8 w-8 object-contain" 
                    priority
                  />
                  <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">ByteAcademy</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeMobileMenu}
                  className="h-9 w-9"
                >
                  <X className="h-5 w-5 text-primary font-bold" />
                </Button>
              </div>
              
              {/* Menu content */}
              <div className="container py-6">
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
                          <Moon className="h-4 w-4 dark:hidden" />
                          <Sun className="h-4 w-4 hidden dark:block" />
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
          </div>
        </>
      )}
    </header>
  )
}

