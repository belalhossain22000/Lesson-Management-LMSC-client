"use client"

import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { LandingPage } from "@/components/landing-page"
import { StudentDashboard } from "@/components/student/student-dashboard"
import { TeacherDashboard } from "@/components/teacher/teacher-dashboard"
import Footer from "@/components/footer"

export default function Home() {
  const { role } = useAuth()

  return (
    <div>
      {!role && <LandingPage />}
      {role && <Navbar />}
      {role === "student" && <StudentDashboard />}
      {role === "teacher" && <TeacherDashboard />}
      {role && <div className="mt-10"> <Footer /></div>}
    </div>
  )
}
