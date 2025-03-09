import type { SemesterDataType } from "./types";

// Mock data for the application
const semestersData: Record<number, SemesterDataType> = {
  // Semester 1
  1: {
    id: 1,
    description: "Foundation courses for engineering and computer science",
    subjects: [
      // Engineering Mathematics - I (Math)
      {
        id: "ma101",
        title: "Engineering Mathematics - I",
        code: "100102",
        description: "Paper Code 105102 changed by 100102",
        resources: {
          questions: [
            {
              id: "mq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/1Zi0YSGPyB6apEdnZmfsK_RJKgv_qO5ni/view?usp=sharing",
            },
            {
              id: "mq2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/1_nEDRmIAiXeYba6Y_sjl7d3BmdGRgeZN/view?usp=sharing",
            },
            {
              id: "mq3",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/1U9WqX9kBp4hJlEKwZTZCbpJoXEPTk2ZU/view?usp=sharing",
            },
            {
              id: "mq4",
              title: "End Semester Exam 2018",
              year: "2018",
              type: "pdf",
              url: "https://drive.google.com/file/d/1LHPFDDES2T8zwrVkFP4w93IEXp4HMWvp/view?usp=sharing",
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
      // Programming For Problem Solving (PPS)
      {
        id: "cs101",
        title: "Programming For Problem Solving (PPS)",
        code: "100111",
        description: "Paper Code 100104 changed by 100111",
        resources: {
          questions: [
            {
              id: "q1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/1_r2mjn1XEQz3A0BZmTuI9fXVzTo2M7jN/view?usp=sharing",
            },
            {
              id: "q2",
              title: "End Semester Exam 2022",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/1FeEScVUOAN0NJiT5ro1gm-ZpIOj6lrhV/view?usp=sharing",
            },
            {
              id: "q3",
              title: "End Semester Exam 2020",
              year: "2020",
              type: "pdf",
              url: "https://drive.google.com/file/d/1Wf6UgEuzEJqQG6_Tx9Kf3xbo-tz1POHx/view?usp=sharing",
            },
            {
              id: "q4",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/1jIJOMLNYqPjXHAjbaAccn8hiqXtsGQve/view?usp=sharing",
            },
            {
              id: "q5",
              title: "End Semester Exam 2018",
              year: "2018",
              type: "pdf",
              url: "https://drive.google.com/file/d/1CT0SmIfLR2QEl4vr7Li0jgDHrv1f5maB/view?usp=sharing",
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
      // Basic Electronics Engineering (BEE)
      {
        id: "cs101",
        title: "Basic Electronics Engineering (BEE)",
        code: "100114",
        description: "Paper Code 100201 changed by 100114",
        resources: {
          questions: [
            {
              id: "q1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/1BSWfruyrKBgp7GTsuGJNTvroVgHKk-Un/view?usp=sharing",
            },
            {
              id: "q2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/1DpGd3DqkLe6Yb_LMZyX0iJ4PeJNzS3gu/view?usp=sharing",
            },
            {
              id: "q3",
              title: "End Semester Exam 2021",
              year: "2021",
              type: "pdf",
              url: "https://drive.google.com/file/d/1KFVWN6Bl0XRX7kZ2ldl3SGFnMgmuoYLd/view?usp=sharing",
            },
            {
              id: "q4",
              title: "End Semester Exam 2020",
              year: "2020",
              type: "pdf",
              url: "https://drive.google.com/file/d/16Hsz9i3lNv6RkjgWirEt1CQSdQ_fQYDg/view?usp=sharing",
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
      // Engineering Physics (Physics)
      {
        id: "cs101",
        title: "Engineering Physics",
        code: "100110",
        description: "New Subject Added",
        resources: {
          //PYQ
          questions: [],
          // Suggested Playlist
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
          // Video Solutions
          videoSolutions: [],
          // Notes
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
      // IT Workshop
      {
        id: "ma101",
        title: "IT Workshop",
        code: "100113",
        description: "New Subject Added",
        resources: {
          questions: [],
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
  // Semester 2
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
  // Semester 3
  3: {
    id: 3,
    description:
      "Core computer science subjects focusing on algorithms and systems",
    subjects: [
      {
        id: "cs301",
        title: "Design and Analysis of Algorithms",
        code: "CS301",
        description:
          "Study of algorithm design paradigms and complexity analysis",
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
  // Semester 4
  4: {
    id: 4,
    description: "Operating systems, databases, and computer architecture",
    subjects: [
      {
        id: "cs401",
        title: "Operating Systems",
        code: "CS401",
        description:
          "Concepts of operating systems, processes, and memory management",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
  // Semester 5
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
  // Semester 6
  6: {
    id: 6,
    description: "Computer networks, security, and distributed systems",
    subjects: [
      {
        id: "cs601",
        title: "Computer Networks",
        code: "CS601",
        description:
          "Network architectures, protocols, and internet applications",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
  // Semester 7
  7: {
    id: 7,
    description:
      "Advanced topics in AI, machine learning, and web technologies",
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
  // Semester 8
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
};

export function getSemesterData(semesterId: number): SemesterDataType {
  return semestersData[semesterId];
}
