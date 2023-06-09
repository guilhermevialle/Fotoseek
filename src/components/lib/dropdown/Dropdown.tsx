import { DropdownOption } from '@/types'
import { useState, useEffect, useRef } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { v4 as uuid } from 'uuid'

type Props = {
  buttonSize?: string
  buttonTitle: string | React.ReactNode
  sectionTitle: string
  sectionSize?: string
  options: DropdownOption[]
}

export default function Dropdown({
  buttonTitle,
  sectionTitle,
  buttonSize,
  sectionSize,
  options,
}: Props) {
  const [isSectionOpened, setDropdownSection] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdownSection()
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  function closeDropdownSection() {
    setDropdownSection(false)
  }

  return (
    <div
      ref={dropdownRef}
      className={`${
        buttonSize ? buttonSize : 'w-40 '
      } h-fit relative bg-white flex`}
    >
      <button
        className='flex-auto flex text-left border-[1px] border-neutral-200 hover:border-neutral-300 focus:border-neutral-400 p-2 px-3 rounded items-center justify-between shadow-sm text-sm'
        onClick={() => setDropdownSection((prev) => !prev)}
      >
        <span className='font-medium '>{buttonTitle}</span>
        <div className='w-[1px] h-[50%] bg-neutral-200'></div>
        <i className={`transition-all ${isSectionOpened ? 'rotate-180' : ''}`}>
          <BiChevronDown size={20} />
        </i>
      </button>

      {isSectionOpened && (
        <div
          className={`${
            sectionSize ? sectionSize : 'w-56 '
          } absolute top-[120%] right-0 bg-white py-3 rounded border-[1px] z-20 border-neutral-200 shadow-sm`}
        >
          <h1 className='font-semibold mb-3.5 px-4 text-sm'>{sectionTitle}</h1>

          <div className='flex flex-col items-start'>
            {options.map((option) => {
              return (
                <button
                  onClick={() => {
                    closeDropdownSection()
                    option.clickFn()
                  }}
                  key={uuid()}
                  className='w-full h-11 text-left hover:bg-neutral-50 rounded px-4 focus:bg-zinc-100 text-sm'
                >
                  {option.text}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
