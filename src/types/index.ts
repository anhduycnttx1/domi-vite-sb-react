import { UniqueIdentifier } from '@dnd-kit/core'

export interface IFSection {
  id: UniqueIdentifier
  row: number
  label: string
  sizeCol: string
  payload: {}
}

export interface IFElement {
  id: UniqueIdentifier
  sectionId: UniqueIdentifier
  col: number
  label: string
  payload: any
}

export interface ContainerProps {
  children: React.ReactNode
  columns?: number
  label?: string
  style?: React.CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: React.HTMLAttributes<any>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
  onRemove?(): void
}
