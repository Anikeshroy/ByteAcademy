import { Github, Linkedin, Instagram, Mail, ExternalLink, Sparkles, Youtube, FileText, BookOpen } from "lucide-react"
import Image from "next/image"
import profilepic from "/assets/ani1.jpg"
import { Button } from "@/components/ui/button"

// Update contributor data
const contributors = [
  {
    name: "Rahul Kumar",
    role: "Video Lectures",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
    social: {
      youtube: "https://youtube.com/@rahul",
      instagram: "https://instagram.com/rahul"
    },
    icon: <Youtube className="h-4 w-4 text-red-500" />,
    color: "from-red-500/20 to-red-500/5",
    textColor: "text-red-500"
  },
  {
    name: "Priya Singh",
    role: "Notes Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    social: {
      instagram: "https://instagram.com/priya"
    },
    icon: <BookOpen className="h-4 w-4 text-green-500" />,
    color: "from-green-500/20 to-green-500/5",
    textColor: "text-green-500"
  },
  {
    name: "Amit Shah",
    role: "Question Papers",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
    social: {
      instagram: "https://instagram.com/amit"
    },
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    color: "from-blue-500/20 to-blue-500/5",
    textColor: "text-blue-500"
  }
]

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

        {/* Enhanced Contributors Section */}
        <section className="relative">
          {/* Modern background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/5 to-primary/10 rounded-3xl -z-10 animate-gradient-x" />
          <div className="absolute -top-10 right-0 md:-right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-10 left-0 md:-left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl opacity-60" />
          
          {/* Add padding to the entire content area */}
          <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-10">
            {/* Section header with modern design - improved spacing */}
            <div className="text-center mb-10 relative">
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-muted/50 to-transparent -z-10" />
              <h2 className="inline-block px-6 py-2 bg-background/80 backdrop-blur-sm rounded-full text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Our Contributors
              </h2>
              <div className="mt-3 flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>The people behind ByteAcademy</span>
                </div>
              </div>
            </div>

            {/* Modern card grid with enhanced design - smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contributors.map((contributor, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Card background with personalized gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${contributor.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />
                  
                  {/* Card content with modern layout - reduced padding */}
                  <div className="relative p-6">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar with enhanced design - smaller size */}
                      <div className="relative mb-4">
                        <div className={`absolute inset-0 rounded-full blur-sm bg-gradient-to-r ${contributor.color} animate-pulse`} style={{ animationDuration: '3s' }} />
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-background shadow-md">
                          <Image
                            src={contributor.avatar}
                            alt={contributor.name}
                            width={80}
                            height={80}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className={`absolute -bottom-1.5 right-0 bg-background rounded-full p-2 border border-muted/30 ${contributor.textColor} shadow-sm`}>
                          {contributor.icon}
                        </div>
                      </div>

                      {/* Contributor info with improved spacing */}
                      <h3 className="font-bold text-lg mb-1.5">{contributor.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${contributor.color} ${contributor.textColor}`}>
                        {contributor.role}
                      </div>
                      
                      {/* Social links with modern design and better spacing */}
                      <div className="mt-4 flex justify-center gap-3">
                        {contributor.social.youtube && (
                          <a
                            href={contributor.social.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-background hover:bg-red-500 hover:text-white border border-muted/30 transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                          >
                            <Youtube className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </a>
                        )}
                        {contributor.social.instagram && (
                          <a
                            href={contributor.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-background hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 hover:text-white border border-muted/30 transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                          >
                            <Instagram className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern call to action with improved spacing and design */}
            <div className="mt-12 mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" style={{ animationDuration: '3s' }} />
                <Button asChild className="relative bg-background hover:bg-background/90 border border-muted/30 text-foreground shadow-md hover:shadow-lg group-hover:border-primary/20 transition-all duration-300">
                  <a href="mailto:anikeshroy62040@gmail.com?subject=ByteAcademy%20Contribution" className="px-6 py-5">
                    <span className="font-medium">Become a Contributor</span>
                    <Mail className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}


