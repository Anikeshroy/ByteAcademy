'use client'

import { Sparkles, Link, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ShareSection() {
  return (
    <section className="pt-4 sm:pt-8">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-primary/10 to-primary/5 border border-primary/10 p-4 sm:p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]" />
          
          <div className="relative flex flex-col items-center text-center space-y-4 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium inline-flex items-center gap-1.5">
                <Share2 className="h-4 w-4" />
                Share with friends
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                Help Us Grow ByteAcademy
              </h2>
              
              <p className="text-sm sm:text-base text-muted-foreground max-w-[600px] mx-auto">
                Share ByteAcademy with your friends and colleagues. Together, we can build a stronger community of learners.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="relative group overflow-hidden w-full sm:w-auto text-base"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'ByteAcademy',
                      text: 'Check out ByteAcademy - Your path to programming excellence!',
                      url: window.location.href,
                    }).catch((error) => console.log('Error sharing:', error));
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:translate-x-[100%] transition-transform duration-500" />
                <Sparkles className="h-5 w-5 mr-2" />
                Share ByteAcademy
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="relative group w-full sm:w-auto text-base"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link className="h-5 w-5 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 