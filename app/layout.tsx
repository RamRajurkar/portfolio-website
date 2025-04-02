import type { Metadata } from 'next'
import './globals.css'
import ClientWrapper from '@/components/layout/ClientWrapper'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import CustomCursor from '@/components/CustomCursor'
import AnimatedTitle from '@/components/AnimatedTitle'

export const metadata: Metadata = {
  title: 'Ram Rajurkar | AI Architect & Software Engineer',
  description: 'AI Architect & Software Engineer specializing in intelligent systems, immersive user experiences, and scalable digital solutions.',
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/RamProfile-modified.png', sizes: '192x192', type: 'image/png' },
      { url: '/RamProfile-modified.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: { url: '/RamProfile-modified.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: {
    title: 'Ram Rajurkar | Portfolio',
    description: 'AI Architect & Software Engineer',
    images: ['/RamProfile-modified.png'],
  },
}

// Add title animation
if (typeof window !== 'undefined') {
  const titles = [
    "Ram Rajurkar | Portfolio",
    "Ram | AI Architect",
    "Ram | AIML Devloper",
    "Ram | Software Engineer",
    "Ram | Full Stack Developer"
  ];
  let currentIndex = 0;

  setInterval(() => {
    document.title = titles[currentIndex];
    currentIndex = (currentIndex + 1) % titles.length;
  }, 3000);
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
            <AnimatedTitle />
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
