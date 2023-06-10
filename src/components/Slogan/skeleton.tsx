import Search from '../lib/inputs/Search'

export default function SloganSkeleton() {
  return (
    <div className='w-full h-[70vh] relative'>
      <div className='w-full h-full absolute -z-10'>
        <div className='w-full h-full bg-neutral-100 animate-pulse'></div>
      </div>

      <div className='w-full h-full flex flex-col justify-center items-center overflow-hidden'>
        <div className='px-4 w-fit md:w-[760px] h-full flex flex-col justify-center items-center'>
          <h1
            id='sloganTitle'
            className='text-3xl font-extrabold text-white mb-8 leading-[44px] break-words uvo-font bg-neutral-200 text-transparent rounded-md animate-pulse'
          >
            Premium free stock photos, royalty-free images & captivating videos
            shared by creators.
          </h1>

          <div className='min-w-full h-[50px] bg-neutral-200 animate-pulse rounded-md'></div>

          <div className='w-full mt-4'>
            <h1 className='text-gray-200 font-medium bg-neutral-200 text-transparent rounded-md animate-pulse'>
              Trending:
              <span className='text-white text-sm text-transparent'>
                {' '}
                Cats, Coffee, Programming, Nature
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
