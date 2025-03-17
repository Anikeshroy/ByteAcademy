"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Sparkles } from "lucide-react"

// Define a type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      
      // Check if app was installed
      window.addEventListener('appinstalled', () => {
        setIsInstalled(true)
        setIsInstallable(false)
        setDeferredPrompt(null)
        setIsInstalling(false)
      })
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    setIsInstalling(true)
    
    try {
      // Show the install prompt
      deferredPrompt.prompt()
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
        setIsInstalling(false)
      }
      
      // We no longer need the prompt
      setDeferredPrompt(null)
      setIsInstallable(false)
    } catch (error) {
      console.error('Installation failed:', error)
      setIsInstalling(false)
    }
  }

  if (isInstalled) {
    return null // Don't show button if already installed
  }

  if (!isInstallable) {
    return null // Don't show button if not installable
  }

  // Desktop version (md and above)
  const DesktopButton = () => (
    <Button 
      onClick={handleInstallClick}
      variant="default"
      size="sm"
      className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
      disabled={isInstalling}
    >
      {isInstalling ? (
        <>
          <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          <span>Installing...</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          <span>Install App</span>
        </>
      )}
    </Button>
  )

  // Mobile version (below md)
  const MobileButton = () => (
    <Button 
      onClick={handleInstallClick}
      variant="default"
      size="icon"
      className="md:hidden relative h-9 w-9 bg-primary hover:bg-primary/90 text-primary-foreground"
      disabled={isInstalling}
    >
      {isInstalling ? (
        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
      ) : (
        <>
          <Download className="h-4 w-4" />
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300" />
        </>
      )}
    </Button>
  )

  return (
    <>
      <DesktopButton />
      <MobileButton />
    </>
  )
} 