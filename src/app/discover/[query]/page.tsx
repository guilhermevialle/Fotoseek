import Discover from '@/pages/Discover'

type Props = {
  params: {
    query: string
  }
}

export default function ServerDiscover({ params }: Props) {
  const { query } = params

  return <Discover query={decodeURIComponent(query)} />
}
