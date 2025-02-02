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
        px-[150px]   /* 150px padding left/right */
        pt-[150px]   /* 150px padding top */
        tablet:px-12 /* reduce to ~48px left/right on tablet */
        tablet:pt-12 /* ~48px top on tablet */
        mobile:px-4  /* ~16px left/right on mobile */
        mobile:pt-0  /* remove top padding on mobile */
      "
    >
      {children}
    </main>
  )
}
