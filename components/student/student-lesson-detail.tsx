"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StudentLessonDetailProps {
  lessonId: string
  onBack: () => void
}

export function StudentLessonDetail({ lessonId, onBack }: StudentLessonDetailProps) {
  const { user, token } = useAuth()

  const [lesson, setLesson] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizResult, setQuizResult] = useState<any>(null)
  const [taskSubmittedData, setTaskSubmittedData] = useState<any>(null)


  const [taskContent, setTaskContent] = useState("")
  const [taskSubmitted, setTaskSubmitted] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  // ==========================
  // FETCH LESSON DETAIL + QUIZ DATA
  // ==========================
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/lessons/${lessonId}?studentId=${user?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const json = await res.json()
        setLesson(json.data)
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) fetchLesson()
  }, [lessonId])

  // ==========================
  // FETCH PREVIOUS QUIZ ATTEMPT
  // ==========================
  useEffect(() => {
    const fetchQuizAttempts = async () => {
      if (!user?.id) return

      const res = await fetch(
        `${baseUrl}/lessons/students/${user.id}/quizzes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const json = await res.json()

      // find attempt for THIS lesson
      const attempt = json.data.find(
        (a: any) => a.lessonId === lessonId
      )

      if (attempt) {
        setQuizSubmitted(true)
        setQuizResult(attempt)
      }
    }

    fetchQuizAttempts()
  }, [lessonId])

  // ==========================
  //  fetch task submissions result 
  // ==========================
  useEffect(() => {
    const fetchTaskSubmissions = async () => {
      const res = await fetch(
        `${baseUrl}/lessons/students/${user?.id}/tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const json = await res.json()

      const currentTask = json.data.find(
        (t: any) => t.lessonId === lessonId
      )

      if (currentTask) {
        setTaskSubmittedData(currentTask)
      }
    }

    fetchTaskSubmissions()
  }, [lessonId])


  if (loading) return <p className="p-6">Loading lesson...</p>
  if (!lesson) return <p className="p-6">Lesson not found.</p>

  const quizQuestions = lesson.quizQuestions || []
  const lessonTasks = lesson.lessonTasks || []

  // ==========================
  // QUIZ SUBMIT HANDLER (REAL API)
  // ==========================
  const handleQuizSubmit = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/lessons/lesson/${lessonId}/quiz`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: user?.id,
            answers: quizAnswers,
          }),
        }
      )

      const json = await res.json()

      setQuizSubmitted(true)
      setQuizResult(json.data)
    } catch (error) {
      console.error("Quiz submission error", error)
    }
  }

  // ==========================
  // TASK SUBMIT HANDLER
  // ==========================
  const handleTaskSubmit = async () => {
    try {
      const taskId = lessonTasks[0].id

      const res = await fetch(
        `${baseUrl}/lessons/tasks/submission/${taskId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: user?.id,
            content: taskContent,
          }),
        }
      )

      const json = await res.json()

      setTaskSubmittedData({
        submissionId: json.data.submissionId,
        taskId: json.data.taskId,
        lessonId,
        content: taskContent,
        mark: null,
        submittedAt: json.data.submittedAt,
      })
    } catch (error) {
      console.error("Task submission error", error)
    }
  }



  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        Back to Lessons
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
        <p className="text-sm mt-2 text-primary">Teacher: {lesson.teacher?.name}</p>
      </div>

      <Tabs defaultValue="video" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="task">Task</TabsTrigger>
        </TabsList>

        {/* ======================== VIDEO TAB ======================== */}
        <TabsContent value="video" className="space-y-4 cursor-pointer">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={lesson.videoUrl}
                  title="Lesson Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* ================= QUIZ TAB ================= */}
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz</CardTitle>
              <CardDescription>
                Answer all questions and submit to see your score
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* ====== SHOW QUIZ RESULT IF SUBMITTED ====== */}
              {quizSubmitted && quizResult ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-semibold text-green-900">
                    Quiz Submitted Successfully!
                  </p>
                  <p className="text-sm text-green-800 mt-1">
                    Score: <span className="font-bold">{quizResult.score}%</span>
                  </p>
                  <p className="text-sm text-green-700">
                    Correct Answers: {quizResult.correctAnswers} /{" "}
                    {quizResult.totalQuestions}
                  </p>
                </div>
              ) : (
                <>
                  {/* QUIZ QUESTIONS */}
                  {quizQuestions.map((question: any) => (
                    <div key={question.id} className="space-y-3">
                      <p className="font-semibold">{question.questionText}</p>

                      <div className="space-y-2">
                        {["A", "B", "C", "D"].map((opt) => {
                          const optionText = question[`option${opt}`]
                          return (
                            <label
                              key={opt}
                              className="flex items-center p-3 border rounded cursor-pointer hover:bg-muted"
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={opt}
                                checked={quizAnswers[question.id] === opt}
                                onChange={(e) =>
                                  setQuizAnswers({
                                    ...quizAnswers,
                                    [question.id]: e.target.value,
                                  })
                                }
                                className="mr-3"
                              />
                              <span>{optionText}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}

                  {/* SUBMIT BUTTON */}
                  <Button onClick={handleQuizSubmit} className="w-full mt-6">
                    Submit Quiz
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>


        {/* ======================== TASK TAB ======================== */}
        <TabsContent value="task" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task / Activity</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {!lessonTasks.length ? (
                <p className="text-muted-foreground">No tasks for this lesson.</p>
              ) : (
                <>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-blue-900">
                      {lessonTasks[0].taskText}
                    </p>
                  </div>

                  {/* IF SUBMITTED: SHOW RESULT RETURNED FROM BACKEND */}
                  {taskSubmittedData ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-1">
                      <p className="font-semibold text-green-900">Task Submitted!</p>
                      <p className="text-sm text-green-800">
                        Submitted on:{" "}
                        {new Date(taskSubmittedData.submittedAt).toLocaleString()}
                      </p>

                      <p className="text-sm text-green-800">
                        Mark:{" "}
                        {taskSubmittedData.mark === null
                          ? "Awaiting teacher review"
                          : `${taskSubmittedData.mark}/100`}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* TEXT INPUT */}
                      <textarea
                        placeholder="Enter your response here..."
                        value={taskContent}
                        onChange={(e) => setTaskContent(e.target.value)}
                        className="w-full p-3 border rounded-lg min-h-32 font-sans"
                      />

                      <Button
                        onClick={handleTaskSubmit}
                        className="w-full"
                        disabled={!taskContent.trim()}
                      >
                        Submit Task
                      </Button>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
