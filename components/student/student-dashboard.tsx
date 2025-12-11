"use client"

import { useState } from "react"
import { LESSONS, TEACHERS, QUIZ_ATTEMPTS, TASK_SUBMISSIONS } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentLessonDetail } from "./student-lesson-detail"
import { BookOpen, Clock, CheckCircle, TrendingUp } from "lucide-react"

export function StudentDashboard() {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  if (selectedLessonId) {
    return <StudentLessonDetail lessonId={selectedLessonId} onBack={() => setSelectedLessonId(null)} />
  }

  const studentId = "student-1"
  const completedLessons = new Set(QUIZ_ATTEMPTS.filter((qa) => qa.studentId === studentId).map((qa) => qa.lessonId))
    .size
  const submittedTasks = TASK_SUBMISSIONS.filter((ts) => ts.studentId === studentId).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-muted-foreground text-base md:text-lg">Continue your learning journey</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { icon: BookOpen, label: "Total Lessons", value: LESSONS.length, color: "primary" },
                { icon: CheckCircle, label: "Completed", value: completedLessons, color: "accent" },
                { icon: TrendingUp, label: "Avg Score", value: "85%", color: "primary" },
                { icon: Clock, label: "Learning Hours", value: "24h", color: "accent" },
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
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Available Lessons</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Browse and complete lessons to enhance your learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {LESSONS.map((lesson) => {
            const teacher = TEACHERS.find((t) => t.id === lesson.teacherId)
            const isCompleted = QUIZ_ATTEMPTS.some((qa) => qa.studentId === studentId && qa.lessonId === lesson.id)
            const quizScore = QUIZ_ATTEMPTS.find((qa) => qa.studentId === studentId && qa.lessonId === lesson.id)?.score

            return (
              <Card
                key={lesson.id}
                className="hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden group"
              >
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <CardHeader className="pb-3 md:pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg md:text-xl line-clamp-2">{lesson.title}</CardTitle>
                      <CardDescription className="text-xs md:text-sm">{teacher?.name}</CardDescription>
                    </div>
                    {isCompleted && <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground line-clamp-2">{lesson.description}</p>

                  {isCompleted && quizScore && (
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-xs text-muted-foreground">Quiz Score</p>
                      <p className="text-lg font-bold text-accent">{quizScore}%</p>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Published: {new Date(lesson.publishedAt).toLocaleDateString()}
                  </p>

                  <Button
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className="w-full"
                    variant={isCompleted ? "outline" : "default"}
                  >
                    {isCompleted ? "Review Lesson" : "Open Lesson"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
