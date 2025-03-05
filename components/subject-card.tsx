import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResourceList from "@/components/resource-list"
import type { ResourceType } from "@/lib/types"
import { BookOpen, FileText, Video, FileDown, BookMarked } from "lucide-react"

interface SubjectCardProps {
  subject: {
    id: string
    title: string
    code: string
    description: string
    resources: {
      questions: ResourceType[]
      videos: ResourceType[]
      videoSolutions: ResourceType[]
      notes: ResourceType[]
    }
  }
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-secondary p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{subject.title}</CardTitle>
              <CardDescription>{subject.code}</CardDescription>
            </div>
          </div>
        </div>
        <CardDescription className="mt-2">{subject.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="grid grid-cols-1  sm:grid-cols-4 mb-4">
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Question Papers</span>
            </TabsTrigger>
            <TabsTrigger value="videoSolutions" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              <span>Video Solutions</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Video Playlists</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              <span>Hand Written Notes</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="questions">
            <ResourceList resources={subject.resources.questions} />
          </TabsContent>
          <TabsContent value="videos">
            <ResourceList resources={subject.resources.videos} />
          </TabsContent>
          <TabsContent value="videoSolutions">
            <ResourceList resources={subject.resources.videoSolutions} />
          </TabsContent>
          <TabsContent value="notes">
            <ResourceList resources={subject.resources.notes} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

