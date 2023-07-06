import Discover from '@/pages/Discover'

type Props = {
  params: {
    query: string
  }
}

export async function generateMetadata({ params }: Props) {
  return {
    title: params.query,
  }
}

export default function ServerDiscover({ params }: Props) {
  const { query } = params
  return <Discover query={decodeURIComponent(query)} />
}
