"use client"

import { useState, useEffect } from "react"
import { Download, Sparkles } from "lucide-react"
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
  const [dismissCount, setDismissCount] = useState(0)
  
  // Effect to disable body scroll when modal is visible
  useEffect(() => {
    if (isVisible) {
      // Save the current overflow value
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // Disable scrolling on body
      document.body.style.overflow = 'hidden';
      
      // Re-enable scrolling when component unmounts or modal is hidden
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isVisible]);
  
  useEffect(() => {
    // Check if already installed
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      return
    }
    
    // Check if user has permanently dismissed the notification
    if (typeof window !== 'undefined' && localStorage) {
      const permanentlyDismissed = localStorage.getItem('pwa-notification-permanently-dismissed')
      if (permanentlyDismissed === 'true') {
        return
      }
      
      // Check if app is already installed
      const isInstalled = localStorage.getItem('pwa-app-installed')
      if (isInstalled === 'true') {
        return
      }
      
      // Get previous dismiss count
      const storedDismissCount = localStorage.getItem('pwa-notification-dismiss-count')
      if (storedDismissCount) {
        setDismissCount(parseInt(storedDismissCount, 10))
      }
    }
    
    // Show notification after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)
    
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
  
  // Temporary dismiss - will show again on next visit
  const handleTemporaryDismiss = () => {
    setIsVisible(false)
    
    // Increment dismiss count and save to localStorage
    const newDismissCount = dismissCount + 1
    setDismissCount(newDismissCount)
    
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('pwa-notification-dismiss-count', newDismissCount.toString())
    }
  }
  
  // Permanent dismiss - won't show again
  const handlePermanentDismiss = () => {
    setIsVisible(false)
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('pwa-notification-permanently-dismissed', 'true')
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
  
  // Show "Don't show again" instead of "Not Now" after 3 dismissals
  const showPermanentDismiss = dismissCount >= 3
  
  return (
    <>
      {/* Backdrop overlay - no onClick handler to prevent dismissal on background click */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300" />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md z-50 animate-fade-in">
        <div className="bg-card/95 backdrop-blur-md border border-primary/20 rounded-xl shadow-xl overflow-hidden">
          {/* Header with decorative gradient - no close button */}
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-6 relative">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-8 w-8 sm:h-7 sm:w-7 text-primary" />
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
            <div className="space-y-5">
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  <span>Benefits of installing</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-3">
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
              
              {/* Improved button layout for mobile */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full sm:flex-1 gap-2 bg-primary hover:bg-primary/90 py-6 text-base"
                  onClick={handleInstall}
                  disabled={isInstalling}
                >
                  {isInstalling ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white/90 rounded-full animate-spin" />
                      <span>Installing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      <span>Install Now</span>
                    </>
                  )}
                </Button>
                
                {showPermanentDismiss ? (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:flex-1 border-muted/30 py-6 text-base"
                    onClick={handlePermanentDismiss}
                    disabled={isInstalling}
                  >
                    Don't Show Again
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:flex-1 border-muted/30 py-6 text-base"
                    onClick={handleTemporaryDismiss}
                    disabled={isInstalling}
                  >
                    Not Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 