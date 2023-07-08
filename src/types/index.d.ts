import { Photos } from 'pexels'

type Page = {
  pages: Photos[]
  pageParams: number[]
}

type DropdownOption = {
  text: string
  clickFn: () => void
}

type Size =
  | 'original'
  | 'large2x'
  | 'large'
  | 'medium'
  | 'small'
  | 'portrait'
  | 'landscape'
  | 'tiny'
