/* eslint-disable @next/next/no-img-element */

'use client'

import { Photo } from 'pexels'
import { useMediaQuery } from 'react-responsive'
import Search from '../lib/inputs/Search'

type Props = {
  staticRandomImage: Photo | undefined
}

export default function Slogan({ staticRandomImage }: Props) {
  const isMediumSize = useMediaQuery({ minWidth: 768 })

  return (
    <div className='w-full h-[70vh] relative'>
      <div className='w-full h-full absolute -z-10'>
        <img
          className='w-full h-full object-cover brightness-[30%]'
          alt={staticRandomImage?.alt ?? 'loading'}
          src={
            !isMediumSize
              ? staticRandomImage?.src.large2x
              : staticRandomImage?.src.landscape
          }
        />
      </div>

      <div className='w-full h-full flex flex-col justify-center items-center overflow-hidden'>
        <div className='px-10 md:w-[760px] h-full flex flex-col justify-center items-center'>
          <h1
            id='sloganTitle'
            className='text-3xl font-extrabold text-white mb-8 leading-[44px] break-words uvo-font'
          >
            Premium free stock photos, royalty-free images & captivating videos
            shared by creators.
          </h1>

          <Search />

          <div className='w-full mt-4'>
            <h1 className='text-gray-300 font-medium'>
              Trending:
              <span className='text-white text-sm'>
                {' '}
                Cats, Coffee, Programming, Nature
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
