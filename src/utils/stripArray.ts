import { Photos } from 'pexels'
import { InfiniteData } from 'react-query/types'

export default function stripArray(
  data: InfiniteData<Photos | undefined> | undefined,
  slices: number
) {
  if (!data || !data.pages || !Array.isArray(data.pages)) {
    return []
  }

  const images = data.pages.flatMap((page) => page?.photos || [])
  const imagesPerArray = Math.ceil(images.length / slices)

  const separatedArrays = Array.from(
    { length: Math.ceil(images.length / imagesPerArray) },
    (_, index) =>
      images.slice(index * imagesPerArray, (index + 1) * imagesPerArray)
  )

  return separatedArrays
}
