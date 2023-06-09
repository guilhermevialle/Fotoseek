import './globals.css'
import { Inter } from 'next/font/google'
import Topbar from '@/components/navs/Topbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fotoseek',
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
