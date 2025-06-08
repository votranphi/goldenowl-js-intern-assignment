"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Trophy } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { apiService } from "@/services/api"
import type { Distribution, GroupAStudent } from "@/types/api"

export function ReportsPage() {
  const [distribution, setDistribution] = useState<Distribution | null>(null)
  const [topStudents, setTopStudents] = useState<GroupAStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [distributionData, topStudentsData] = await Promise.all([
          apiService.getSubjectDistribution(),
          apiService.getTop10GroupA(),
        ])

        setDistribution(distributionData)
        setTopStudents(topStudentsData)
      } catch (err) {
        setError("Failed to load reports data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const subjectLabels: Record<string, string> = {
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

  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading reports...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Reports</h1>
        <p className="text-gray-600">Score distribution analysis and top performers</p>
      </div>

      {/* Subject Distribution Charts */}
      {distribution && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(distribution).map(([subject, data]) => {
            const chartData = [
              { range: "≥8.0", count: data[">=8"], fill: colors[0] },
              { range: "6.0-7.9", count: data["6-8"], fill: colors[1] },
              { range: "4.0-5.9", count: data["4-6"], fill: colors[2] },
              { range: "<4.0", count: data["<4"], fill: colors[3] },
            ]

            return (
              <Card key={subject}>
                <CardHeader>
                  <CardTitle>{subjectLabels[subject] || subject}</CardTitle>
                  <CardDescription>Score distribution by grade ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Top 10 Group A Students */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Top 10 Students - Group A (Math + Physics + Chemistry)
          </CardTitle>
          <CardDescription>Highest combined scores in Group A subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Rank</th>
                  <th className="text-left p-3 font-semibold">Registration Number</th>
                  <th className="text-center p-3 font-semibold">Mathematics</th>
                  <th className="text-center p-3 font-semibold">Physics</th>
                  <th className="text-center p-3 font-semibold">Chemistry</th>
                  <th className="text-center p-3 font-semibold">Total Score</th>
                </tr>
              </thead>
              <tbody>
                {topStudents.map((student, index) => (
                  <tr key={student.sbd} className={`border-b hover:bg-gray-50 ${index < 3 ? "bg-yellow-50" : ""}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                        {index === 1 && <Trophy className="h-4 w-4 text-gray-400" />}
                        {index === 2 && <Trophy className="h-4 w-4 text-amber-600" />}
                        <span className="font-semibold">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono">{student.sbd}</td>
                    <td className="p-3 text-center">{student.toan.toFixed(1)}</td>
                    <td className="p-3 text-center">{student.vat_li.toFixed(1)}</td>
                    <td className="p-3 text-center">{student.hoa_hoc.toFixed(1)}</td>
                    <td className="p-3 text-center">
                      <span className="font-bold text-lg text-blue-600">{student.total_score.toFixed(1)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
