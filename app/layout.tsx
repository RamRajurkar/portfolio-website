import type { Metadata } from 'next'
import './globals.css'
import ClientWrapper from '@/components/layout/ClientWrapper'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientWrapper>
            <CustomCursor />
            <div className="fixed top-4 right-4 z-[100]">
              <ThemeToggle />
            </div>
            {children}
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
