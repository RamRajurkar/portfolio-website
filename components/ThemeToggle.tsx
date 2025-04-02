"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle({ fromNavbar = false }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !fromNavbar) return null

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 p-1 transition-colors dark:bg-gray-700 mr-4"
      aria-label="Toggle theme"
    >
      <span 
        className={`${
          resolvedTheme === "dark" ? "translate-x-8" : "translate-x-0"
        } inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out`}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-6 w-6 p-1 text-indigo-500" />
        ) : (
          <Sun className="h-6 w-6 p-1 text-amber-500" />
        )}
      </span>
    </button>
  )
}