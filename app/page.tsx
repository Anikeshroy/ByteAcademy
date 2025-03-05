import SemesterCard from "@/components/semester-card"
// import { GraduationCap } from "lucide-react"

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
    <div className="container mx-auto px-4 py-12">
      <section className="space-y-6">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            {/* <GraduationCap className="h-8 w-8 text-primary" /> */}
            <h1 className="text-4xl font-bold tracking-tight">Resources for CSE Students</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access Previous Year Papers, Video Solutions & Handwritten Notes for all Semesters.
          </p>
          {/* <p>I'm Anikesh Roy</p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {semesters.map((semester) => (
            <SemesterCard key={semester.id} semester={semester} />
          ))}
        </div>
      </section>
    </div>
  )
}

