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
  const [taskContent, setTaskContent] = useState("")
  const [taskSubmitted, setTaskSubmitted] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  // ==========================
  // FETCH LESSON DETAILS
  // ==========================
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`${baseUrl}/lessons/${lessonId}?studentId=${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await res.json()
        setLesson(json.data)
      } catch (err) {
        console.error("Lesson fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) fetchLesson()
  }, [lessonId])

  if (loading) return <p className="p-6">Loading lesson...</p>
  if (!lesson) return <p className="p-6">Lesson not found.</p>

  const quizQuestions = lesson.quizQuestions || []
  const lessonTasks = lesson.lessonTasks || []

  // ==========================
  // QUIZ SUBMIT HANDLER
  // ==========================
  const handleQuizSubmit = async () => {
    const correctAnswers = quizQuestions.filter(
      (q: any) => quizAnswers[q.id] === q.correctOption
    ).length

    const score = Math.round((correctAnswers / quizQuestions.length) * 100)

    setQuizSubmitted(true)

    // Here you will call your quiz submission API
    console.log("Quiz submitted with score:", score)
  }

  // ==========================
  // TASK SUBMIT HANDLER
  // ==========================
  const handleTaskSubmit = async () => {
    setTaskSubmitted(true)

    // Here you will call your task submission API
    console.log("Task submitted:", taskContent)
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
        <TabsContent value="video" className="space-y-4">
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

        {/* ======================== QUIZ TAB ======================== */}
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz</CardTitle>
              <CardDescription>Answer all questions</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {quizSubmitted ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-semibold text-green-900">Quiz Submitted!</p>
                </div>
              ) : (
                <>
                  {quizQuestions.map((q: any) => (
                    <div key={q.id} className="space-y-3">
                      <p className="font-semibold">{q.questionText}</p>
                      <div className="space-y-2">
                        {["A", "B", "C", "D"].map((opt) => {
                          const optionText = q[`option${opt}`]
                          return (
                            <label
                              key={opt}
                              className="flex items-center p-3 border rounded cursor-pointer hover:bg-muted"
                            >
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={quizAnswers[q.id] === opt}
                                onChange={(e) =>
                                  setQuizAnswers({
                                    ...quizAnswers,
                                    [q.id]: e.target.value,
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
              {lessonTasks.length > 0 ? (
                <>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-blue-900">{lessonTasks[0].taskText}</p>
                  </div>

                  {taskSubmitted ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-semibold text-green-900">Task Submitted!</p>
                    </div>
                  ) : (
                    <>
                      <textarea
                        placeholder="Enter your response..."
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
              ) : (
                <p className="text-muted-foreground">No tasks for this lesson.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
