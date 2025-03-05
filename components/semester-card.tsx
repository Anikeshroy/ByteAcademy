import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronRight, GraduationCap } from "lucide-react"

interface SemesterCardProps {
  semester: {
    id: number
    title: string
    description: string
  }
}

export default function SemesterCard({ semester }: SemesterCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{semester.title}</CardTitle>
          <div className="bg-primary/10 rounded-full p-2">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
        </div>
        <CardDescription>{semester.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="mr-1 h-4 w-4" />
          <span>Access all subject resources</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full group-hover:translate-x-1 transition-transform">
          <Link href={`/semester/${semester.id}`} className="flex items-center justify-between">
            <span>View Semester</span>
            <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

