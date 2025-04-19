import SemesterCard from "@/components/semester-card"
// import { GraduationCap } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Sparkles, Link } from "lucide-react"
import ShareSection from "@/components/share-section"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronRight, Award } from "lucide-react"
import Link from "next/link"

export default function Home() {
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
          {/* Header with subtle animation */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            {/* <GraduationCap className="h-10 w-10 text-primary" /> */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            The Ultimate Resources Hub for CSE Students
            </h1>
          </div>

          {/* Decorative divider */}
          <div className="relative">
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
          
          {/* Result Card Section */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-muted-foreground text-sm">Examination Results</span>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <div className="w-full max-w-md transition-all duration-300 hover:translate-y-[-4px]">
              <Card className="overflow-hidden transition-all hover:shadow-lg group border-muted/40 bg-card/80 hover:bg-card/95">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      Examination Results
                    </CardTitle>
                    <div className="bg-primary/10 rounded-full p-2 group-hover:bg-primary/20 transition-colors">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardDescription>Check your latest examination results</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>View and download result sheets</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    asChild 
                    variant="default" 
                    className="w-full group-hover:bg-primary/90 transition-all duration-300 mt-2"
                  >
                    <Link 
                      href="/result/index.html" 
                      className="flex items-center justify-between"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Result</span>
                      <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Add the ShareSection component */}
        <ShareSection />
      </div>
      
      {/* Footer accent */}
      <div className="h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 mt-10"></div>
    </div>
  )
} 