import SemesterCard from "@/components/semester-card"
// import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { Link } from "lucide-react"
import ShareSection from "@/components/share-section"

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
        </section>

        {/* Add the ShareSection component */}
        <ShareSection />
      </div>
      
      {/* Footer accent */}
      <div className="h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 mt-10"></div>
    </div>
  )
} 