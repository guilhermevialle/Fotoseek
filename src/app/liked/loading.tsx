import TopBreaker from '@/components/navs/TopBreaker'
import Padding from '@/components/responsive/Padding'
import { v4 } from 'uuid'

export default function Loading() {
  return (
    <main className='w-screen h-screen mt-10'>
      <TopBreaker />
      <Padding stretch={true}>
        <div className='w-full h-[10%] flex items-center'>
          <h1 className='bg-neutral-200 text-transparent animate-pulse text-2xl font-medium rounded-md'>
            Your choices
          </h1>
        </div>
        <div className='w-full h-[80%] relative flex flex-wrap gap-3'>
          {Array.from('12345').map((e) => {
            return (
              <div
                key={v4()}
                className='w-[48%] md:w-[32%] h-[400px] bg-neutral-100 animate-pulse rounded-md'
              ></div>
            )
          })}
        </div>
      </Padding>
    </main>
  )
}
