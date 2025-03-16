"use client"

import { useState, useEffect } from "react"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define a type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWANotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  
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
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }
    
    setDeferredPrompt(null)
    setIsVisible(false)
  }
  
  if (!isVisible) {
    return null
  }
  
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 bg-card border border-muted/30 rounded-lg shadow-lg p-4 z-50 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-medium mb-1">Install ByteAcademy</h3>
          <p className="text-sm text-muted-foreground">
            Install this app on your device for quick access even when offline.
          </p>
          <div className="mt-3 flex gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 gap-1.5"
              onClick={handleInstall}
            >
              <Download className="h-4 w-4" />
              <span>Install</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={handleDismiss}
            >
              Not now
            </Button>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  )
} 