import type { SemesterDataType } from "./types"

// Mock data for the application
const semestersData: Record<number, SemesterDataType> = {
  1: {
    id: 1,
    description: "Foundation courses for engineering and computer science",
    subjects: [
      {
        id: "cs101",
        title: "Introduction to Programming",
        code: "CS101",
        description: "Basic concepts of programming using C language",
        resources: {
          questions: [
            {
              id: "q1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://www.youtube.com/",
            },
            {
              id: "q2",
              title: "Mid Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "#",
            },
            {
              id: "q3",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "#",
            },
          ],
          videos: [
            {
              id: "v1",
              title: "C Programming Basics",
              year: "2023",
              type: "video",
              url: "https://youtube.com",
            },
            {
              id: "v2",
              title: "Control Structures in C",
              year: "2023",
              type: "video",
              url: "https://youtube.com",
            },
          ],
          videoSolutions: [
            {
              id: "vs1",
              title: "Solution to 2023 Paper",
              year: "2023",
              type: "video",
              url: "https://youtube.com",
            },
          ],
          notes: [
            {
              id: "n1",
              title: "C Programming Complete Notes",
              year: "2023",
              type: "document",
              url: "#",
            },
            {
              id: "n2",
              title: "Arrays and Pointers Notes",
              year: "2022",
              type: "document",
              url: "#",
            },
          ],
        },
      },
      {
        id: "ma101",
        title: "Engineering Mathematics I",
        code: "MA101",
        description: "Calculus and Linear Algebra",
        resources: {
          questions: [
            {
              id: "mq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "#",
            },
            {
              id: "mq2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "#",
            },
          ],
          videos: [
            {
              id: "mv1",
              title: "Calculus Playlist",
              year: "2023",
              type: "video",
              url: "https://youtube.com",
            },
          ],
          videoSolutions: [],
          notes: [
            {
              id: "mn1",
              title: "Calculus Handwritten Notes",
              year: "2023",
              type: "document",
              url: "#",
            },
          ],
        },
      },
    ],
  },
  2: {
    id: 2,
    description: "Programming fundamentals and engineering mathematics",
    subjects: [
      {
        id: "cs201",
        title: "Data Structures",
        code: "CS201",
        description: "Introduction to data structures and algorithms",
        resources: {
          questions: [
            {
              id: "dsq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "#",
            },
          ],
          videos: [
            {
              id: "dsv1",
              title: "Data Structures Full Course",
              year: "2023",
              type: "video",
              url: "https://youtube.com",
            },
          ],
          videoSolutions: [],
          notes: [
            {
              id: "dsn1",
              title: "Complete DS Notes",
              year: "2023",
              type: "document",
              url: "#",
            },
          ],
        },
      },
    ],
  },
  3: {
    id: 3,
    description: "Core computer science subjects focusing on algorithms and systems",
    subjects: [
      {
        id: "cs301",
        title: "Design and Analysis of Algorithms",
        code: "CS301",
        description: "Study of algorithm design paradigms and complexity analysis",
        resources: {
          questions: [
            {
              id: "algoq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "#",
            },
          ],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
  4: {
    id: 4,
    description: "Operating systems, databases, and computer architecture",
    subjects: [
      {
        id: "cs401",
        title: "Operating Systems",
        code: "CS401",
        description: "Concepts of operating systems, processes, and memory management",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
  5: {
    id: 5,
    description: "Software engineering practices and advanced programming",
    subjects: [
      {
        id: "cs501",
        title: "Software Engineering",
        code: "CS501",
        description: "Software development life cycle and methodologies",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
  6: {
    id: 6,
    description: "Computer networks, security, and distributed systems",
    subjects: [
      {
        id: "cs601",
        title: "Computer Networks",
        code: "CS601",
        description: "Network architectures, protocols, and internet applications",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
  7: {
    id: 7,
    description: "Advanced topics in AI, machine learning, and web technologies",
    subjects: [
      {
        id: "cs701",
        title: "Artificial Intelligence",
        code: "CS701",
        description: "Introduction to AI concepts and applications",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
  8: {
    id: 8,
    description: "Capstone projects and specialized electives",
    subjects: [
      {
        id: "cs801",
        title: "Capstone Project",
        code: "CS801",
        description: "Full-semester practical project implementation",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
}

export function getSemesterData(semesterId: number): SemesterDataType {
  return semestersData[semesterId]
}

