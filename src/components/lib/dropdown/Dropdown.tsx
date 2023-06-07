import { DropdownOption } from '@/types'
import { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'

type Props = {
  buttonTitle: string
  sectionTitle: string
  options: DropdownOption[]
}

export default function Dropdown({
  buttonTitle,
  sectionTitle,
  options,
}: Props) {
  const [isSectionOpened, setDropdownSection] = useState<boolean>(false)

  return (
    <div className='w-40 h-fit relative bg-white flex'>
      <button
        className='flex-auto flex text-left border-[1px] border-neutral-200 p-2 px-3 rounded items-center justify-between'
        onClick={() => setDropdownSection((prev) => !prev)}
      >
        <span className='font-medium '>{buttonTitle}</span>
        <div className='w-[1px] h-[50%] bg-neutral-200'></div>
        <i className={`transition-all ${isSectionOpened ? 'rotate-180' : ''}`}>
          <BiChevronDown size={20} />
        </i>
      </button>

      {isSectionOpened && (
        <div className='w-56 absolute top-[120%] right-0 bg-white py-3 rounded border-[1px] border-neutral-200 shadow-sm'>
          <h1 className='font-semibold mb-3.5 px-4'>{sectionTitle}</h1>

          <div className='flex flex-col items-start'>
            {options.map((option) => {
              return (
                <button
                  onClick={() => option.clickFn()}
                  key={option.text}
                  className='w-full h-12 text-left hover:bg-neutral-50 rounded px-4 focus:bg-zinc-100'
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