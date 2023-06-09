import Slogan from '@/components/Slogan/Slogan'
import Topbar from '@/components/navs/Topbar'
import ShowImagesProvider from '@/components/sections/ShowImages'
import { Photo } from 'pexels'

type Props = {
  staticRandomImage: Photo | undefined
}

export default function Root({ staticRandomImage }: Props) {
  return (
    <main>
      <Slogan staticRandomImage={staticRandomImage} />
      <ShowImagesProvider title='Free stock images' />
    </main>
  )
}
