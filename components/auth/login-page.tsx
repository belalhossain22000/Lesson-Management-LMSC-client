"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, ArrowLeft } from "lucide-react"

export function LoginPage({ onBack }: { onBack?: () => void }) {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, role: "student" | "teacher") => {
    try {
      setLoading(true)
      setError(null)
      await login(email, role)
    } catch (err) {
      setError("Login failed. Please check backend.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-lg border-border/50">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          <CardTitle className="text-3xl">LMSC Platform</CardTitle>
          <CardDescription className="text-base">London Maths & Science College</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Button
            size="lg"
            disabled={loading}
            onClick={() => handleLogin("studentB@example.com", "student")}
            className="w-full h-14 text-base gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Login as Student
          </Button>

          <Button
            size="lg"
            disabled={loading}
            variant="outline"
            onClick={() => handleLogin("edward@lmsc.org", "teacher")}
            className="w-full h-14 text-base gap-2"
          >
            <Users className="w-5 h-5" />
            Login as Teacher
          </Button>

          {onBack && (
            <Button variant="ghost" onClick={onBack} className="w-full gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          )}

          {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
