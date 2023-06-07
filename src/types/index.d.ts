import { Photos } from 'pexels'

export type Page = {
  pages: Photos[]
  pageParams: number[]
}

export type DropdownOption = {
  text: string
  clickFn: () => void
}
