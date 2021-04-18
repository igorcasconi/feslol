import { Dispatch, SetStateAction } from 'react'

export type ColumnTableType = {
  fieldName: string
  name: string
}

export interface TableProps {
  columns: ColumnTableType[]
}

export interface TableRowProps {
  bgColor?: string
}

export interface TableCellProps {
  width?: string
  justifyContent?: string
}

export interface PaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  handleSelectPage?: () => void
}
