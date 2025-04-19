import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Calculator } from "lucide-react"
import Link from "next/link"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <section className="space-y-10">
          {/* Back button */}
          <div className="flex items-center">
            <Button variant="ghost" asChild className="gap-1 pl-0 hover:pl-1 transition-all">
              <Link href="/">
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              CGPA Calculator
            </h1>
          </div>

          {/* Coming Soon Card */}
          <div className="flex justify-center">
            <Card className="overflow-hidden border-muted/40 bg-card/80 hover:bg-card/95 transition-all hover:shadow-lg max-w-2xl w-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    CGPA Calculator
                  </CardTitle>
                  <div className="bg-primary/10 rounded-full p-2">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardDescription>Calculate your cumulative grade point average</CardDescription>
              </CardHeader>
              
              <CardContent className="py-10">
                <div className="text-center space-y-6">
                  <div className="bg-primary/5 rounded-full mx-auto w-20 h-20 flex items-center justify-center">
                    <Calculator className="h-10 w-10 text-primary/70" />
                  </div>
                  <h3 className="text-2xl font-medium text-primary">
                    Coming Soon
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We're working hard to bring you a powerful CGPA calculator tool. The feature will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Footer accent */}
        <div className="h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 mt-10"></div>
      </div>
    </div>
  )
} 