import { Photo, Photos, PhotosWithTotalResults } from 'pexels'
import { client } from './pexels/client/client'

export async function getTrendingImages(
  page: number
): Promise<Photos | undefined> {
  try {
    const data = await client.photos.curated({ page, per_page: 18 })
    if ('error' in data) return undefined
    return data
  } catch (error) {
    return undefined
  }
}

export async function findUniqueImage(id: number): Promise<Photo | undefined> {
  try {
    const image = await client.photos.show({
      id,
    })

    if (image && 'error' in image) return undefined
    return image
  } catch (error) {
    return undefined
  }
}

export async function getRandomImage(): Promise<Photo | undefined> {
  try {
    const image = await client.photos.random()
    if (image && 'error' in image) return undefined
    return image
  } catch (error) {
    return undefined
  }
}

type FindManyImages = {
  query: string
  page: number
  perPage: number
}

export async function findManyImages({
  page,
  perPage,
  query,
}: FindManyImages): Promise<PhotosWithTotalResults | undefined> {
  try {
    const images = await client.photos.search({
      query,
      page,
      per_page: perPage,
    })

    if ('error' in images) return undefined

    return images
  } catch (error) {
    return undefined
  }
}

export async function findLikedImages(
  likedArray: number[]
): Promise<Photo[] | undefined> {
  try {
    let data: Photo[] = []

    for (const imageId of likedArray) {
      const image = await findUniqueImage(imageId)

      if (!image || 'error' in image) continue
      data.push(image)
    }

    return data
  } catch (error) {
    return undefined
  }
}
