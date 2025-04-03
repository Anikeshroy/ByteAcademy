import type { SemesterDataType } from "./types";

// Mock data for the application
const semestersData: Record<number, SemesterDataType> = {
  // ============================================================================================
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
              title: "Engineering Mathematics Playlist",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLk8iONg3m4mxWjxJu6wo2ZmtFTjF9IHIe&si=5pWPbfJMsksNRLtf",
            },

            {
              id: "mv1",
              title: "Engineering Mathematics Playlist",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLT3bOBUU3L9hsRRQi1X_4kn6Lw6K_-9cq&si=S143SIE9mryOHdA_",
            },
          ],
          videoSolutions: [
            // {
            //   id: "mv1",
            //   title: "Engineering Mathematics Playlist",
            //   year: "2023",
            //   type: "video",
            //   url: "#",
            // },
          ],
          notes: [
            // {
            //   id: "mn1",
            //   title: "Calculus Handwritten Notes",
            //   year: "2023",
            //   type: "document",
            //   url: "#",
            // },
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
              title: "Introduction to C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5xKBIOkZUsgk6OcD3yK5nu_&si=DXPuqDp4n0Rh1HD8",
            },
            {
              id: "v2",
              title: "Operator in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zdc7DrtIBTNj2B_k8x-F6o&si=0RL1c1adOGRIj3aS",
            },
            {
              id: "v2",
              title: "Conditional Branching & Loops in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5yUNvCX5Hh_V1YBclbQLnIy&si=ZjjzpPW-UtrFd3AX",
            },
            {
              id: "v2",
              title: "Arrays in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5xIrTIwYk5gsJd2qWqC9uzJ&si=ebmj3hnQsfnOPY1N",
            },

            {
              id: "v2",
              title: "Functions in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zf3oHzO8RRhM02Rcd_lvaK&si=-HPz-6umHoovOYeT",
            },
            {
              id: "v2",
              title: "Recursion in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5xycpxiqdREe0sP7A4sETm9&si=Fjgqr2OVwxEuz8ng",
            },
            {
              id: "v2",
              title: "Structure & Union in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zVnU0y19P-bpHccfYxGpB1&si=XdrDtQ8v672aSfgQ",
            },
            {
              id: "v2",
              title: "Pointers in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5whe-NPRoXsGKIyrapO3MlC&si=hf1Tkj7G9y2Yi3g0",
            },
            {
              id: "v2",
              title: "File Handling in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5yHY0k85AQX_VJ7PBfE7nd7&si=bhT5eSNiI7w2w70-",
            },
            {
              id: "v2",
              title: "Dynamic Memory Allocation in C Programming",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5wYbrrfnNCMzSXAuEcq1Olu&si=My6kBwb9GO4QRLuK",
            },
          ],
          videoSolutions: [
            {
              id: "vs0",
              title: "Solution of 2023 Paper",
              year: "2021",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zrcx7EJTTXrNuaHB8rQ8_t&si=8yGcbdbPWBRdlkzx",
            },
            {
              id: "vs1",
              title: "Solution of 2021 Paper",
              year: "2021",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5wx4B1v5yU3bkj_YkEIUsza&si=QXsODJhYFCGVRoix",
            },
            {
              id: "vs2",
              title: "Solution of 2020 Paper",
              year: "2020",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5y1eFkXptLyYJNKsWSxGcmt&si=KOifXAxaVpH440XU",
            },
            {
              id: "vs3",
              title: "Solution of 2019 Paper",
              year: "2019",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zBUGR6mdYV6fDyNyP6acHJ&si=OwEuXCBjDkhh674g",
            },
            {
              id: "vs4",
              title: "Solution of 2018 Paper",
              year: "2018",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5w7fDYiESa88BDenpAHX-X_&si=xtaz-n8sBZnx2Vq5",
            },
            {
              id: "vs5",
              title: "All Solution in One Playlist",
              year: "2018",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5yuZvXWaoUT1KpquQZq3zDh&si=dhlsMZyeJVkIQFap",
            },
          ],
          notes: [
            {
              id: "n1",
              title: "C Programming Complete Notes",
              year: "2023",
              type: "document",
              url: "https://topperworld.in/media/2022/11/C-handwritten-Notes.pdf",
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
              title: "Basic Electrical Engineering Playlist",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PL9RcWoqXmzaLTYUdnzKhF4bYug3GjGcEc&si=cZT3VAfBmA0UBijh",
            },
          ],
          videoSolutions: [
            {
              id: "vs1",
              title: "Solution of 2022 Paper",
              year: "2022",
              type: "video",
              url: "https://www.youtube.com/live/rMxFlLZbqvo?si=R2n4NrKpGI5_6X_Z",
            },
            {
              id: "vs1",
              title: "Solution of 2021 Paper",
              year: "2021",
              type: "video",
              url: "https://youtube.com/playlist?list=PLe-nWswqJMmVUW4LDU3V8_f-gCCjpwDbs&si=-YuaFqfDGPIq7nm_",
            },
          ],
          notes: [
            // {
            //   id: "n1",
            //   title: "C Programming Complete Notes",
            //   year: "2023",
            //   type: "document",
            //   url: "#",
            // },
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
            // {
            //   id: "v1",
            //   title: "C Programming Basics",
            //   year: "2023",
            //   type: "video",
            //   url: "https://youtube.com",
            // },
          ],
          // Video Solutions
          videoSolutions: [
            // {
            //   id: "v1",
            //   title: "C Programming Basics",
            //   year: "2023",
            //   type: "video",
            //   url: "https://youtube.com",
            // },
          ],
          // Notes
          notes: [
            // {
            //   id: "n1",
            //   title: "C Programming Complete Notes",
            //   year: "2023",
            //   type: "document",
            //   url: "#",
            // },
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
              title: "Unit - 1 PC Hardware",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zQzb-DVf-meddnlaxjELgt&si=damAhet4naiFpo_C",
            },
            {
              id: "mv1",
              title: "Unit - 2 Internet",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5xyz_CP5Qa11HHLXRajWIeZ&si=Vi8MicT291PduK9s",
            },
            {
              id: "mv1",
              title: "Unit - 3 MS Word",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5yTC3izvET_SICgnNt7PmbO&si=Ef7-BxF-RPiXfvSQ",
            },
            {
              id: "mv1",
              title: "Unit - 4 LaTeX",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5xx13D1aKmdNUTGTEkK-LG7&si=V126g_oO_CAbrSES",
            },
            {
              id: "mv1",
              title: "Unit - 5 MS Excel",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zEgjxbAWK5EA5ay00jvUIW&si=RiObqhR5GsLQ6bN3",
            },
            {
              id: "mv1",
              title: "Unit - 6 MS Powerpoint",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5wBDQmYS532AV2jq5hYKCHT&si=O59XilXAD0SbWRBf",
            },
          ],
          videoSolutions: [],
          notes: [],
        },
      },
    ],
  },
  // =============================================================================================
  // Semester 2
  2: {
    id: 2,
    description: "Programming fundamentals and engineering mathematics",
    subjects: [
      {
        id: "cs201",
        title: "Engineering Mathematics - II",
        code: "100202",
        description: "Paper Code 105202 changed by 100102",
        resources: {
          questions: [
            // {
            //   id: "dsq1",
            //   title: "End Semester Exam 2023",
            //   year: "2023",
            //   type: "pdf",
            //   url: "#",
            // },
          ],
          videos: [
            // {
            //   id: "dsv1",
            //   title: "Engineering Mathematics - II Full Course",
            //   year: "2023",
            //   type: "video",
            //   url: "https://youtube.com",
            // },
          ],
          videoSolutions: [
            // {
            //   id: "dsv1",
            //   title: "Engineering Mathematics - II Full Course",
            //   year: "2023",
            //   type: "video",
            //   url: "https://youtube.com",
            // },
          ],
          notes: [
            // {
            //   id: "dsn1",
            //   title: "Complete Engineering Mathematics - II Notes",
            //   year: "2023",
            //   type: "document",
            //   url: "#",
            // },
          ],
        },
      },

      {
        id: "cs202",
        title: "Python Programming",
        code: "100218",
        description: "New Syllabus Added",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },

      {
        id: "cs203",
        title: "Engineering Chemistry",
        code: "100215",
        description: "Paper Code 100103 changed by 100215",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },

      {
        id: "cs204",
        title: "Communicative English",
        code: "100216",
        description: "New Syllabus Added",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },

      {
        id: "cs205",
        title: "Introduction to Web Design",
        code: "100219",
        description: "New Syllabus Added",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
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
        title: "Analog Electronic Circuits",
        code: "100302",
        description:
          "Study of Analog Electronic Circuits and their applications",
        resources: {
          questions: [
            {
              id: "algoq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/1igUbFFkGTK9kfbt_mH5q4bIhgqnFqwmt/view?usp=sharing",
            },
            {
              id: "algoq1",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/1-Wy1Msi2kErUkOWFJMH2NJYasVfd7-0M/view?usp=sharing",
            },
            {
              id: "algoq1",
              title: "End Semester Exam 2020",
              year: "2020",
              type: "pdf",
              url: "https://drive.google.com/file/d/16AHcpIVpJYdOfq9OzpZ2lPsycDhsSAIC/view?usp=sharing",
            },
            {
              id: "algoq1",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/1SS-JP4nbCHhGhxeTkO0SEZL2UKw3y-dB/view?usp=sharing",
            },
          ],
          videos: [],
          videoSolutions: [
            {
              id: "dsv1",
              title: "Solution Of 2022 Paper",
              year: "2022",
              type: "video",
              url: "https://youtube.com/playlist?list=PLbCAq4ggAQuED_qF3-7QVpr__ZQMHZB9M&si=K3D1KmVJAaPDAg9g",
            },
          ],
          notes: [],
        },
      },

      {
        id: "cs302",
        title: "Dara Structure And Algorithms",
        code: "100304",
        description: "Study of Data Structure and Algorithms",
        resources: {
          questions: [
            {
              id: "dsaq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/1L3iXxEuRTfnwzS96wswFjy2OPbqTA-WU/view?usp=sharing",
            },
            {
              id: "dsaq1",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/1qp6omIuUw_BdjQro0DXi77sxfFK1eAfz/view?usp=sharing",
            },
            {
              id: "dsaq1",
              title: "End Semester Exam 2020",
              year: "2020",
              type: "pdf",
              url: "https://drive.google.com/file/d/1XIT3kVdCLM25iYrA0NKhaZ2SA9uwT2zh/view?usp=sharing",
            },
            {
              id: "dsaq1",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/1HX2f8KXSWpVuZAA4-AMUftm3kOM49-mv/view?usp=sharing",
            },
          ],
          videos: [
            {
              id: "dsv1",
              title: "DSA One Shot",
              year: "2023",
              type: "video",
              url: "https://youtu.be/J0OvDNmAWNw?si=fV1sxOhAl8uvBLno",
            },

            {
              id: "dsv1",
              title: "Complete DSA By Gate Smashers",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT&si=bJTQnQQQg-LdJVXM",
            },

            {
              id: "dsv1",
              title: "Complete DSA By Strivers",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&si=OkKfOzxYLoSP8FA8",
            },

          ],
          videoSolutions: [
            {
              id: "dsv1",
              title: "Solution Of 2022 Paper",
              year: "2022",
              type: "video",
              url: "https://youtube.com/playlist?list=PLbCAq4ggAQuFESrMepMxrcxbKZMW-unTn&si=xPUZ65AkV27YU67h",
            },
            {
              id: "dsv1",
              title: "Solution Of 2021 Paper",
              year: "2021",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5yoNLgzrrk8uPyuhlOAhmMf&si=LALrZ6e847cr-ogg",
            },
            {
              id: "dsv1",
              title: "Solution Of 2020 Paper",
              year: "2020",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5xqtgnl44dAItU1eAHgseUz&si=mmZ440mmZJjQJQLJ",
            },
            {
              id: "dsv1",
              title: "Solution Of 2019 Paper",
              year: "2019",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5yhxzm7bwShZjk1ELr5wmkK&si=R004qoDvaDga7d2W",
            },
          ],
          notes: [],
        },
      },

      {
        id: "cs303",
        title: "Object Oriented Programming Using C++",
        code: "100313",
        description: "Concetps of OOP using C++",
        resources: {
          questions: [
            {
              id: "oopsq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/1Rmw-rhK2IYXRJwnrHC7ECyV6odJpmR-k/view?usp=sharing",
            },
            {
              id: "oopsq1",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/1SG9kfwMc98cud77cO91cibQnc2aj4gL3/view?usp=sharing",
            },
            {
              id: "oopsq1",
              title: "End Semester Exam 2020",
              year: "2020",
              type: "pdf",
              url: "https://drive.google.com/file/d/1pRKs0q9tKtNbV7I4i1mcYvcT1keqtz3m/view?usp=sharing",
            },
            {
              id: "oopsq1",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/1YgYSFatWASb6X9dK0jH29tsZPEql7pdU/view?usp=sharing",
            },
          ],
          videos: [
            {
              id: "oopsv1",
              title: "Oops Using C++ (Complete Playlist by KKS CS)",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zoShL4_oFcxgQupE8WavCM&si=EgJyAHow6aLC8Xk6",
            },

            {
              id: "oopsv1",
              title: "OOPS using C++ Complete PLaylist",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLfVsf4Bjg79DLA5K3GLbIwf3baNVFO2Lq&si=4aMpnDraP2mmkEL-",
            },
          ],
          videoSolutions: [
            {
              id: "dsv1",
              title: "Solution Of 2022 Paper",
              year: "2022",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5yxRtw_9e3KzgXY9szJSZZ2&si=2BOyzJmZ23ExvxG1",
            },
            {
              id: "dsv1",
              title: "Solution Of 2021 Paper",
              year: "2021",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zwqOytuUtSg6fegn_q2tXY&si=AbLYMI9CxXHWHd16",
            },
            {
              id: "dsv1",
              title: "Solution Of 2020 Paper",
              year: "2020",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5zAV__NPp_wyGddko_zPVPq&si=m7byaj9T7zTSftx6",
            },
            {
              id: "dsv1",
              title: "Solution Of 2019 Paper",
              year: "2019",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5wB_593hOGBpGygKAUNcjYz&si=hH05GRf8sZwEAmAC",
            },
            {
              id: "dsv1",
              title: "Solution Of 2018 Paper",
              year: "2018",
              type: "video",
              url: "https://youtube.com/playlist?list=PLur0XnH30m5yQ7RELDFkvZEedO_rSv2mJ&si=XkUwROQ4NfbNdOB8",
            },
          ],
          notes: [],
        },
      },

      {
        id: "cs304",
        title: "Mathematics - III (DIFFERENTIAL CALCULUS)",
        code: "100311",
        description: "Differentiation Integration and its applications",
        resources: {
          questions: [
            {
            id: "mthq1",
            title: "End Semester Exam 2022",
            year: "2022",
            type: "pdf",
            url: "https://drive.google.com/file/d/1FTFeOU3UkI2Pm3EU_ISUgQdU9bCd5N4d/view?usp=sharing",
          },
            {
            id: "mthq1",
            title: "End Semester Exam 2020",
            year: "2020",
            type: "pdf",
            url: "https://drive.google.com/file/d/1KgJGb4SWr3azmWhV1_omv_WytvYlSQJM/view?usp=sharing",
          },
        ],
          videos: [
            {
              id: "mthv1",
              title: "Differential Calculus Complete Playlist",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLnLMKD-oEX1wC0OnX6FjURUI-m6nfOskD&si=uL30AFcBcNOm9Y2p",
            },
          ],
          videoSolutions: [],
          notes: [],
        },
      },

      {
        id: "cs305",
        title: "Technical Writing",
        code: "100314",
        description: "Study of Technical Writing and its applications",
        resources: {
          questions: [
            {
              id: "twq1",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/13fAL7g6sHYLm653300ftLzGzTDjGNko-/view?usp=sharing",
            },
            {
              id: "twq1",
              title: "End Semester Exam 2020",
              year: "2020",
              type: "pdf",
              url: "https://drive.google.com/file/d/1KynGrhyO10n2N80txeT1ouxDZdkFu8_Z/view?usp=sharing",
            },
            {
              id: "twq1",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/1A8nBpsAmxWcBVsHhIypAkwhaEXtXRDHc/view?usp=sharing",
            },
          ],
          videos: [
            {
              id: "twv1",
              title: "Technical Writing Complete Playlist",
              year: "2023",
              type: "video",
              url: "https://youtube.com/playlist?list=PLbCAq4ggAQuFlnr-ag__VmL-cRJn4sgzd&si=6MA8ASJTD0AbowPz",
            },
          ],
          videoSolutions: [
            {
              id: "twv1",
              title: "Solution Of 2022 Paper",
              year: "2022",
              type: "video",
              url: "https://youtube.com/playlist?list=PLbCAq4ggAQuErAqle6UgpHnwvrJYcQ_Bc&si=ljPE0RGIWjxtJSmx",
            },
            
          ],
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
        title: "Discrete Mathematics",
        code: "100401",
        description: "Study of discrete mathematical structures and their applications in computer science",
        resources: {
          questions: [
            {
              id: "dmq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/11Ka5njZOTRJt7dP5tZ8EzuZf8re6BdkW/view",
            },
            {
              id: "dmq2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/11NqrlPW6KMocjzCHPG9bDF3LaTzKo634/view",
            },
            {
              id: "dmq3",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/16wbgCF85FtHQK5r3RDC5aMxYspJR6teX/view",
            },
            {
              id: "dmq4",
              title: "End Semester Exam 2018",
              year: "2018",
              type: "pdf",
              url: "https://drive.google.com/file/d/16tQ4OCvDCJ5FmwFNScunQ-_vNB1shUHs/view",
            },
          ],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs402",
        title: "Computer Organisation And Architecture",
        code: "100402",
        description: "Study of computer hardware organization and architecture",
        resources: {
          questions: [
            {
              id: "coaq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/11Pe3TOPEea2MdpDASWHxkyJ3ucrI_nfV/view",
            },
            {
              id: "coaq2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/11O265B8tAJBX5eWUa-93Qb2f3LLo8JEf/view",
            },
            {
              id: "coaq3",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/16oFao_uxJ_JHv0oc_nW8ete6KMbt35Gi/view",
            },
            {
              id: "coaq4",
              title: "End Semester Exam 2018",
              year: "2018",
              type: "pdf",
              url: "https://drive.google.com/file/d/16owoxRXfdFp4sY8mW_ffMnQax-hSydAw/view",
            },
            {
              id: "coaq5",
              title: "End Semester Exam 2017",
              year: "2017",
              type: "pdf",
              url: "https://drive.google.com/file/d/16piHOWNoWyObwTrwvd67q4Ip-P2zOd2f/view",
            },
          ],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs403",
        title: "Operating System",
        code: "100403",
        description: "Concepts of operating systems, processes, and memory management",
        resources: {
          questions: [
            {
              id: "osq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/11eLIif2qFx7UK8hUSh7YSgnZmBsUX-38/view",
            },
            {
              id: "osq2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/11mEArRYYnYjke9dKCdX37QOC8KaH3T5D/view",
            },
          ],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs404",
        title: "Design And Analysis of Algorithm",
        code: "100404",
        description: "Study of algorithm design techniques and complexity analysis",
        resources: {
          questions: [
            {
              id: "daaq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/11Ri0hkm5jI0h0pAEnpXobFfhYjojtLVt/view",
            },
            {
              id: "daaq2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/11XSei076bhwJYcFOlwarKFkEIzU3UGxk/view",
            },
            {
              id: "daaq3",
              title: "End Semester Exam 2020",
              year: "2020",
              type: "pdf",
              url: "https://drive.google.com/file/d/16dPTsq-XsS3Af0EOwtZ9EMjefIFXxNmH/view",
            },
            {
              id: "daaq4",
              title: "End Semester Exam 2019",
              year: "2019",
              type: "pdf",
              url: "https://drive.google.com/file/d/16aZFKPqmiBvTbPM4VgezZtMchOnKuz7j/view",
            },
            {
              id: "daaq5",
              title: "End Semester Exam 2018",
              year: "2018",
              type: "pdf",
              url: "https://drive.google.com/file/d/16bCue0xuzVlaAPI5qkOWZNY4_fhPfNLC/view",
            },
          ],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs405",
        title: "Digital Electronics",
        code: "100405",
        description: "Study of digital circuits and logic design",
        resources: {
          questions: [
            {
              id: "deq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/11pWB1EkaR4o80x0j79--B1Dfs35yX6o0/view",
            },
            {
              id: "deq2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/11njZkmRF4Cggj4tw7T8U1kZoJ0cv4CNp/view",
            },
          ],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs406",
        title: "Human Resources Development And Organisational Behaviour",
        code: "100406",
        description: "Understanding organizational behavior and HR management principles",
        resources: {
          questions: [
            {
              id: "hrdq1",
              title: "End Semester Exam 2023",
              year: "2023",
              type: "pdf",
              url: "https://drive.google.com/file/d/16DnSOmdceCio2ZOhFJD7D1Gtwm-T--6R/view",
            },
            {
              id: "hrdq2",
              title: "End Semester Exam 2022",
              year: "2022",
              type: "pdf",
              url: "https://drive.google.com/file/d/16E-B9mMgjdMhwAlShGao1ZT2y36ot_tE/view",
            },
          ],
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
    description: "Advanced computer science subjects and program electives",
    subjects: [
      {
        id: "cs501",
        title: "Database Management System",
        code: "157501",
        description: "Study of database design, management, and SQL",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs502",
        title: "Artificial Intelligence",
        code: "157502",
        description: "Introduction to AI concepts, techniques, and applications",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs503",
        title: "Computer Network",
        code: "157503",
        description: "Study of network protocols, architectures, and applications",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs504",
        title: "Machine Learning",
        code: "157504",
        description: "Introduction to machine learning algorithms and applications",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs505",
        title: "Seminar",
        code: "157505",
        description: "Research presentation and technical communication",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs506",
        title: "Pattern Recognition",
        code: "157506",
        description: "Program Elective - Study of pattern recognition techniques and applications",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs507",
        title: "Software Engineering",
        code: "157507",
        description: "Program Elective - Software development methodologies and practices",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs508",
        title: "Emerging Web Technology",
        code: "157508",
        description: "Program Elective - Latest trends and technologies in web development",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs509",
        title: "Digital Signal Processing",
        code: "157509",
        description: "Program Elective - Study of digital signal processing techniques",
        resources: {
          questions: [],
          videos: [],
          videoSolutions: [],
          notes: [],
        },
      },
      {
        id: "cs510",
        title: "Artificial Neural Network",
        code: "157510",
        description: "Program Elective - Study of neural networks and deep learning",
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
    description: "Waiting for updated syllabus from university",
    subjects: [
      {
        id: "cs601",
        title: "Syllabus Update Pending",
        code: "157601",
        description: "Course details will be updated once the university releases the new syllabus",
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
    description: "Waiting for updated syllabus from university",
    subjects: [
      {
        id: "cs701",
        title: "Syllabus Update Pending",
        code: "157701",
        description: "Course details will be updated once the university releases the new syllabus",
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
    description: "Waiting for updated syllabus from university",
    subjects: [
      {
        id: "cs801",
        title: "Syllabus Update Pending",
        code: "157801",
        description: "Course details will be updated once the university releases the new syllabus",
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
