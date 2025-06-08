import { axiosInstance } from "@/lib/axios"
import type { StudentScore, Distribution, GroupAStudent } from "@/types/api"

interface Top10GroupAResponse {
  students: GroupAStudent[]
}

export const apiService = {
  async getStudentScore(sbd: string): Promise<StudentScore> {
    const response = await axiosInstance.get<StudentScore>(`/students/${sbd}`)
    return response.data
  },

  async getSubjectDistribution(): Promise<Distribution> {
    const response = await axiosInstance.get<Distribution>("/reports/subject-distribution")
    return response.data
  },

  async getTop10GroupA(): Promise<GroupAStudent[]> {
    const response = await axiosInstance.get<Top10GroupAResponse>("/reports/top10-groupA")
    return response.data.students // Extract the students array from the wrapper
  },
}
