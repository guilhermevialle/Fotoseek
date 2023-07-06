import Topbar from '@/components/navs/Topbar'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Fotoseek',
    template: 'Fotoseek | %s',
  },

  description: 'A place where high-quality images are free.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://fonts.cdnfonts.com/css/utm-avo?styles=30169,15293'
          rel='stylesheet'
        />
      </head>
      <body className={inter.className + ' select-none'}>
        <Topbar />
        {children}
      </body>
      {/* <NavBreaker /> */}
    </html>
  )
}
