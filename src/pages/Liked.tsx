/* eslint-disable @next/next/no-img-element */

'use client'

import ImageModal from '@/components/ImageModal'
import ScrollImage from '@/components/ScrollImage'
import NavBreaker from '@/components/bars/NavBreaker'
import Padding from '@/components/responsive/Padding'
import Footer from '@/components/sections/Footer'
import useLiked from '@/hooks/useLiked'
import { findLikedImages } from '@/services/api'
import { useSearchParams } from 'next/navigation'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { v4 as uuid } from 'uuid'

type Props = {}
const client = new QueryClient()

export default function LikedProvider({ ...rest }: Props) {
  return (
    <QueryClientProvider client={client}>
      <Liked {...rest} />
    </QueryClientProvider>
  )
}

function Liked({}: Props) {
  const params = useSearchParams()
  const id = params?.get('id')
  const { likedContent } = useLiked()

  const { data: likedImages } = useQuery({
    queryKey: ['liked', likedContent],
    queryFn: () => findLikedImages(likedContent),
  })

  return (
    <main className='w-screen h-screen'>
      <Padding stretch={true}>
        <div className='w-full h-[10%] flex items-center'>
          <h1 className='text-2xl font-medium'>Your choices</h1>
        </div>
        <div className='w-full h-[80%]'>
          <div className='w-full h-full relative overflow-y-scroll'>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
            >
              <Masonry gutter='10px'>
                {likedImages?.map((image) => {
                  return <ScrollImage key={uuid()} image={image} />
                })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
        <div className='w-full h-[10%]'>
          <Footer />
          {/* <NavBreaker /> */}
        </div>
      </Padding>
      {id && <ImageModal id={id} />}
    </main>
  )
}
