"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/sidebar-layout"
import { SearchScoresPage } from "@/components/search-scores-page"
import { ReportsPage } from "@/components/reports-page"

type PageType = "dashboard" | "search" | "reports" | "settings"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("search")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-gray-600">Welcome to G-Scores Dashboard</p>
          </div>
        )
      case "search":
        return <SearchScoresPage />
      case "reports":
        return <ReportsPage />
      case "settings":
        return (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Application settings will be available here</p>
          </div>
        )
      default:
        return <SearchScoresPage />
    }
  }

  return (
    <SidebarLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </SidebarLayout>
  )
}
