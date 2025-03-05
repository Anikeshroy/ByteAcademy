import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/about" className="text-sm font-medium hover:underline">
          Design & Developed by Anikesh Roy
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CSE Resources. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

