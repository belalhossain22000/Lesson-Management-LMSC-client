"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { LESSONS, QUIZ_QUESTIONS, LESSON_TASKS, QUIZ_ATTEMPTS, TASK_SUBMISSIONS } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StudentLessonDetailProps {
  lessonId: string
  onBack: () => void
}

export function StudentLessonDetail({ lessonId, onBack }: StudentLessonDetailProps) {
  const { currentStudent } = useAuth()
  const lesson = LESSONS.find((l) => l.id === lessonId)
  const quizQuestions = QUIZ_QUESTIONS.filter((q) => q.lessonId === lessonId)
  const lessonTasks = LESSON_TASKS.filter((t) => t.lessonId === lessonId)

  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [taskContent, setTaskContent] = useState("")
  const [taskSubmitted, setTaskSubmitted] = useState(false)

  if (!lesson) return null

  const studentQuizAttempt = QUIZ_ATTEMPTS.find((qa) => qa.lessonId === lessonId && qa.studentId === currentStudent?.id)

  const studentTaskSubmission = TASK_SUBMISSIONS.find(
    (ts) => ts.studentId === currentStudent?.id && lessonTasks[0] && ts.taskId === lessonTasks[0].id,
  )

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    // Calculate score
    const correctAnswers = quizQuestions.filter((q) => quizAnswers[q.id] === q.correctOption).length
    const score = (correctAnswers / quizQuestions.length) * 100
    console.log("Quiz submitted with score:", score)
  }

  const handleTaskSubmit = () => {
    setTaskSubmitted(true)
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
      </div>

      <Tabs defaultValue="video" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="task">Task</TabsTrigger>
        </TabsList>

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
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz</CardTitle>
              <CardDescription>Answer all questions and submit to see your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quizSubmitted && studentQuizAttempt ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-semibold text-green-900">Quiz Submitted!</p>
                  <p className="text-sm text-green-800 mt-1">Your score: {studentQuizAttempt.score}%</p>
                </div>
              ) : (
                <>
                  {quizQuestions.map((question) => (
                    <div key={question.id} className="space-y-3">
                      <p className="font-semibold">{question.questionText}</p>
                      <div className="space-y-2">
                        {["A", "B", "C", "D"].map((option) => {
                          const optionText = question[`option${option as "A" | "B" | "C" | "D"}`]
                          return (
                            <label
                              key={option}
                              className="flex items-center p-3 border rounded cursor-pointer hover:bg-muted"
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={quizAnswers[question.id] === option}
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
                  <Button onClick={handleQuizSubmit} className="w-full mt-6">
                    Submit Quiz
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="task" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task/Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lessonTasks.length > 0 ? (
                <>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-blue-900">{lessonTasks[0].taskText}</p>
                  </div>

                  {taskSubmitted && studentTaskSubmission ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-semibold text-green-900">Task Submitted!</p>
                      <p className="text-sm text-green-800 mt-1">
                        Submitted on: {new Date(studentTaskSubmission.submittedAt).toLocaleDateString()}
                      </p>
                      {studentTaskSubmission.mark && (
                        <p className="text-sm text-green-800">Mark: {studentTaskSubmission.mark}/100</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <textarea
                        placeholder="Enter your response here..."
                        value={taskContent}
                        onChange={(e) => setTaskContent(e.target.value)}
                        className="w-full p-3 border rounded-lg min-h-32 font-sans"
                      />
                      <Button onClick={handleTaskSubmit} className="w-full" disabled={!taskContent.trim()}>
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
