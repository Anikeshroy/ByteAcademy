export type ResourceType = {
  id: string
  title: string
  year: string
  type: "pdf" | "video" | "document" | "link"
  url: string
}

export type SubjectType = {
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

export type SemesterDataType = {
  id: number
  description: string
  subjects: SubjectType[]
}

