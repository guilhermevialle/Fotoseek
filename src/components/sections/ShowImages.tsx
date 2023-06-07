'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useInfiniteQuery, QueryClientProvider, QueryClient } from 'react-query'
import { getTrendingImages } from '@/services/api'
import Padding from '../responsive/Padding'
import stripArray from '@/utils/stripArray'
import { Photo, PhotosWithTotalResults } from 'pexels'
import Footer from './Footer'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ScrollImage from '../ScrollImage'
import ImageModal from '../ImageModal'

type Props = {
  title: string
  queryConfig?: {
    key: string
    fetchFn: (pageParam: number) => Promise<PhotosWithTotalResults | undefined>
  }
}

export default function ShowImagesProvider({ ...rest }: Props) {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <ShowImages {...rest} />
    </QueryClientProvider>
  )
}

function ShowImages({ queryConfig, title }: Props) {
  const isMediumScreen = useMediaQuery({ minWidth: 768 })
  const [strippedData, setStrippedData] = useState<Photo[][]>([])
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const existId = params?.get('id')

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    'key',
    async ({ pageParam = 1 }) => {
      if (queryConfig && queryConfig?.fetchFn) {
        return await queryConfig.fetchFn(pageParam)
      }
      return await getTrendingImages(pageParam)
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return nextPage
      },
    }
  )

  function handleContainerScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
    const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLElement

    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100
    const threshold = 77

    if (scrollPercentage >= threshold) {
      if (!isFetching) fetchNextPage()
    }
  }

  useEffect(() => {
    setStrippedData((prev) => [...stripArray(data, 3)])
  }, [data])

  useEffect(() => {
    if (data) {
      setStrippedData((prevData) => {
        const strippedData = stripArray(data, 3)
        const newStrippedData = prevData.map((slicedArray, index) => {
          const newArray = [...slicedArray, ...strippedData[index]]
          return newArray
        })
        return newStrippedData
      })
    }
  }, [data])

  return (
    <section className='w-full h-[100vh] mt-10'>
      <Padding stretch={true}>
        <div className='w-full h-[10%] flex items-center'>
          <h1 className='text-2xl font-medium '>{title}</h1>
        </div>

        <div className='w-full h-[80%] relative'>
          <div className='absolute w-full h-28 bg-gradient-to-b from-transparent to-white -bottom-2 left-0 z-20'></div>
          <div
            className='w-full h-full overflow-y-auto flex gap-x-2 '
            onScroll={(e) => handleContainerScroll(e)}
          >
            {strippedData.length > 0 &&
              strippedData.map((arrayOfImages) => {
                return (
                  <div className={`w-1/3 flex-auto h-fit space-y-2`}>
                    {arrayOfImages.map((image) => {
                      return <ScrollImage key={image.id} image={image} />
                    })}
                  </div>
                )
              })}
          </div>
        </div>

        <div className='w-full h-[10%]'>
          <Footer />
        </div>
      </Padding>

      {existId && <ImageModal id={existId} />}
    </section>
  )
}
