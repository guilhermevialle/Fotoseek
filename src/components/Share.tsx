import { useEffect, useRef } from 'react'
import Padding from './responsive/Padding'
import { usePathname, useRouter } from 'next/navigation'
import IconButton from './lib/buttons/IconButton'
import { SiWhatsapp } from 'react-icons/si'
import { IoCopySharp } from 'react-icons/io5'

type Props = {
  id: number
}

export default function Share({ id }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  function closeModal() {
    router.replace(`${pathname}/?id=${id}`)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal()
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  return (
    <main className='w-screen h-screen bg-black fixed bg-opacity-75 z-20'>
      <Padding stretch={true}>
        <div className='w-full h-full flex items-center justify-center'>
          <div
            ref={modalRef}
            className='w-full h-fit bg-white rounded-md p-3.5 flex flex-col'
          >
            <h1 className='text-xl font-medium'>Share image</h1>

            <p className='text-sm mt-1.5'>
              Share these images so others can download and enjoy Fotoseek :)
            </p>

            <div className='w-full h-fit flex mt-4'>
              <a
                href={`https://api.whatsapp.com/send?text=${`fotoseek.vercel.app${pathname}?id=${id}`}`}
              >
                <IconButton icon={<SiWhatsapp />} />
              </a>
            </div>

            <div className='w-full h-fit mt-4 bg-zinc-50 p-2 rounded flex items-center'>
              <span className='w-[90%] text-sm'>{`fotoseek.vercel.app${pathname}?id=${id}`}</span>
              <i className='w-[10%]'>
                <IoCopySharp size={20} />
              </i>
            </div>
          </div>
        </div>
      </Padding>
    </main>
  )
}
