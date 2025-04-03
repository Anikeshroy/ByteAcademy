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

  // Function to get ordinal suffix for semester number
  const getOrdinalSuffix = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
      return num + "st";
    }
    if (j === 2 && k !== 12) {
      return num + "nd";
    }
    if (j === 3 && k !== 13) {
      return num + "rd";
    }
    return num + "th";
  };

  const semesterData = getSemesterData(semesterId)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
            <span>{getOrdinalSuffix(semesterId)} Semester</span>
            <div className="bg-primary/10 p-1.5 rounded-full ml-3 inline-flex">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
          </h1>

          <Button variant="outline" asChild className="gap-1.5 h-9 px-3">
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {semesterData.subjects.map((subject) => (
            <SubjectCard 
              key={subject.id} 
              subject={{
                ...subject,
                semester: semesterId.toString()
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

