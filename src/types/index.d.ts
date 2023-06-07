import { Photos } from 'pexels'

export type Page = {
  pages: Photos[]
  pageParams: number[]
}

export type DropdownOption = {
  text: string
  clickFn: () => void
}

export type Size =
  | 'original'
  | 'large2x'
  | 'large'
  | 'medium'
  | 'small'
  | 'portrait'
  | 'landscape'
  | 'tiny'
