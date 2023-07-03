import './globals.css'
import { Inter, Dancing_Script, Open_Sans } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap'
})

const open_sans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-oepn_sans',
  display: 'swap'
})


export const metadata = {
  title: 'Read With me',
  description: 'Designed for Reading',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancing.variable}`}>{children}</body>
    </html>
  )
}
