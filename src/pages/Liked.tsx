'use client'

import NavBreaker from '@/components/bars/NavBreaker'
import Padding from '@/components/responsive/Padding'
import Footer from '@/components/sections/Footer'
import useLiked from '@/hooks/useLiked'
import { findLikedImages } from '@/services/api'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

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
          <div className='w-full h-full columns-3'>
            {likedImages?.map((image) => {
              return <img src={image.src.large2x} />
            })}
          </div>
        </div>
        <div className='w-full h-[10%]'>
          <Footer />
          {/* <NavBreaker /> */}
        </div>
      </Padding>
    </main>
  )
}
