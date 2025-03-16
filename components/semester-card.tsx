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
    <Card className="overflow-hidden transition-all hover:shadow-lg group border-muted/40 bg-card/80 hover:bg-card/95">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {semester.title}
          </CardTitle>
          <div className="bg-primary/10 rounded-full p-2 group-hover:bg-primary/20 transition-colors">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
        </div>
        <CardDescription>{semester.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
          <BookOpen className="mr-2 h-4 w-4" />
          <span>Access all subject resources</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          asChild 
          variant="default" 
          className="w-full group-hover:bg-primary/90 transition-all duration-300 mt-2"
        >
          <Link 
            href={`/semester/${semester.id}`} 
            className="flex items-center justify-between"
          >
            <span>View Semester</span>
            <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

