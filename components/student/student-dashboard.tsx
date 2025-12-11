"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, CheckCircle, TrendingUp } from "lucide-react"
import { StudentLessonDetail } from "./student-lesson-detail"

interface StudentStats {
  totalLessons: number
  completedLessons: number
  avgScore: number
  learningHours: number
}

export function StudentDashboard() {
  const { user, token } = useAuth()
  const [lessons, setLessons] = useState([])
  const [stats, setStats] = useState<StudentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  // searching filters
  const [searchTerm, setSearchTerm] = useState("")
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(9)

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  // -----------------------
  // Fetch lessons
  // -----------------------
  useEffect(() => {
    const controller = new AbortController()

    const debounceTimer = setTimeout(async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        })

        if (searchTerm.trim()) params.append("searchTerm", searchTerm)

        const res = await fetch(`${baseUrl}/lessons?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })

        const json = await res.json()

        setLessons(json.data.data)
        setTotal(json.data.meta.total)
      } catch (error:any) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error)
        }
      } finally {
        setLoading(false)
      }
    }, 300) // ← debounce delay

    return () => {
      clearTimeout(debounceTimer)
      controller.abort()
    }
  }, [searchTerm, page, limit])



  // -----------------------
  // Fetch student stats
  // -----------------------
  useEffect(() => {
    const fetchStudentStats = async () => {
      const res = await fetch(`${baseUrl}/lessons/students/${user?.id}/dashboard-stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await res.json()
      setStats(json.data)
    }

    if (user?.id) fetchStudentStats()
  }, [user])

  if (selectedLessonId) {
    return (
      <StudentLessonDetail
        lessonId={selectedLessonId}
        onBack={() => setSelectedLessonId(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
          <div className="space-y-6">

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome Back, {user?.name}!
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Continue your learning journey
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {stats && Object.keys(stats).length > 0 ? (
                <>
                  <StatCard icon={BookOpen} label="Total Lessons" value={stats.totalLessons} color="primary" />
                  <StatCard icon={CheckCircle} label="Completed" value={stats.completedLessons} color="accent" />
                  <StatCard icon={TrendingUp} label="Avg Score" value={`${stats.avgScore}%`} color="primary" />
                  <StatCard icon={Clock} label="Learning Hours" value={`${stats.learningHours}h`} color="accent" />
                </>
              ) : (
                <>Loading...</>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 flex justify-between items-center">
        <div className="relative w-full md:w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
        w-full pl-10 pr-4 py-2 rounded-lg 
        border border-border bg-card
        shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary
        transition-all"
          />
        </div>
      </div>


      {/* LESSON LIST */}
      <div className="max-w-7xl mx-auto px-4 md:px-12  ">

        <h2 className="text-2xl md:text-3xl font-bold mb-2">Available Lessons</h2>
        <p className="text-muted-foreground text-sm md:text-base mb-10">
          Browse and complete lessons to enhance your learning
        </p>

        {loading ? (
          <p className="mt-6">Loading lessons...</p>
        ) : (
          <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {lessons.map((lesson: any) => (
                <Card
                  key={lesson.id}
                  className="hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden group"
                >
                  <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                  <CardHeader className="pb-3 md:pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg md:text-xl line-clamp-2">{lesson.title}</CardTitle>
                        <CardDescription className="text-xs md:text-sm">{lesson.teacher?.name}</CardDescription>
                      </div>

                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full space-y-4">
                    <p className="text-sm text-foreground line-clamp-2 flex-grow">
                      {lesson.description}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Published: {new Date(lesson.publishedAt).toLocaleDateString()}
                    </p>

                    <div className="mt-auto">
                      <Button className="w-full cursor-pointer" onClick={() => setSelectedLessonId(lesson.id)}>
                        Open Lesson
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>


            <div className="flex justify-center items-center py-8 gap-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil(total / limit)}
              </span>

              <Button
                variant="outline"
                disabled={page >= Math.ceil(total / limit)}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow">
      <CardContent className="pt-4 md:pt-6">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color === "primary" ? "bg-primary/10" : "bg-accent/10"}`}>
            <Icon className={`w-6 h-6 ${color === "primary" ? "text-primary" : "text-accent"}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
