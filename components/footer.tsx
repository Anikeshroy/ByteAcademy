import Link from "next/link"
import { Code } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8 bg-background/60 backdrop-blur-sm">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
          <Link 
            href="/about" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Design & Developed by Anikesh Roy
          </Link>
          
          <div className="hidden md:block h-1 w-1 rounded-full bg-muted-foreground/50" />
          
          <Link 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Maintained by</span>
            <span className="font-medium group-hover:text-primary transition-colors flex items-center gap-1">
              Code Club GEC Jamui
              <Code className="h-3.5 w-3.5 inline-block" />
            </span>
          </Link>
          
          <div className="hidden md:block h-1 w-1 rounded-full bg-muted-foreground/50" />
          
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} ByteAcademy
          </p>
        </div>
      </div>
    </footer>
  )
}

