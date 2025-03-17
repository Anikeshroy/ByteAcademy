"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResourceList from "@/components/resource-list"
import type { ResourceType } from "@/lib/types"
import { FileText, Video, FileDown, BookMarked, Sparkles, ListFilter } from "lucide-react"
import { useState } from "react"

interface SubjectCardProps {
  subject: {
    id: string
    title: string
    code: string
    description: string
    semester?: string
    resources: {
      questions: ResourceType[]
      videos: ResourceType[]
      videoSolutions: ResourceType[]
      notes: ResourceType[]
    }
  }
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const [activeTab, setActiveTab] = useState("questions")
  
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Function to get the appropriate title and count based on active tab
  const getResourceInfo = () => {
    switch(activeTab) {
      case 'questions':
        return {
          title: "Question Papers",
          count: subject.resources.questions.length,
          icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
          bgColor: "bg-primary/10",
          textColor: "text-primary"
        };
      case 'videos':
        return {
          title: "Video Playlists",
          count: subject.resources.videos.length,
          icon: <Video className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />,
          bgColor: "bg-blue-500/10",
          textColor: "text-blue-500"
        };
      case 'videoSolutions':
        return {
          title: "Video Solutions",
          count: subject.resources.videoSolutions.length,
          icon: <BookMarked className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />,
          bgColor: "bg-purple-500/10",
          textColor: "text-purple-500"
        };
      case 'notes':
        return {
          title: "Hand Written Notes",
          count: subject.resources.notes.length,
          icon: <FileDown className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />,
          bgColor: "bg-green-500/10",
          textColor: "text-green-500"
        };
      default:
        return {
          title: "Resources",
          count: 0,
          icon: <ListFilter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
          bgColor: "bg-primary/10",
          textColor: "text-primary"
        };
    }
  };

  const resourceInfo = getResourceInfo();

  return (
    <Card className="group border-muted/40 bg-card/80 hover:bg-card/95 transition-all duration-300 hover:shadow-lg">
      {/* Decorative elements - moved outside interactive areas */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-10 -top-10 pointer-events-none w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
      
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{subject.title}</CardTitle>
            <CardDescription className="text-muted-foreground/90">{subject.code}</CardDescription>
          </div>
        </div>
        <CardDescription className="mt-3 leading-relaxed">{subject.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs 
          defaultValue="questions" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* Enhanced TabsList with improved design for both mobile and desktop */}
          <div className="relative mb-8">
            {/* Decorative tab background with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl blur-md opacity-70 -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
            
            {/* Tab container with glass effect */}
            <div className="relative z-10 p-1.5 rounded-xl bg-background/60 backdrop-blur-sm border border-muted/40 shadow-sm overflow-hidden">
              {/* Active tab indicator - animated pill that moves */}
              <div 
                className="absolute h-[calc(100%-12px)] rounded-lg bg-primary/10 transition-all duration-300 ease-out shadow-sm" 
                style={{ 
                  width: '25%',
                  top: '6px',
                  left: activeTab === "questions" ? '0%' : 
                       activeTab === "videoSolutions" ? '25%' : 
                       activeTab === "videos" ? '50%' : '75%',
                  transform: activeTab === "questions" ? 'translateX(0%)' : 
                             activeTab === "videoSolutions" ? 'translateX(0%)' : 
                             activeTab === "videos" ? 'translateX(0%)' : 'translateX(0%)',
                  display: 'none',
                }}
              />
              
              {/* Tabs list with improved layout */}
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full bg-transparent">
                <TabsTrigger 
                  value="questions" 
                  className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg py-3 px-2 sm:px-3 font-medium text-xs sm:text-sm transition-all duration-200
                  data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-semibold
                  data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground/80
                  data-[state=inactive]:hover:bg-muted/30 relative z-10"
                >
                  <div className="bg-primary/10 p-1.5 rounded-md transition-colors data-[state=active]:bg-primary/20">
                    <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  </div>
                  <span className="sm:hidden">Papers</span>
                  <span className="hidden sm:inline">Question Papers</span>
                  {subject.resources.questions.length > 0 && (
                    <span className="ml-1 sm:ml-1.5 text-[10px] sm:text-xs bg-primary/10 text-primary px-1.5 rounded-full">
                      {subject.resources.questions.length}
                    </span>
                  )}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="videoSolutions" 
                  className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg py-3 px-2 sm:px-3 font-medium text-xs sm:text-sm transition-all duration-200
                  data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500 data-[state=active]:shadow-sm data-[state=active]:font-semibold
                  data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground/80
                  data-[state=inactive]:hover:bg-muted/30 relative z-10"
                >
                  <div className="bg-purple-500/10 p-1.5 rounded-md transition-colors data-[state=active]:bg-purple-500/20">
                    <BookMarked className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  </div>
                  <span className="sm:hidden">Solutions</span>
                  <span className="hidden sm:inline">Video Solutions</span>
                  {subject.resources.videoSolutions.length > 0 && (
                    <span className="ml-1 sm:ml-1.5 text-[10px] sm:text-xs bg-purple-500/10 text-purple-500 px-1.5 rounded-full">
                      {subject.resources.videoSolutions.length}
                    </span>
                  )}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="videos" 
                  className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg py-3 px-2 sm:px-3 font-medium text-xs sm:text-sm transition-all duration-200
                  data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500 data-[state=active]:shadow-sm data-[state=active]:font-semibold
                  data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground/80
                  data-[state=inactive]:hover:bg-muted/30 relative z-10"
                >
                  <div className="bg-blue-500/10 p-1.5 rounded-md transition-colors data-[state=active]:bg-blue-500/20">
                    <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  </div>
                  <span className="sm:hidden">Videos</span>
                  <span className="hidden sm:inline">Video Playlists</span>
                  {subject.resources.videos.length > 0 && (
                    <span className="ml-1 sm:ml-1.5 text-[10px] sm:text-xs bg-blue-500/10 text-blue-500 px-1.5 rounded-full">
                      {subject.resources.videos.length}
                    </span>
                  )}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="notes" 
                  className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg py-3 px-2 sm:px-3 font-medium text-xs sm:text-sm transition-all duration-200
                  data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500 data-[state=active]:shadow-sm data-[state=active]:font-semibold
                  data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground/80
                  data-[state=inactive]:hover:bg-muted/30 relative z-10"
                >
                  <div className="bg-green-500/10 p-1.5 rounded-md transition-colors data-[state=active]:bg-green-500/20">
                    <FileDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  </div>
                  <span className="sm:hidden">Notes</span>
                  <span className="hidden sm:inline">Hand Written Notes</span>
                  {subject.resources.notes.length > 0 && (
                    <span className="ml-1 sm:ml-1.5 text-[10px] sm:text-xs bg-green-500/10 text-green-500 px-1.5 rounded-full">
                      {subject.resources.notes.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          {/* Enhanced content container with better visual design */}
          <div className="bg-card/30 p-4 sm:p-5 rounded-xl border border-muted/30 backdrop-blur-[2px] shadow-sm relative">
            {/* Improved resource header with dynamic content based on active tab */}
            <div className={`flex items-center justify-between ${resourceInfo.bgColor} p-3 rounded-lg border border-muted/20 mb-4 sticky top-0 z-10`}>
              <h3 className="text-base sm:text-lg font-medium flex items-center gap-2">
                <div className={`${resourceInfo.bgColor} p-1.5 rounded-md`}>
                  {resourceInfo.icon}
                </div>
                <span>{resourceInfo.title}</span>
              </h3>
              <div className={`hidden sm:flex text-xs ${resourceInfo.bgColor} ${resourceInfo.textColor} px-2.5 py-1 rounded-full font-medium items-center gap-1`}>
                <Sparkles className="h-3 w-3" />
                <span>{resourceInfo.count} {resourceInfo.count === 1 ? 'Resource' : 'Resources'}</span>
              </div>
            </div>
            
            {/* Question Papers Tab Content */}
            <TabsContent value="questions" className="mt-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95">
              <ResourceList resources={subject.resources.questions} />
            </TabsContent>
            
            {/* Videos Tab Content */}
            <TabsContent value="videos" className="mt-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95">
              <ResourceList resources={subject.resources.videos} />
            </TabsContent>
            
            {/* Video Solutions Tab Content */}
            <TabsContent value="videoSolutions" className="mt-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95">
              <ResourceList resources={subject.resources.videoSolutions} />
            </TabsContent>
            
            {/* Notes Tab Content */}
            <TabsContent value="notes" className="mt-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95">
              <ResourceList resources={subject.resources.notes} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

