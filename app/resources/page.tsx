import SemesterCard from "@/components/semester-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookMarked, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ResourcesPage() {
  const semesters = [
    { id: 1, title: "Semester 1", description: "Bihar Engineering University" },
    { id: 2, title: "Semester 2", description: "Bihar Engineering University" },
    { id: 3, title: "Semester 3", description: "Bihar Engineering University" },
    { id: 4, title: "Semester 4", description: "Bihar Engineering University" },
    { id: 5, title: "Semester 5", description: "Bihar Engineering University" },
    { id: 6, title: "Semester 6", description: "Bihar Engineering University" },
    { id: 7, title: "Semester 7", description: "Bihar Engineering University" },
    { id: 8, title: "Semester 8", description: "Bihar Engineering University" },
  ]

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
              CSE Resources by Semester
            </h1>
          </div>

          {/* Resources Card containing all semesters */}
          <Card className="overflow-hidden border-muted/40 bg-card/80 hover:bg-card/95 transition-all hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Resources
                </CardTitle>
                <div className="bg-primary/10 rounded-full p-2">
                  <BookMarked className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardDescription>All semester resources for CSE students</CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Decorative divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-4 text-muted-foreground text-sm">All Semesters</span>
                </div>
              </div>

              {/* Semester cards with improved grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
                {semesters.map((semester, index) => (
                  <div 
                    key={semester.id} 
                    className="transition-all duration-300 hover:translate-y-[-4px]"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <SemesterCard semester={semester} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Footer accent */}
        <div className="h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 mt-10"></div>
      </div>
    </div>
  )
} 