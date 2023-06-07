export default function SloganSkeleton() {
  return (
    <div className='w-full h-[70vh] relative'>
      <div className='w-full h-full absolute -z-10'>
        <div className='w-full h-full'></div>
      </div>

      <div className='w-full h-full flex flex-col justify-center items-center overflow-hidden'>
        <div className='px-4 sm:20 md:w-[760px] h-full flex flex-col justify-center items-center'>
          <h1
            id='sloganTitle'
            className='text-3xl font-extrabold text-white mb-8 leading-[44px] break-words'
          >
            Premium free stock photos, royalty-free images & captivating videos
            shared by creators.
          </h1>

          <div className='w-full'>
            <h1 className='text-gray-300 font-medium'>
              Trending:
              <span className='text-white'>
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
