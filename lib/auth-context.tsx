"use client"

import { createContext, useContext, useState, useEffect } from "react"

type Role = "student" | "teacher" | null

interface UserPayload {
  id: string
  name: string
  email: string
  role: "student" | "teacher"
}

interface AuthContextType {
  role: Role
  token: string | null
  user: UserPayload | null
  login: (email: string, role: Role) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserPayload | null>(null)

  // Restore saved session
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (savedToken && savedUser) {
      const parsed = JSON.parse(savedUser) as UserPayload
      setToken(savedToken)
      setUser(parsed)
      setRole(parsed.role)
    }
  }, [])

  const login = async (email: string, role: Role) => {
    if (!role) throw new Error("Role is required")

    // Backend expects uppercase role
    const apiRole = role

    try {
      const res = await fetch(`${BASE_URL}/auth/simple-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: apiRole }),
      })

      if (!res.ok) throw new Error("Login failed")
      const data = await res.json()

      const token = data.data.token
      const payload = JSON.parse(atob(token.split(".")[1]))

      // Convert backend role → lowercase
      const userData: UserPayload = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role.toLowerCase(),
      }

      setUser(userData)
      setRole(userData.role)
      setToken(token)

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (err) {
      console.error(err)
      throw new Error("Invalid credentials or server error")
    }
  }

  const logout = () => {
    setRole(null)
    setToken(null)
    setUser(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ role, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
