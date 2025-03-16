import { WifiOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-card/60 backdrop-blur-sm border border-muted/30 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <WifiOff className="h-10 w-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">You're Offline</h1>
              <p className="text-muted-foreground">
                It looks like you've lost your internet connection. Some features may be unavailable until you're back online.
              </p>
            </div>
            
            <div className="space-y-4 w-full">
              <Button asChild className="w-full">
                <Link href="/">
                  Try Again
                </Link>
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Don't worry! ByteAcademy PWA has cached some content for offline use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 