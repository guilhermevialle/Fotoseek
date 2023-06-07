/* eslint-disable @next/next/no-img-element */

import { usePathname, useRouter } from 'next/navigation'
import Padding from './responsive/Padding'
import { RxBookmarkFilled, RxBookmark } from 'react-icons/rx'
import IconButton from './lib/buttons/IconButton'
import { useEffect, useState } from 'react'
import { Photo } from 'pexels'
import { findUniqueImage } from '@/services/api'
import useLiked from '@/hooks/useLiked'
import Dropdown from './lib/dropdown/Dropdown'
import downloadImage from '@/utils/downloadImage'
import { DropdownOption, Size } from '@/types'

type Props = {
  id: string
}

export default function ImageModal({ id }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [imageLoadingStatus, setImageLoadingStatus] = useState<boolean>(false)
  const { addLikedItem, removeLikedItem, isLiked } = useLiked()

  const [image, setImage] = useState<Photo | undefined>(undefined)

  useEffect(() => {
    const fetchOnMount = async () => {
      let image = await findUniqueImage(Number(id))
      image && setImage(image)
    }
    fetchOnMount()
  }, [id])

  function saveLikedImage() {
    if (isLiked(Number(id))) return removeLikedItem(Number(id))

    addLikedItem(Number(id))
  }

  let sizes = image?.src && Object.keys(image?.src)
  let dropOptionsArray: DropdownOption[] = []

  if (sizes) {
    dropOptionsArray = sizes?.map((size) => {
      const inferSize = size as Size

      return {
        text: size,
        clickFn: () => downloadImage(image?.src[inferSize] ?? ''),
      }
    })
  }

  return (
    <div className='w-full h-full bg-black bg-opacity-60 z-20 fixed left-0 top-0'>
      <button
        className='text-white absolute top-6 left-8'
        onClick={() => router.push(`${pathname}`)}
      >
        X
      </button>
      <div className='w-full h-full border-2 flex justify-center items-center'>
        <Padding paddingY=' py-14 '>
          <div className='w-full h-full bg-white px-8'>
            <div className='w-full h-[10%] flex items-center justify-between'>
              <i onClick={saveLikedImage}>
                {isLiked(Number(id)) ? (
                  <IconButton icon={<RxBookmarkFilled size={18} />} />
                ) : (
                  <IconButton icon={<RxBookmark size={18} />} />
                )}
              </i>

              <Dropdown
                buttonTitle='Download'
                sectionTitle='Choose a size'
                options={dropOptionsArray}
              />
            </div>
            <div className='w-full h-[80%]'>
              <div
                className={`w-full h-full bg-neutral-300 ${
                  !imageLoadingStatus ? 'animate-pulse' : ''
                }`}
              >
                <img
                  className='w-full h-full object-cover'
                  src={image?.src.original}
                  loading='lazy'
                  onLoad={() => setImageLoadingStatus(true)}
                />
              </div>
            </div>
            <div className='w-full h-[10%] flex items-center'>
              <h1 className='text-gray-700 font-semibold'>
                {image?.photographer}
              </h1>
            </div>
          </div>
        </Padding>
      </div>
    </div>
  )
}
