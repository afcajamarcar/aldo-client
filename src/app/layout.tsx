import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk as sg } from 'next/font/google'

const spaceGrotesk = sg({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aldo\'s inventory app',
  description: 'Never miss a thing about Aldo\'s stores and products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}
