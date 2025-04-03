import Link from "next/link"

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
          
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} ByteAcademy
          </p>
        </div>
      </div>
    </footer>
  )
}

