import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AGVN - Australian Government Virtual Network',
  description: 'Modern citizen engagement platform for Australian government initiatives',
  keywords: ['government', 'citizen engagement', 'australia', 'voting', 'democracy'],
  authors: [{ name: 'AGVN Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
