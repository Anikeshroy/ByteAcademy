import { FileText, Video, FileDown, ExternalLink, ArrowUpRight, Calendar, Tag } from "lucide-react"
import type { ResourceType } from "@/lib/types"
import Link from "next/link"

interface ResourceListProps {
  resources: ResourceType[]
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-muted-foreground">
        <div className="bg-muted/50 p-3 rounded-full mb-3">
          <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground/70" />
        </div>
        <p className="text-sm sm:text-base">No resources available yet</p>
      </div>
    )
  }

  // Function to get icon color based on resource type
  const getTypeColor = (type: string | undefined) => {
    switch(type) {
      case 'pdf': return 'text-red-500 bg-red-500/10';
      case 'video': return 'text-blue-500 bg-blue-500/10';
      case 'document': return 'text-green-500 bg-green-500/10';
      case 'link': return 'text-purple-500 bg-purple-500/10';
      default: return 'text-primary bg-primary/10';
    }
  }

  return (
    <div className="space-y-3">
      {resources.map((resource) => {
        const typeColor = getTypeColor(resource.type);
        const [bgColor, textColor] = typeColor.split(' ');
        
        return (
          <div
            key={resource.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-3.5 rounded-lg border border-muted/50 hover:border-primary/20 hover:bg-accent/30 transition-all duration-200 group"
          >
            <div className="flex items-start sm:items-center gap-3 min-w-0 w-full">
              <div className={`p-2 sm:p-2.5 rounded-md ${bgColor} transition-colors flex-shrink-0`}>
                {resource.type === "pdf" && <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />}
                {resource.type === "video" && <Video className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />}
                {resource.type === "document" && <FileDown className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />}
                {resource.type === "link" && <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />}
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2 sm:line-clamp-1">
                  {resource.title}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
                  {resource.year && (
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 text-muted-foreground/70" />
                      <span className="bg-muted/50 px-1.5 py-0.5 rounded">
                        {resource.year}
                      </span>
                    </div>
                  )}
                  
                  {resource.type && (
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                      <Tag className="h-3 w-3 text-muted-foreground/70" />
                      <span className={`capitalize px-1.5 py-0.5 rounded ${bgColor} ${textColor}`}>
                        {resource.type}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-3 sm:mt-0">
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs sm:text-sm font-medium ${textColor} hover:opacity-80 flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-md ${bgColor} hover:opacity-90 transition-all flex-shrink-0 w-full sm:w-auto`}
              >
                <span>View</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  )
}

