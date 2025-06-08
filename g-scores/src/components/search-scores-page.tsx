"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { apiService } from "@/services/api"
import type { StudentScore } from "@/types/api"

export function SearchScoresPage() {
  const [sbd, setSbd] = useState("")
  const [studentScore, setStudentScore] = useState<StudentScore | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sbd.trim()) {
      setError("Please enter a registration number")
      return
    }

    setLoading(true)
    setError(null)
    setStudentScore(null)

    try {
      const data = await apiService.getStudentScore(sbd.trim())
      setStudentScore(data)
    } catch (err) {
      setError("Student not found or server error. Please check the registration number.")
    } finally {
      setLoading(false)
    }
  }

  const subjectLabels: Record<keyof Omit<StudentScore, "sbd" | "ma_ngoai_ngu">, string> = {
    toan: "Mathematics",
    ngu_van: "Literature",
    ngoai_ngu: "Foreign Language",
    vat_li: "Physics",
    hoa_hoc: "Chemistry",
    sinh_hoc: "Biology",
    lich_su: "History",
    dia_li: "Geography",
    gdcd: "Civic Education",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Student Scores</h1>
        <p className="text-gray-600">Enter a student registration number to view their exam scores</p>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>User Registration</CardTitle>
          <CardDescription>Registration Number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="sbd" className="sr-only">
                Registration Number
              </Label>
              <Input
                id="sbd"
                type="text"
                placeholder="Enter registration number"
                value={sbd}
                onChange={(e) => setSbd(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading} className="bg-black hover:bg-gray-800">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {studentScore && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Detailed Scores
            </CardTitle>
            <CardDescription>
              Registration Number: <span className="font-semibold">{studentScore.sbd}</span>
              {studentScore.ma_ngoai_ngu && (
                <span className="ml-4">
                  Foreign Language Code: <span className="font-semibold">{studentScore.ma_ngoai_ngu}</span>
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(subjectLabels).map(([key, label]) => {
                const score = studentScore[key as keyof typeof subjectLabels]
                return (
                  <div key={key} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-sm font-medium text-gray-600">{label}</div>
                    <div
                      className={`text-2xl font-bold mt-1 ${
                        score === null
                          ? "text-gray-400"
                          : score >= 8
                            ? "text-green-600"
                            : score >= 6
                              ? "text-blue-600"
                              : score >= 4
                                ? "text-yellow-600"
                                : "text-red-600"
                      }`}
                    >
                      {score === null ? "N/A" : score}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
