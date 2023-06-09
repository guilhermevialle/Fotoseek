'use client'

import { useRouter } from 'next/navigation'
import Padding from '../responsive/Padding'
import Logo from '../../../public/Fotoseek_logo_png.png'
import Image from 'next/image'
import { CgMenuGridR } from 'react-icons/cg'
import Dropdown from '../lib/dropdown/Dropdown'

export default function Topbar() {
  const router = useRouter()

  return (
    <nav className='w-full h-14 fixed left-0 top-0 bg-white z-20 py-9'>
      <Padding stretch={true}>
        <div className='w-full h-full flex items-center justify-between'>
          <button
            className='rounded-md overflow-hidden shadow-sm'
            onClick={() => router.replace('/')}
          >
            <Image src={Logo} width={48} height={48} alt='Fotoseek' />
          </button>

          <Dropdown
            buttonSize='w-24'
            buttonTitle={<CgMenuGridR size={24} />}
            sectionTitle=''
            sectionSize='w-36'
            options={[
              {
                text: 'Your choices',
                clickFn: () => router.push('/liked'),
              },
            ]}
          />
        </div>
      </Padding>
    </nav>
  )
}
