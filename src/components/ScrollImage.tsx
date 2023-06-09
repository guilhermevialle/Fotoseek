/* eslint-disable @next/next/no-img-element */

'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Photo } from 'pexels'
import { FiDownload } from 'react-icons/fi'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  image: Photo
  imageHeight?: string
}

export default function ScrollImage({ image, imageHeight, ...rest }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div
      {...rest}
      id='imageCard'
      className='relative cursor-zoom-in z-10'
      onClick={() => router.replace(`${pathname}/?id=${image.id}`)}
    >
      <div className='w-full h-full absolute bg-black bg-opacity-30 top-0 left-0 z-20 p-3 opacity-0 transition-all duration-300'>
        <span className='text-white text-[17px] font-medium hover:underline'>
          {image.photographer}
        </span>
      </div>
      <img
        className='inline-block transition-all cursor-pointer relative'
        loading='lazy'
        src={image.src.large}
        height={imageHeight}
      />
    </div>
  )
}
