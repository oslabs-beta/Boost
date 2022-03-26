import { Column } from "react-table"

// States

// Props
export type QueryBoxProps = {
  onSubmit: () => void
}

export type QueryTableProps = {
  columns: Column[]
  data: string[][]
}

// Server
export type ServerError = {
  log: string
  status: number
  message: { err: string }
}  
