'use client'

import { useEffect, useState } from 'react'
import { useInfiniteQuery, QueryClientProvider, QueryClient } from 'react-query'
import { getTrendingImages } from '@/services/api'
import Padding from '../responsive/Padding'
import { Photo, PhotosWithTotalResults } from 'pexels'
import Footer from './Footer'
import { useSearchParams } from 'next/navigation'
import ScrollImage from '../ScrollImage'
import ImageModal from '../ImageModal'
import { v4 as uuid } from 'uuid'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Search from '../lib/inputs/Search'

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
  const [immutableData, setImmutableData] = useState<Photo[]>([])
  const [loadedImage, setLoadedImage] = useState<Photo | undefined>(undefined)
  const params = useSearchParams()
  const existId = params?.get('id')

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    queryConfig?.key ?? 'somekey',
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

  useEffect(() => {
    if (data) {
      const newData = data.pages.flatMap((page) => page?.photos ?? [])
      setImmutableData((prevData) => [...new Set([...prevData, ...newData])])
    }
  }, [data])

  function handleContainerScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
    const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLElement

    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100
    const threshold = 77

    if (scrollPercentage >= threshold) {
      if (!isFetching) fetchNextPage()
    }
  }

  return (
    <section className='w-full h-[100vh] mt-10'>
      <Padding stretch={true}>
        <div className='w-full h-[10%] flex items-center'>
          <h1 className='text-2xl font-medium '>{title}</h1>
        </div>

        <div className='w-full h-[80%] relative'>
          <div className='absolute w-full h-28 bg-gradient-to-b from-transparent to-white -bottom-2 left-0 z-20'></div>
          {(isFetching && !immutableData) || immutableData.length == 0 ? (
            <div className='w-full h-full flex justify-center items-center'>
              <Padding>
                <div className='w-full h-[70%] flex flex-col gap-y-4 items-center justify-center'>
                  <h1 className='text-lg font-medium text-center'>
                    Sorry, looks like we could not find what you wanted :/
                  </h1>
                  <div className='w-full bg-black rounded-md'>
                    <Search />
                  </div>
                </div>
              </Padding>
            </div>
          ) : (
            <div
              className='w-full h-full relative overflow-y-scroll'
              onScroll={handleContainerScroll}
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
              >
                <Masonry gutter='10px'>
                  {immutableData.map((image) => {
                    return (
                      <ScrollImage
                        onClick={() => setLoadedImage(image)}
                        key={uuid()}
                        image={image}
                      />
                    )
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          )}
        </div>

        <div className='w-full h-[10%]'>
          <Footer />
        </div>
      </Padding>

      {existId && <ImageModal id={existId} loadedImage={loadedImage} />}
    </section>
  )
}
