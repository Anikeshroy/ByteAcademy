import { FileText, Video, FileDown, ExternalLink } from "lucide-react"
import type { ResourceType } from "@/lib/types"
import Link from "next/link"

interface ResourceListProps {
  resources: ResourceType[]
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (resources.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No resources available yet</div>
  }

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {resource.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
            {resource.type === "video" && <Video className="h-5 w-5 text-blue-500" />}
            {resource.type === "document" && <FileDown className="h-5 w-5 text-green-500" />}
            {resource.type === "link" && <ExternalLink className="h-5 w-5 text-purple-500" />}
            <div>
              <div className="font-medium">{resource.title}</div>
              <div className="text-sm text-muted-foreground">{resource.year}</div>
            </div>
          </div>
          <Link
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  )
}

