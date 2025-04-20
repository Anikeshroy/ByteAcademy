// import SemesterCard from "@/components/semester-card"
// import { GraduationCap } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Sparkles, Link } from "lucide-react"
import ShareSection from "@/components/share-section"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronRight, Award, BookMarked, Calculator } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <section className="space-y-10">
          {/* Header with subtle animation */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            {/* <GraduationCap className="h-10 w-10 text-primary" /> */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            The Ultimate Academic Hub for CSE Students
            </h1>
          </div>

          {/* Main Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {/* Resources Card */}
            <div className="transition-all duration-300 hover:translate-y-[-4px]">
              <Card className="overflow-hidden transition-all hover:shadow-lg group border-muted/40 bg-card/80 hover:bg-card/95 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      Available Resources
                    </CardTitle>
                    <div className="bg-primary/10 rounded-full p-2 group-hover:bg-primary/20 transition-colors">
                      <BookMarked className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardDescription>Access all semester resources for CSE students</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Browse resources by semester</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    asChild 
                    variant="default" 
                    className="w-full group-hover:bg-primary/90 transition-all duration-300 mt-2"
                  >
                    <Link 
                      href="/resources" 
                      className="flex items-center justify-between"
                    >
                      <span>View Resources</span>
                      <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Result Card Section */}
            <div className="transition-all duration-300 hover:translate-y-[-4px]">
              <Card className="overflow-hidden transition-all hover:shadow-lg group border-muted/40 bg-card/80 hover:bg-card/95 h-full">
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

            {/* CGPA Calculator Card */}
            <div className="transition-all duration-300 hover:translate-y-[-4px]">
              <Card className="overflow-hidden transition-all hover:shadow-lg group border-muted/40 bg-card/80 hover:bg-card/95 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      CGPA Calculator
                    </CardTitle>
                    <div className="bg-primary/10 rounded-full p-2 group-hover:bg-primary/20 transition-colors">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardDescription>Calculate your CGPA and semester performance</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Easily calculate your grades and CGPA</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    asChild 
                    variant="default" 
                    className="w-full group-hover:bg-primary/90 transition-all duration-300 mt-2"
                  >
                    <Link 
                      href="/calculator" 
                      className="flex items-center justify-between"
                    >
                      <span>Visit Calculator</span>
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