import { Github, Linkedin, Instagram, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"
import profilepic from "/assets/ani1.jpg"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '15s' }}></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '20s' }}></div>
          
          <div className="relative z-10 bg-card/60 backdrop-blur-sm border border-muted/30 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Profile image with animated border */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/50 to-primary/20 rounded-full animate-spin-slow opacity-70" style={{ animationDuration: '8s' }}></div>
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background">
                  <Image
                    src={profilepic}
                    width={192}
                    height={192}
                    alt="Anikesh Roy"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Anikesh Roy</h1>
                  <p className="text-lg text-muted-foreground">Full Stack Developer</p>
                </div>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-base md:text-lg leading-relaxed">
                    Hello! I'm Anikesh, a passionate Computer Science Engineering Student who created this ByteAcademy portal to
                    help fellow students access organized study materials in one place.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Feel free to connect with me on social media or send an email if you have any suggestions for improving
                    this platform.
                  </p>
                </div>
                
                {/* Social links with improved design */}
                <div className="flex justify-center md:justify-start space-x-4 pt-4">
                  <a
                    href="https://www.linkedin.com/in/anikesh-roy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background border border-muted/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md group inline-flex items-center justify-center"
                  >
                    <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/call__me.ani/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background border border-muted/40 text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group inline-flex items-center justify-center"
                  >
                    <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://github.com/Anikeshroy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background border border-muted/40 text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group inline-flex items-center justify-center"
                  >
                    <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="mailto:anikeshroy62040@gmail.com"
                    className="p-3 rounded-full bg-background border border-muted/40 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group inline-flex items-center justify-center"
                  >
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">Email</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Project info section */}
            <div className="mt-12 pt-8 border-t border-muted/20">
              <div className="bg-primary/5 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>About ByteAcademy</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ByteAcademy is designed to simplify access to educational resources, providing a centralized platform for students to find study materials, question papers, video lectures, and notes.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                  <a href="/">
                    <span>Explore Resources</span>
                    <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

