"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  const { role, user, logout } = useAuth()

  if (!role || !user) return null

  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          LMSC E-Learning
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
 