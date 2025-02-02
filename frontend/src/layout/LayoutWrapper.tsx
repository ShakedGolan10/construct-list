import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main
      className="
        main-layout 
        min-h-screen 
        bg-base-100 
        text-base-content 
        grid 
        gap-4 
        grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]
        mobile:grid-cols-1
      "
    >
      {children}
    </main>
  )
}
