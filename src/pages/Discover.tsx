'use client'

import ShowImagesProvider from '@/components/sections/ShowImages'
import { findManyImages } from '@/services/api'

type Props = {
  query: string
}

export default function Discover({ query }: Props) {
  const queryConfig = {
    key: query.replace(/\s/g, '') + 'Images',
    fetchFn: async (pageParam: number) =>
      findManyImages({ page: pageParam, query, perPage: 15 }),
  }

  return (
    <main className='w-full'>
      <ShowImagesProvider title={query + ' images'} queryConfig={queryConfig} />
    </main>
  )
}
