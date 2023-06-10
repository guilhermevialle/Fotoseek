import SloganSkeleton from '@/components/Slogan/skeleton'
import Padding from '@/components/responsive/Padding'
import { v4 } from 'uuid'

export default function Loading() {
  return (
    <main className='w-screen h-screen'>
      <SloganSkeleton />
      <section className='w-full h-[100vh] mt-10'>
        <Padding stretch={true}>
          <div className='w-full h-[10%] flex items-center'>
            <h1 className='text-2xl font-medium bg-neutral-200 text-transparent rounded-md animate-pulse'>
              titletitletitletitletile
            </h1>
          </div>

          <div className='w-full h-[80%] relative flex flex-wrap gap-3'>
            {Array.from('12345').map((e) => {
              return (
                <div
                  key={v4()}
                  className='w-[48%] md:w-[32%] h-[400px] bg-neutral-100 animate-pulse'
                ></div>
              )
            })}
          </div>
        </Padding>
      </section>
    </main>
  )
}
