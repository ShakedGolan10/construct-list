import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main
      className="min-h-screen bg-base-100 text-base-content grid gap-4 px-[150px] pt-[150px] tablet:px-12 tablet:pt-12 mobile:px-4 mobile:pt-0">
      {children}
    </main>
  )
}
