"use client"

import { useState, useEffect } from "react"
import { X, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define a type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWANotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalling, setIsInstalling] = useState(false)
  
  useEffect(() => {
    // Check if already installed
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      return
    }
    
    // Check if user has dismissed the notification before
    if (typeof window !== 'undefined' && localStorage) {
      const hasDismissed = localStorage.getItem('pwa-notification-dismissed')
      if (hasDismissed) {
        return
      }
    }
    
    // Show notification after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      
      // Listen for successful installation
      window.addEventListener('appinstalled', () => {
        setIsVisible(false)
        setIsInstalling(false)
        // Save that the app was installed
        if (localStorage) {
          localStorage.setItem('pwa-app-installed', 'true')
        }
      })
    }
    
    return () => {
      clearTimeout(timer)
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }
  }, [])
  
  const handleDismiss = () => {
    setIsVisible(false)
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('pwa-notification-dismissed', 'true')
    }
  }
  
  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    setIsInstalling(true)
    
    try {
      // Show the install prompt
      deferredPrompt.prompt()
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        // The appinstalled event will handle closing the modal
      } else {
        console.log('User dismissed the install prompt')
        setIsInstalling(false)
      }
      
      setDeferredPrompt(null)
    } catch (error) {
      console.error('Installation failed:', error)
      setIsInstalling(false)
    }
  }
  
  if (!isVisible) {
    return null
  }
  
  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={handleDismiss}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50 animate-fade-in">
        <div className="bg-card/95 backdrop-blur-md border border-primary/20 rounded-xl shadow-xl overflow-hidden">
          {/* Header with decorative gradient */}
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-6 relative">
            <div className="absolute top-3 right-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-background/50 hover:bg-background/80 text-foreground" 
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Install ByteAcademy</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add to your home screen for quick access
                </p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  <span>Benefits of installing</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Access ByteAcademy directly from your home screen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Use offline when internet connection is unavailable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Faster loading and improved performance</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                  onClick={handleInstall}
                  disabled={isInstalling}
                >
                  {isInstalling ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white/90 rounded-full animate-spin" />
                      <span>Installing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Install Now</span>
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex-1 border-muted/30"
                  onClick={handleDismiss}
                  disabled={isInstalling}
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 