import Root from '@/pages/Root'
import { getRandomImage } from '@/services/api'

export default async function ServerRoot() {
  const staticRandomImage = await getRandomImage()

  return <Root staticRandomImage={staticRandomImage} />
}
