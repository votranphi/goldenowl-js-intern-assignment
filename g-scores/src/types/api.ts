export interface StudentScore {
  sbd: string
  toan: number
  ngu_van: number
  ngoai_ngu: number
  vat_li: number | null
  hoa_hoc: number | null
  sinh_hoc: number | null
  lich_su: number | null
  dia_li: number | null
  gdcd: number | null
  ma_ngoai_ngu: string
}

export interface Distribution {
  [subject: string]: {
    ">=8": number
    "6-8": number
    "4-6": number
    "<4": number
  }
}

export interface GroupAStudent {
  sbd: string
  toan: number
  vat_li: number
  hoa_hoc: number
  total_score: number // Changed from 'total' to 'total_score'
}

export interface Top10GroupAResponse {
  students: GroupAStudent[]
}
