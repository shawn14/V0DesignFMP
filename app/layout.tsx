import React from 'react'
import { Metadata } from 'next'
import './globals.css'  // Add this line

export const metadata: Metadata = {
  title: 'TrendSpot',
  description: 'Discover the latest trends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
