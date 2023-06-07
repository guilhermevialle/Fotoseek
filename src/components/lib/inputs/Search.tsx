'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ImSearch, ImSpinner3 } from 'react-icons/im'

export default function Search() {
  const router = useRouter()
  const [input, setInput] = useState<string>()
  const [submit, setSubmit] = useState<boolean>(false)

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (input && input.length > 3) {
      setSubmit(true)
      router.push(`/discover/${input}`)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(() => e.target.value)
  }

  return (
    <form
      className='w-full h-[50px] flex items-center rounded text-zinc-400 relative'
      onSubmit={(e) => handleSearchSubmit(e)}
    >
      <div className='w-full h-full -z-10 absolute bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded'></div>
      <i className='px-5'>
        <ImSearch size={15} />
      </i>
      <input
        className='flex-auto h-full bg-transparent outline-none placeholder:text-zinc-400 overflow-hidden text-neutral-200'
        type='text'
        placeholder='Find something'
        onChange={(e) => handleInputChange(e)}
      />
      <i className='px-5 animate-spin'>{submit && <ImSpinner3 size={15} />}</i>
    </form>
  )
}
