"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Search, Settings, Home, Menu, X } from "lucide-react"

interface SidebarLayoutProps {
  children: React.ReactNode
  currentPage: "dashboard" | "search" | "reports" | "settings"
  onNavigate: (page: "dashboard" | "search" | "reports" | "settings") => void
}

export function SidebarLayout({ children, currentPage, onNavigate }: SidebarLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: Home },
    { id: "search" as const, label: "Search Scores", icon: Search },
    { id: "reports" as const, label: "Reports", icon: BarChart3 },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">G-Scores</h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-blue-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-gradient-to-b from-yellow-400 via-yellow-500 to-green-500 w-64 min-h-[calc(100vh-80px)] p-4 transition-transform duration-300 ease-in-out",
            "md:translate-x-0",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
            "fixed md:relative z-20",
          )}
        >
          <nav className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left font-medium",
                    currentPage === item.id
                      ? "bg-white/20 text-gray-900 hover:bg-white/30"
                      : "text-gray-800 hover:bg-white/10",
                  )}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-10 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 md:ml-0">{children}</main>
      </div>
    </div>
  )
}
