import { notFound } from "next/navigation"
import SubjectCard from "@/components/subject-card"
import { getSemesterData } from "@/lib/data"
import { ChevronLeft, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SemesterPage({ params }: { params: { id: string } }) {
  const semesterId = Number.parseInt(params.id)

  // Validate semester ID
  if (isNaN(semesterId) || semesterId < 1 || semesterId > 8) {
    notFound()
  }

  const semesterData = getSemesterData(semesterId)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            <div>
              <h1 className="text-3xl font-bold">Semester {semesterId}</h1>
              {/* <p className="text-muted-foreground">{semesterData.description}</p> */}
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
          </div>
          

        </div>

        <div className="grid grid-cols-1 gap-8">
          {semesterData.subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>

      <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Semesters</span>
            </Link>
          </Button>
    </div>
    
  )
}

