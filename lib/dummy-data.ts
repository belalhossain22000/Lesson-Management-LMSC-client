// Dummy data for the e-learning platform

export interface Student {
  id: string
  name: string
  email: string
}

export interface Teacher {
  id: string
  name: string
  email: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  videoUrl: string
  teacherId: string
  publishedAt: string
}

export interface QuizQuestion {
  id: string
  lessonId: string
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctOption: "A" | "B" | "C" | "D"
}

export interface QuizAttempt {
  id: string
  lessonId: string
  studentId: string
  submittedAt: string
  score: number
  answers: Record<string, string>
}

export interface LessonTask {
  id: string
  lessonId: string
  taskText: string
}

export interface TaskSubmission {
  id: string
  taskId: string
  studentId: string
  submittedAt: string
  content: string
  mark?: number
}

// Sample Students
export const STUDENTS: Student[] = [
  { id: "1", name: "Alice Johnson", email: "alice@school.com" },
  { id: "2", name: "Bob Smith", email: "bob@school.com" },
  { id: "3", name: "Charlie Brown", email: "charlie@school.com" },
  { id: "4", name: "Diana Prince", email: "diana@school.com" },
]

// Sample Teachers
export const TEACHERS: Teacher[] = [
  { id: "T1", name: "Dr. Emma Watson", email: "emma@school.com" },
  { id: "T2", name: "Prof. James Mitchell", email: "james@school.com" },
]

// Sample Lessons
export const LESSONS: Lesson[] = [
  {
    id: "L1",
    title: "Introduction to Calculus",
    description: "Learn the fundamentals of calculus including limits, derivatives, and integrals.",
    videoUrl: "https://www.youtube.com/embed/WUvTyaaNkzM",
    teacherId: "T1",
    publishedAt: "2024-01-15",
  },
  {
    id: "L2",
    title: "Chemistry Basics",
    description: "Explore the periodic table, atomic structure, and basic chemical reactions.",
    videoUrl: "https://www.youtube.com/embed/cRnkQqUbQOU",
    teacherId: "T1",
    publishedAt: "2024-01-20",
  },
  {
    id: "L3",
    title: "Physics: Motion and Forces",
    description: "Understanding Newtons laws of motion and force interactions.",
    videoUrl: "https://www.youtube.com/embed/9u0EWekI3BA",
    teacherId: "T2",
    publishedAt: "2024-01-22",
  },
  {
    id: "L4",
    title: "Biology: Cell Structure",
    description: "Learn about prokaryotic and eukaryotic cells, organelles, and their functions.",
    videoUrl: "https://www.youtube.com/embed/I04FN0pj7bQ",
    teacherId: "T2",
    publishedAt: "2024-01-25",
  },
]

// Sample Quiz Questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "Q1-L1",
    lessonId: "L1",
    questionText: "What is the derivative of x²?",
    optionA: "x",
    optionB: "2x",
    optionC: "x²",
    optionD: "2",
    correctOption: "B",
  },
  {
    id: "Q2-L1",
    lessonId: "L1",
    questionText: "What is the integral of 2x?",
    optionA: "x²",
    optionB: "2",
    optionC: "x² + C",
    optionD: "4x",
    correctOption: "C",
  },
  {
    id: "Q1-L2",
    lessonId: "L2",
    questionText: "What is the atomic number of Carbon?",
    optionA: "6",
    optionB: "8",
    optionC: "12",
    optionD: "4",
    correctOption: "A",
  },
  {
    id: "Q2-L2",
    lessonId: "L2",
    questionText: 'Which element has the symbol "O"?',
    optionA: "Gold",
    optionB: "Oxygen",
    optionC: "Osmium",
    optionD: "Iodine",
    correctOption: "B",
  },
  {
    id: "Q1-L3",
    lessonId: "L3",
    questionText: "Which of Newton's laws states F=ma?",
    optionA: "First Law",
    optionB: "Second Law",
    optionC: "Third Law",
    optionD: "Fourth Law",
    correctOption: "B",
  },
  {
    id: "Q1-L4",
    lessonId: "L4",
    questionText: "What is the powerhouse of the cell?",
    optionA: "Nucleus",
    optionB: "Ribosome",
    optionC: "Mitochondria",
    optionD: "Chloroplast",
    correctOption: "C",
  },
]

// Sample Lesson Tasks
export const LESSON_TASKS: LessonTask[] = [
  {
    id: "T1-L1",
    lessonId: "L1",
    taskText:
      "Write a summary of the key concepts covered in this lesson. Include definitions of derivatives and integrals.",
  },
  {
    id: "T1-L2",
    lessonId: "L2",
    taskText:
      "Create a visual representation of the periodic table showing the first 20 elements and their properties.",
  },
  {
    id: "T1-L3",
    lessonId: "L3",
    taskText: "Solve 5 problems involving Newtons Second Law (F=ma) with different scenarios.",
  },
  {
    id: "T1-L4",
    lessonId: "L4",
    taskText: "Draw and label a diagram of a typical animal cell showing at least 10 organelles.",
  },
]

// Sample Quiz Attempts (with pre-filled data)
export const QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: "QA1",
    lessonId: "L1",
    studentId: "1",
    submittedAt: "2024-02-01",
    score: 100,
    answers: { "Q1-L1": "B", "Q2-L1": "C" },
  },
  {
    id: "QA2",
    lessonId: "L1",
    studentId: "2",
    submittedAt: "2024-02-02",
    score: 50,
    answers: { "Q1-L1": "A", "Q2-L1": "C" },
  },
  {
    id: "QA3",
    lessonId: "L2",
    studentId: "1",
    submittedAt: "2024-02-03",
    score: 100,
    answers: { "Q1-L2": "A", "Q2-L2": "B" },
  },
]

// Sample Task Submissions
export const TASK_SUBMISSIONS: TaskSubmission[] = [
  {
    id: "TS1",
    taskId: "T1-L1",
    studentId: "1",
    submittedAt: "2024-02-01",
    content: "Derivatives represent the rate of change of a function at a given point...",
    mark: 85,
  },
  {
    id: "TS2",
    taskId: "T1-L1",
    studentId: "2",
    submittedAt: "2024-02-02",
    content: "A derivative is the slope of a curve at a specific point...",
    mark: 75,
  },
  {
    id: "TS3",
    taskId: "T1-L2",
    studentId: "1",
    submittedAt: "2024-02-04",
    content: "[Visual representation of periodic table elements]",
    mark: 90,
  },
]
