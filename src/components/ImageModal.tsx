/* eslint-disable @next/next/no-img-element */

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
import { MdClose } from 'react-icons/md'
import { FiSend } from 'react-icons/fi'
import Share from './Share'

type Props = {
  id: string
  loadedImage?: Photo
}

export default function ImageModal({ id, loadedImage }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const share = params?.get('share')
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
      {share && <Share id={Number(id)} />}
      <div className='w-full h-full flex justify-center items-center flex-col'>
        <div className='w-full h-[5%]'>
          <Padding>
            <button
              className='text-white absolute top-3 left-3'
              onClick={() => router.push(`${pathname}`)}
            >
              <MdClose size={34} />
            </button>
          </Padding>
        </div>
        <div className='w-full h-[95%]'>
          <Padding paddingY=' py-4 md:py-10 '>
            <div className='w-full h-full bg-white px-4 rounded shadow-md'>
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
                  className={`w-full h-full rounded shadow-sm overflow-hidden relative ${
                    !imageLoadingStatus ? 'animate-pulse' : ''
                  }`}
                >
                  {!imageLoadingStatus && !loadedImage && (
                    <img
                      className='absolute w-full h-full object-cover object-center top-0 left-0 blur-sm'
                      src={image?.src.small}
                    />
                  )}
                  <img
                    className='w-full h-full object-cover '
                    src={loadedImage?.src.original ?? image?.src.original}
                    loading='lazy'
                    onLoad={() => setImageLoadingStatus(true)}
                    style={{
                      visibility: !imageLoadingStatus ? 'hidden' : 'visible',
                    }}
                  />
                </div>
              </div>
              <div className='w-full h-[10%] flex items-center justify-between'>
                <h1 className='text-gray-700 font-semibold'>
                  {loadedImage?.src.original ?? image?.photographer}
                </h1>
                <i
                  onClick={() =>
                    router.replace(`${pathname}/?id=${id}&share=true`)
                  }
                >
                  <IconButton icon={<FiSend />} />
                </i>
              </div>
            </div>
          </Padding>
        </div>
      </div>
    </div>
  )
}
