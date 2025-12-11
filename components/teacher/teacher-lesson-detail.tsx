"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"

interface TeacherLessonDetailProps {
  lessonId: string
  onBack: () => void
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export function TeacherLessonDetail({ lessonId, onBack }: TeacherLessonDetailProps) {
  const { user, token } = useAuth()

  // LESSON DETAILS
  const [lesson, setLesson] = useState<any | null>(null)
  const [loadingLesson, setLoadingLesson] = useState(true)

  // ENGAGEMENT
  const [engagement, setEngagement] = useState<any[]>([])
  const [loadingEngagement, setLoadingEngagement] = useState(true)

  // TASK SUBMISSIONS
  const [taskSubmissions, setTaskSubmissions] = useState<any[]>([])
  const [loadingTasks, setLoadingTasks] = useState(true)

  // TEMP LOCAL MARK STATE
  const [editingMark, setEditingMark] = useState<Record<string, number | "">>({})

  // =========================================================
  // FETCH LESSON DETAILS
  // =========================================================
  useEffect(() => {
    if (!lessonId || !token) return

    const fetchLesson = async () => {
      try {
        setLoadingLesson(true)
        const res = await fetch(`${baseUrl}/lessons/${lessonId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const json = await res.json()
        setLesson(json.data || null)
      } catch (err) {
        console.error("Error fetching lesson:", err)
      } finally {
        setLoadingLesson(false)
      }
    }

    fetchLesson()
  }, [lessonId, token])

  // =========================================================
  // FETCH ENGAGEMENT
  // =========================================================
  useEffect(() => {
    if (!lessonId || !token) return

    const fetchEngagement = async () => {
      try {
        setLoadingEngagement(true)
        const res = await fetch(
          `${baseUrl}/lessons/lesson/${lessonId}/engagement`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const json = await res.json()
        setEngagement(Array.isArray(json.data) ? json.data : [])
      } catch (err) {
        console.error("Error engagement:", err)
        setEngagement([])
      } finally {
        setLoadingEngagement(false)
      }
    }

    fetchEngagement()
  }, [lessonId, token])

  // =========================================================
  // FETCH TASK SUBMISSIONS
  // =========================================================
  useEffect(() => {
    if (!lessonId || !token) return

    const fetchTasks = async () => {
      try {
        setLoadingTasks(true)
        const res = await fetch(
          `${baseUrl}/lessons/lesson/${lessonId}/task-submissions`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const json = await res.json()
        setTaskSubmissions(json.data || [])
      } catch (err) {
        console.error("Error fetching task submissions:", err)
        setTaskSubmissions([])
      } finally {
        setLoadingTasks(false)
      }
    }

    fetchTasks()
  }, [lessonId, token])

  // =========================================================
  // HANDLE SAVE MARK
  // =========================================================
  const handleSaveMark = async (submissionId: string) => {
    const mark = editingMark[submissionId]
    if (mark === "" || mark == null) return

    try {
      const res = await fetch(
        `${baseUrl}/lessons/submissions/${submissionId}/mark`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mark }),
        }
      )

      const json = await res.json()
      alert(json.message)

      // Optimistic update
      setTaskSubmissions((prev) =>
        prev.map((s) =>
          s.submissionId === submissionId ? { ...s, mark: json.mark } : s
        )
      )
    } catch (err) {
      alert("Error saving mark")
      console.error("Error saving mark:", err)
    }
  }

  // =========================================================
  // COMPUTE STATS
  // =========================================================
  const totalViewed = engagement.filter((s) => s.viewed).length
  const quizAttempts = engagement.filter((s) => s.quizSubmitted)
  const taskSubmitted = engagement.filter((s) => s.taskSubmitted)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        Back to Lessons
      </Button>

      {/* ======= LESSON HEADER ======= */}
      <div className="mb-8">
        {loadingLesson ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Loading lesson...</h1>
            <p className="text-muted-foreground">Retrieving lesson details...</p>
          </>
        ) : lesson ? (
          <>
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">{lesson.description}</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">Lesson Not Found</h1>
            <p className="text-muted-foreground">No lesson details available</p>
          </>
        )}

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-3 bg-muted rounded">
            <div className="text-sm text-muted-foreground">Students Viewed</div>
            <div className="text-2xl font-bold">{totalViewed}</div>
          </div>

          <div className="p-3 bg-muted rounded">
            <div className="text-sm text-muted-foreground">Quiz Submissions</div>
            <div className="text-2xl font-bold">{quizAttempts.length}</div>
          </div>

          <div className="p-3 bg-muted rounded">
            <div className="text-sm text-muted-foreground">Task Submissions</div>
            <div className="text-2xl font-bold">{taskSubmitted.length}</div>
          </div>
        </div>
      </div>

      {/* ======= TABS ======= */}
      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Results</TabsTrigger>
          <TabsTrigger value="tasks">Task Submissions</TabsTrigger>
        </TabsList>

        {/* ========== ENGAGEMENT TAB ========== */}
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Engagement</CardTitle>
              <CardDescription>Overview of student activity for this lesson</CardDescription>
            </CardHeader>

            <CardContent>
              {loadingEngagement ? (
                <p className="text-muted-foreground">Loading engagement...</p>
              ) : engagement.length === 0 ? (
                <p className="text-muted-foreground">No engagement found.</p>
              ) : (
                <div className="space-y-2">
                  {engagement.map((s) => (
                    <div
                      key={s.studentId}
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">{s.studentName}</p>
                        <p className="text-sm text-muted-foreground">{s.studentEmail}</p>
                      </div>

                      <div className="flex gap-2 text-sm">
                        {/* Viewed */}
                        <span
                          className={
                            s.viewed
                              ? "px-2 py-1 bg-green-100 text-green-800 rounded"
                              : "px-2 py-1 bg-gray-100 text-gray-800 rounded"
                          }
                        >
                          {s.viewed ? "Viewed" : "Not Viewed"}
                        </span>

                        {/* Quiz */}
                        {s.quizSubmitted ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            Quiz: {s.quizScore}%
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                            Quiz: Not Submitted
                          </span>
                        )}

                        {/* Task */}
                        {s.taskSubmitted ? (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                            {s.taskMark == null ? "Task (Pending)" : `Task: ${s.taskMark}`}
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                            Task: Not Submitted
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== QUIZ TAB ========== */}
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
              <CardDescription>Student quiz attempts</CardDescription>
            </CardHeader>

            <CardContent>
              {quizAttempts.length === 0 ? (
                <p className="text-muted-foreground">No quiz submissions yet.</p>
              ) : (
                <div className="space-y-3">
                  {quizAttempts.map((s) => (
                    <div
                      key={s.studentId}
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">{s.studentName}</p>
                        <p className="text-sm text-muted-foreground">{s.studentEmail}</p>
                      </div>
                      <div className="text-lg font-bold text-primary">{s.quizScore}%</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== TASK SUBMISSIONS TAB ========== */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Submissions</CardTitle>
              <CardDescription>Review and mark student work</CardDescription>
            </CardHeader>

            <CardContent>
              {loadingTasks ? (
                <p className="text-muted-foreground">Loading tasks...</p>
              ) : taskSubmissions.length === 0 ? (
                <p className="text-muted-foreground">No task submissions yet.</p>
              ) : (
                <div className="space-y-4">
                  {taskSubmissions.map((submission) => {
                    const currentMark =
                      editingMark[submission.submissionId] ??
                      submission.mark ??
                      ""

                    return (
                      <div
                        key={submission.submissionId}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              {submission.studentEmail}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Submitted:{" "}
                              {new Date(submission.submittedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted p-3 rounded mb-3">
                          <p className="text-sm">{submission.content}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={currentMark}
                            onChange={(e) =>
                              setEditingMark({
                                ...editingMark,
                                [submission.submissionId]:
                                  e.target.value === ""
                                    ? ""
                                    : Number(e.target.value),
                              })
                            }
                            className="px-3 py-2 border rounded w-32"
                            placeholder="Mark"
                          />
                          <span className="text-sm text-muted-foreground">/100</span>

                          <Button
                            size="sm"
                            onClick={() =>
                              handleSaveMark(submission.submissionId)
                            }
                          >
                            Save Mark
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
