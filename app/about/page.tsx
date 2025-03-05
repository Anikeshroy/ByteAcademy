import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import profilepic from "/assets/ani1.jpg"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-6">
          <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
            <Image
              src={profilepic}
              width={128}
              height={128}
              alt="Anikesh Roy"
              className="object-cover"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Anikesh Roy</h1>
            <p className="text-muted-foreground">Full Stack Developer</p>
          </div>

          <div className="prose dark:prose-invert mx-auto">
            <p>
              Hello! I'm Anikesh, a passionate Computer Science Engineering Student who created this ByteAcademy portal to
              help fellow students access organized study materials in one place.
            </p>
            {/* <p>
              My goal is to make learning more accessible and structured, allowing students to focus on understanding
              concepts rather than searching for resources.
            </p> */}
            <br></br>
            <p>
              Feel free to connect with me on social media or send an email if you have any suggestions for improving
              this platform.
            </p>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            
            <Link
              href="https://www.linkedin.com/in/anikesh-roy/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://www.instagram.com/call__me.ani/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://github.com/Anikeshroy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="mailto:anikeshroy62040@gmail.com.com"
              className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

