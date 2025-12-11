"use client"

import { useState } from "react"
import { STUDENTS, QUIZ_ATTEMPTS, TASK_SUBMISSIONS, LESSON_TASKS, LESSONS } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TeacherLessonDetailProps {
  lessonId: string
  onBack: () => void
}

export function TeacherLessonDetail({ lessonId, onBack }: TeacherLessonDetailProps) {
  const lesson = LESSONS.find((l) => l.id === lessonId)
  const lessonTasks = LESSON_TASKS.filter((t) => t.lessonId === lessonId)
  const [editingMark, setEditingMark] = useState<Record<string, number>>({})

  if (!lesson) return null

  const quizAttempts = QUIZ_ATTEMPTS.filter((qa) => qa.lessonId === lessonId)
  const taskSubmissions = TASK_SUBMISSIONS.filter((ts) => lessonTasks.some((t) => t.id === ts.taskId))

  const studentsViewed = new Set(quizAttempts.map((qa) => qa.studentId))

  const handleMarkUpdate = (submissionId: string, mark: number) => {
    setEditingMark({ ...editingMark, [submissionId]: mark })
    console.log(`Mark updated for submission ${submissionId}: ${mark}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        Back to Lessons
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-3 bg-muted rounded">
            <div className="text-sm text-muted-foreground">Students Viewed</div>
            <div className="text-2xl font-bold">{studentsViewed.size}</div>
          </div>
          <div className="p-3 bg-muted rounded">
            <div className="text-sm text-muted-foreground">Quiz Submissions</div>
            <div className="text-2xl font-bold">{quizAttempts.length}</div>
          </div>
          <div className="p-3 bg-muted rounded">
            <div className="text-sm text-muted-foreground">Task Submissions</div>
            <div className="text-2xl font-bold">{taskSubmissions.length}</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Results</TabsTrigger>
          <TabsTrigger value="tasks">Task Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Engagement</CardTitle>
              <CardDescription>Overview of student activity for this lesson</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {STUDENTS.map((student) => {
                  const hasViewed = studentsViewed.has(student.id)
                  const quizAttempt = quizAttempts.find((qa) => qa.studentId === student.id)
                  const taskSubmission = taskSubmissions.find((ts) => ts.studentId === student.id)

                  return (
                    <div key={student.id} className="p-4 border rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span
                          className={
                            hasViewed
                              ? "px-2 py-1 bg-green-100 text-green-800 rounded"
                              : "px-2 py-1 bg-gray-100 text-gray-800 rounded"
                          }
                        >
                          {hasViewed ? "Viewed" : "Not Viewed"}
                        </span>
                        {quizAttempt && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            Quiz: {quizAttempt.score}%
                          </span>
                        )}
                        {taskSubmission && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Task Submitted</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
              <CardDescription>View student quiz attempts and scores</CardDescription>
            </CardHeader>
            <CardContent>
              {quizAttempts.length > 0 ? (
                <div className="space-y-3">
                  {quizAttempts.map((attempt) => {
                    const student = STUDENTS.find((s) => s.id === attempt.studentId)
                    return (
                      <div key={attempt.id} className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{student?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Submitted: {new Date(attempt.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-lg font-bold text-primary">{attempt.score}%</div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground">No quiz submissions yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Submissions</CardTitle>
              <CardDescription>Review and mark student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {taskSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {taskSubmissions.map((submission) => {
                    const student = STUDENTS.find((s) => s.id === submission.studentId)
                    const currentMark = editingMark[submission.id] ?? submission.mark ?? 0

                    return (
                      <div key={submission.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold">{student?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted p-3 rounded mb-3">
                          <p className="text-sm text-foreground">{submission.content}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={currentMark}
                            onChange={(e) => handleMarkUpdate(submission.id, Number.parseInt(e.target.value))}
                            placeholder="Mark out of 100"
                            className="px-3 py-2 border rounded w-32"
                          />
                          <span className="text-sm text-muted-foreground">/100</span>
                          <Button size="sm">Save Mark</Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground">No task submissions yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
