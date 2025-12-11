"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Navbar() {
  const { role, user, logout } = useAuth()

  if (!role || !user) return null

  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">LMSC</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {role === "student"
              ? `Student: ${user.name}`
              : `Teacher: ${user.name}`}
          </span>

          <Button className="cursor-pointer" variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
