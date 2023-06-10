'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ImSearch, ImSpinner3 } from 'react-icons/im'
import { z } from 'zod'

export default function Search() {
  const router = useRouter()
  const [input, setInput] = useState<string>()
  const [submit, setSubmit] = useState<boolean>(false)

  const allowedChars = z
    .string()
    .min(3, 'Minimum input is 3.')
    .regex(
      /^[a-zA-Z0-9\s]*$/,
      'Only alphabet and numeric characters are allowed.'
    )

  function validateInput(input: string): boolean {
    try {
      allowedChars.parse(input)
      return true
    } catch (error) {
      return false
    }
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (input) {
      const isValidInput = validateInput(input)

      if (isValidInput) {
        setSubmit(true)
        return router.push(`/discover/${input}`)
      }

      console.log('Invalid input')
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(() => e.target.value)
  }

  return (
    <form
      className={`w-full h-[50px] flex items-center rounded text-zinc-400 relative border-[2px] transition-all ${
        input && !validateInput(input)
          ? ' border-red-400'
          : ' border-transparent '
      }`}
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
