"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { LESSONS, QUIZ_ATTEMPTS, TASK_SUBMISSIONS } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeacherLessonDetail } from "./teacher-lesson-detail"
import { Users, BarChart3, CheckCircle, BookOpen } from "lucide-react"

export function TeacherDashboard() {
  const { currentTeacher } = useAuth()
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  const teacherLessons = LESSONS.filter((l) => l.teacherId === currentTeacher?.id)

  if (selectedLessonId) {
    return <TeacherLessonDetail lessonId={selectedLessonId} onBack={() => setSelectedLessonId(null)} />
  }

  // Calculate aggregate stats
  const totalStudentsEngaged = new Set(
    QUIZ_ATTEMPTS.filter((qa) => teacherLessons.some((l) => l.id === qa.lessonId)).map((qa) => qa.studentId),
  ).size

  const totalQuizSubmissions = QUIZ_ATTEMPTS.filter((qa) => teacherLessons.some((l) => l.id === qa.lessonId)).length

  const totalTaskSubmissions = TASK_SUBMISSIONS.filter((ts) =>
    teacherLessons.some((l) => ts.taskId.includes(l.id)),
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Teacher Dashboard</h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Manage your lessons and track student engagement
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { icon: BookOpen, label: "Your Lessons", value: teacherLessons.length, color: "primary" },
                { icon: Users, label: "Students Engaged", value: totalStudentsEngaged, color: "accent" },
                { icon: BarChart3, label: "Quiz Submissions", value: totalQuizSubmissions, color: "primary" },
                { icon: CheckCircle, label: "Task Submissions", value: totalTaskSubmissions, color: "accent" },
              ].map((stat, i) => (
                <Card key={i} className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="pt-4 md:pt-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div
                        className={`w-10 md:w-12 h-10 md:h-12 rounded-lg flex items-center justify-center ${
                          stat.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                        }`}
                      >
                        <stat.icon
                          className={`w-5 md:w-6 h-5 md:h-6 ${stat.color === "primary" ? "text-primary" : "text-accent"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">My Lessons</h2>
          <p className="text-muted-foreground text-sm md:text-base">Manage your lessons and view detailed analytics</p>
        </div>

        {teacherLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {teacherLessons.map((lesson) => {
              const quizAttempts = QUIZ_ATTEMPTS.filter((qa) => qa.lessonId === lesson.id)
              const uniqueStudents = new Set(quizAttempts.map((qa) => qa.studentId)).size

              return (
                <Card
                  key={lesson.id}
                  className="hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden group"
                >
                  <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                  <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-lg md:text-xl line-clamp-2">{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground line-clamp-2">{lesson.description}</p>

                    {/* Engagement Stats */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-center">
                        <p className="text-xs text-muted-foreground">Viewed</p>
                        <p className="text-lg md:text-xl font-bold text-primary">{uniqueStudents}</p>
                      </div>
                      <div className="p-3 bg-accent/10 rounded-lg border border-accent/20 text-center">
                        <p className="text-xs text-muted-foreground">Quizzes</p>
                        <p className="text-lg md:text-xl font-bold text-accent">{quizAttempts.length}</p>
                      </div>
                      <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20 text-center">
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                        <p className="text-lg md:text-xl font-bold text-secondary">
                          {quizAttempts.length > 0
                            ? Math.round(quizAttempts.reduce((acc, qa) => acc + qa.score, 0) / quizAttempts.length)
                            : 0}
                          %
                        </p>
                      </div>
                    </div>

                    <Button onClick={() => setSelectedLessonId(lesson.id)} className="w-full">
                      View Engagement
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="border-border/50">
            <CardContent className="pt-12 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">You have not created any lessons yet.</p>
              <Button variant="outline">Create First Lesson</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
