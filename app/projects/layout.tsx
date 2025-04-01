export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background">
      {children}
    </main>
  )
}