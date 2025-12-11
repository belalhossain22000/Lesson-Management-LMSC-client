"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  BookOpen,
  Users,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  Award,
  Lightbulb,
  BarChart3,
} from "lucide-react"
import { LoginPage } from "@/components/auth/login-page"
import Footer from "./footer"

export function LandingPage() {
  const [showLoginOptions, setShowLoginOptions] = useState(false)

  if (showLoginOptions) {
    return <LoginPage onBack={() => setShowLoginOptions(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline">LMSC</span>
        </div>
        <Button onClick={() => setShowLoginOptions(true)} size="lg" className="gap-2 text-sm md:text-base">
          Get Started <ArrowRight className="w-4 h-4" />
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-xs md:text-sm font-medium text-accent">Revolutionize Learning</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Learn & Teach Like Never Before
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                Experience an interactive learning platform designed for students and teachers. Engage with lessons,
                take quizzes, and track progress in real-time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" className="gap-2 group text-sm md:text-base" onClick={() => setShowLoginOptions(true)}>
                Start Learning
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-sm md:text-base bg-transparent">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-4">
              <div>
                <div className="text-xl md:text-2xl font-bold text-primary">1000+</div>
                <p className="text-xs md:text-sm text-muted-foreground">Active Students</p>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-primary">50+</div>
                <p className="text-xs md:text-sm text-muted-foreground">Expert Teachers</p>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-primary">500+</div>
                <p className="text-xs md:text-sm text-muted-foreground">Lessons</p>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
            <div className="relative h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-8">
              <div className="w-20 md:w-24 h-20 md:h-24 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-10 md:w-12 h-10 md:h-12 text-primary-foreground" />
              </div>
              <p className="text-center font-semibold text-foreground text-sm md:text-base">
                Interactive Learning Platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 md:py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: "Students Learning", value: "1000+" },
              { label: "Teachers Active", value: "50+" },
              { label: "Lessons Available", value: "500+" },
              { label: "Success Rate", value: "95%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Powerful Features</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for an exceptional learning and teaching experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              icon: BookOpen,
              title: "Interactive Lessons",
              description:
                "Engage with multimedia content, videos, and interactive exercises designed to enhance learning.",
            },
            {
              icon: Zap,
              title: "Real-Time Quizzes",
              description: "Test your knowledge with instant feedback and detailed performance analytics.",
            },
            {
              icon: TrendingUp,
              title: "Progress Tracking",
              description: "Monitor learning progress with comprehensive statistics and insights.",
            },
            {
              icon: Users,
              title: "Teacher Dashboard",
              description: "Manage classes, track student engagement, and assess submissions efficiently.",
            },
            {
              icon: Clock,
              title: "Flexible Learning",
              description: "Learn at your own pace with on-demand access to all course materials.",
            },
            {
              icon: Award,
              title: "Achievements",
              description: "Earn badges and certificates as you complete lessons and milestones.",
            },
          ].map((feature, i) => (
            <Card key={i} className="border-border/50 hover:border-primary/50 transition-colors group hover:shadow-lg">
              <CardContent className="pt-6 md:pt-8 space-y-3 md:space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">How It Works</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple and intuitive for both students and teachers
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {[
              { step: 1, icon: Lightbulb, title: "Sign Up", desc: "Create your account and choose your role" },
              { step: 2, icon: BookOpen, title: "Explore", desc: "Browse available lessons and courses" },
              { step: 3, icon: BarChart3, title: "Learn", desc: "Complete lessons and take quizzes" },
              { step: 4, icon: Award, title: "Achieve", desc: "Track progress and earn certificates" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border-2 border-primary/20">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-primary mb-2">Step {item.step}</div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student vs Teacher Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6 md:pt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">For Students</h3>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Access all course materials anytime",
                  "Complete interactive quizzes",
                  "Submit and track assignments",
                  "View performance analytics",
                  "Receive instant feedback",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-transparent border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="pt-6 md:pt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">For Teachers</h3>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Create and manage lessons",
                  "View student engagement metrics",
                  "Grade assignments efficiently",
                  "Track quiz performance",
                  "Generate detailed reports",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-20 mb-8 md:mb-12">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
          <CardContent className="py-12 md:py-16 text-center space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Learning?</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students and teachers already using LMSC E-Learning Platform
            </p>
            <Button size="lg" className="gap-2 group text-sm md:text-base" onClick={() => setShowLoginOptions(true)}>
              Get Started Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/*      <Footer /> */}
      <Footer />

    </div>
  )
}
