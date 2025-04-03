"use client"

import Link from "next/link"
import { Home, Info, Menu, X, Moon, Sun, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import InstallPWAButton from "@/components/install-pwa-button"
import { useState, useEffect, useCallback } from "react"
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

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

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

  // Remove the effect that prevents scrolling when mobile menu is open
  useEffect(() => {
    if (!mounted) return;
  }, [mobileMenuOpen, mounted])

  // Add this effect to handle clicks anywhere on the document
  useEffect(() => {
    if (!mounted || !mobileMenuOpen) return;
    
    // Function to handle clicks anywhere on the document
    const handleDocumentClick = (event: MouseEvent) => {
      // Check if the click is outside the mobile menu
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('mobile-menu-button');
      
      if (mobileMenu && menuButton) {
        // If the click is not on the menu or the button, close the menu
        if (!mobileMenu.contains(event.target as Node) && !menuButton.contains(event.target as Node)) {
          closeMobileMenu();
        }
      }
    };
    
    // Add the event listener
    document.addEventListener('click', handleDocumentClick);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [mobileMenuOpen, mounted, closeMobileMenu]);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm"
    } supports-[backdrop-filter]:bg-background/60`}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
          <div className="flex items-center">
            <Image 
              src={logoImage} 
              alt="ByteAcademy Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8 object-contain" 
            />
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
            <div className="relative group">
              <ThemeToggle />
              <div className="absolute right-0 top-full mt-2 w-40 p-2 bg-background rounded-md shadow-md border border-muted/30 text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <p className="text-center">
                  <span className="dark:hidden">Light mode active</span>
                  <span className="hidden dark:inline">Dark mode active</span>
                  <br />
                  <span className="text-muted-foreground">Click to switch theme</span>
                </p>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <InstallPWAButton />
          <Button 
            id="mobile-menu-button"
            variant="outline" 
            size="icon" 
            onClick={toggleMobileMenu} 
            className={`h-9 w-9 transition-all duration-300 ${mobileMenuOpen ? "bg-primary text-primary-foreground border-primary" : ""}`}
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
            id="mobile-menu"
            className="fixed inset-x-0 top-0 z-50 md:hidden animate-in slide-in-from-top-5 duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="container py-6 bg-background border-x border-b rounded-b-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl group" onClick={closeMobileMenu}>
                  <div className="flex items-center">
                    <Image 
                      src={logoImage} 
                      alt="ByteAcademy Logo" 
                      width={32} 
                      height={32} 
                      className="h-8 w-8 object-contain" 
                    />
                  </div>
                  <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-primary transition-all duration-500">ByteAcademy</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeMobileMenu}
                  className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
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
                      <div>
                        <span>Theme</span>
                        <p className="text-xs text-muted-foreground">
                          <span className="dark:hidden">Light mode active</span>
                          <span className="hidden dark:inline">Dark mode active</span>
                        </p>
                      </div>
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

