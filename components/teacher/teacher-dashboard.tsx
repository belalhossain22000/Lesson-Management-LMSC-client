"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeacherLessonDetail } from "./teacher-lesson-detail"
import { Users, BarChart3, CheckCircle, BookOpen } from "lucide-react"

export function TeacherDashboard() {
  const { user, token } = useAuth()

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  // ==========================================
  // Fetch Teacher Stats
  // ==========================================
  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(
        `${baseUrl}/lessons/teachers/${user?.id}/dashboard-stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      const json = await res.json()
      setStats(json.data)
    }

    if (user?.id) fetchStats()
  }, [user])

  // ==========================================
  // Fetch Teacher Lessons
  // ==========================================
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true)

      const res = await fetch(
        `${baseUrl}/lessons/teachers/${user?.id}/lessons`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const json = await res.json()
      setLessons(json.data)

      setLoading(false)
    }

    if (user?.id) fetchLessons()
  }, [user])

  // ==========================================
  // If Teacher opens a lesson - show detail page
  // ==========================================
  if (selectedLessonId) {
    return (
      <TeacherLessonDetail
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
                Teacher Dashboard
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Manage your lessons and track student engagement
              </p>
            </div>

            {/* ===== STATS CARDS ===== */}
            {stats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  {
                    icon: BookOpen,
                    label: "Your Lessons",
                    value: stats.totalLessons,
                    color: "primary",
                  },
                  {
                    icon: Users,
                    label: "Students Engaged",
                    value: stats.studentsEngaged,
                    color: "accent",
                  },
                  {
                    icon: BarChart3,
                    label: "Quiz Submissions",
                    value: stats.quizSubmissions,
                    color: "primary",
                  },
                  {
                    icon: CheckCircle,
                    label: "Task Submissions",
                    value: stats.taskSubmissions,
                    color: "accent",
                  },
                ].map((stat, i) => (
                  <Card
                    key={i}
                    className="border-border/50 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-4 md:pt-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div
                          className={`w-10 md:w-12 h-10 md:h-12 rounded-lg flex items-center justify-center ${stat.color === "primary"
                              ? "bg-primary/10"
                              : "bg-accent/10"
                            }`}
                        >
                          <stat.icon
                            className={`w-5 md:w-6 h-5 md:h-6 ${stat.color === "primary"
                                ? "text-primary"
                                : "text-accent"
                              }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                          <p className="text-xl md:text-2xl font-bold">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>Loading stats...</p>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">My Lessons</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your lessons and view detailed analytics
          </p>
        </div>

        {loading ? (
          <p>Loading lessons...</p>
        ) : lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {lessons.map((lesson) => (
              <Card
                key={lesson.lessonId}
                className="hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden group"
              >
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />

                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="text-lg md:text-xl line-clamp-2">
                    {lesson.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Engagement Stats */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-center">
                      <p className="text-xs text-muted-foreground">Viewed</p>
                      <p className="text-lg md:text-xl font-bold text-primary">
                        {lesson.viewedCount}
                      </p>
                    </div>

                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20 text-center">
                      <p className="text-xs text-muted-foreground">Quizzes</p>
                      <p className="text-lg md:text-xl font-bold text-accent">
                        {lesson.completedQuizCount}
                      </p>
                    </div>

                    <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20 text-center">
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                      <p className="text-lg md:text-xl font-bold text-secondary">
                        {lesson.avgScore || 0}%
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedLessonId(lesson.lessonId)}
                    className="w-full"
                  >
                    View Engagement
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border/50">
            <CardContent className="pt-12 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                You have not created any lessons yet.
              </p>
              <Button variant="outline">Create First Lesson</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
