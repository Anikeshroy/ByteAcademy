import { Github, Linkedin, Instagram, Mail, ExternalLink, Youtube, FileText, BookOpen } from "lucide-react"
import Image from "next/image"
import profilepic from "/assets/ani1.jpg"
import rahulAvatar from "/assets/rahul.jpg" // Replace with actual path
import sanjeevAvatar from "/assets/sanjeev.jpg" // Replace with actual path
import shivamAvatar from "/assets/shivam.jpeg" // Replace with actual path
import { Button } from "@/components/ui/button"
import type { Metadata } from 'next'

// Update contributor data with directly imported images
const contributors = [
  {
    name: "Rahul Kumar",
    college: "GEC Jamui",
    batch: "2022-2026",
    contribution: "Video Lectures",
    avatar: rahulAvatar,
    icon: <Youtube className="h-4 w-4 text-red-500" />,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    name: "Sanjeev Ranjan",
    college: "GEC Jamui",
    batch: "2022-2026",
    contribution: "Handwritten Notes",
    avatar: sanjeevAvatar,
    icon: <BookOpen className="h-4 w-4 text-green-500" />,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    name: "Shivam Jaiswal",
    college: "GEC Jamui",
    batch: "2023-2027",
    contribution: "Question Papers",
    avatar: shivamAvatar,
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  }
]

export const metadata: Metadata = {
  title: 'About ByteAcademy - CSE Resources',
  description: 'Learn more about ByteAcademy and our mission to provide quality CSE resources.',
  openGraph: {
    title: 'About ByteAcademy - CSE Resources',
    description: 'Learn more about ByteAcademy and our mission to provide quality CSE resources.',
    url: 'https://byte-academy-peach.vercel.app/about',
    images: ['/export.png'],
  },
  twitter: {
    title: 'About ByteAcademy - CSE Resources',
    description: 'Learn more about ByteAcademy and our mission to provide quality CSE resources.',
    images: ['/export.png'],
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 overflow-x-clip">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Profile section with improved design */}
        <div className="relative">
          {/* Enhanced background decorative elements */}
          <div className="absolute top-0 right-0 md:-right-10 w-40 md:w-64 h-40 md:h-64 bg-primary/5 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '15s' }}></div>
          <div className="absolute bottom-0 left-0 md:-left-10 w-40 md:w-64 h-40 md:h-64 bg-primary/5 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 md:w-24 md:h-24 bg-blue-500/5 rounded-full blur-2xl opacity-60 animate-pulse" style={{ animationDuration: '12s' }}></div>
          
          <div className="relative z-10 bg-card/80 backdrop-blur-sm border border-muted/30 rounded-2xl p-6 md:p-10 shadow-lg">
            {/* Two-column layout with improved spacing */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-stretch">
              {/* Left column: Profile image with enhanced design */}
              <div className="relative group w-full md:w-auto flex-shrink-0 md:flex md:flex-col mt-6 md:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-muted/30 flex flex-col justify-center h-full">
                  {/* Animated rings around avatar */}
                  <div className="relative mx-auto mt-4 md:mt-0">
                    <div className="absolute inset-0 -m-3 bg-gradient-to-tr from-primary/40 via-blue-500/40 to-primary/40 rounded-full animate-spin-slow" style={{ animationDuration: '12s' }}></div>
                    <div className="absolute inset-0 -m-6 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-primary/20 rounded-full animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
                    
                    {/* Avatar with border */}
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-xl mx-auto">
                      <Image
                        src={profilepic}
                        width={192}
                        height={192}
                        alt="Anikesh Roy"
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Social links with improved design - increased spacing */}
                  <div className="mt-12 flex justify-center gap-3">
                    <a
                      href="https://www.linkedin.com/in/anikesh-roy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-background border border-muted/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                    >
                      <Linkedin className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href="https://www.instagram.com/call__me.ani/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-background border border-muted/40 text-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                    >
                      <Instagram className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href="https://github.com/Anikeshroy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-background border border-muted/40 text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                    >
                      <Github className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href="mailto:anikeshroy62040@gmail.com"
                      className="p-3 rounded-full bg-background border border-muted/40 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                    >
                      <Mail className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      <span className="sr-only">Email</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Right column: Content with improved design */}
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2">Anikesh Roy</h1>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <span>Full Stack Developer</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                  </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-base md:text-lg leading-relaxed">
                    Hello! I'm Anikesh, a Computer Science Engineering student and developer of ByteAcademy.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Connect with me on social media or email for suggestions to improve it!
                  </p>
                </div>
                
                {/* Project info section with improved design */}
                <div className="bg-primary/5 rounded-xl p-5 backdrop-blur-sm border border-muted/20">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span>About ByteAcademy</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    ByteAcademy is designed to simplify access to educational resources, providing a centralized platform for students to find study materials, question papers, video lectures, and notes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground group w-full sm:w-auto">
                      <a href="/" className="flex items-center justify-center">
                        <span>Explore Resources</span>
                        <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto group">
                      <a href="mailto:anikeshroy62040@gmail.com?subject=ByteAcademy%20Feedback" className="flex items-center justify-center">
                        <span>Send Feedback</span>
                        <Mail className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contributors list with modern design */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-muted/30 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-muted/20">
            <h3 className="text-lg font-medium">Our Contributors</h3>
            <p className="text-sm text-muted-foreground mt-1">People who have contributed to ByteAcademy</p>
          </div>
          
          <div className="divide-y divide-muted/20">
            {contributors.map((contributor, index) => (
              <div key={index} className="p-4 sm:p-6 flex items-center gap-4 hover:bg-muted/20 transition-colors">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`absolute inset-0 rounded-full blur-sm ${contributor.bgColor} animate-pulse`} style={{ animationDuration: '3s' }} />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-background">
                    <Image
                      src={contributor.avatar}
                      alt={contributor.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-semibold truncate">{contributor.name}</h4>
                      <p className="text-sm text-muted-foreground">{contributor.college} • {contributor.batch}</p>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${contributor.bgColor} ${contributor.color} self-start sm:self-center`}>
                      {contributor.icon}
                      <span>{contributor.contribution}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="p-4 sm:p-6 bg-muted/20 border-t border-muted/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-medium">Want to contribute?</h4>
              <p className="text-sm text-muted-foreground">Join our team of contributors and help students access better resources</p>
            </div>
            <Button asChild className="whitespace-nowrap self-start sm:self-auto">
              <a href="mailto:anikeshroy62040@gmail.com?subject=ByteAcademy%20Contribution" className="flex items-center gap-2">
                <span>Contact Us</span>
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


