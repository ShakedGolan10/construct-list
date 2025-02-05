import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main
      className="min-h-screen bg-base-100 text-base-content grid 
                grid-cols-[100px_1fr_100px]
                tablet:grid-cols-[50px_1fr_50px] tablet:px-12  
                mobile:grid-cols-1 mobile:px-4 pt-28"
    >
      <div className="col-span-1"></div> {/* Left spacing */}
      <div className="col-span-1">{children}</div> {/* Content */}
      <div className="col-span-1"></div> {/* Right spacing */}
    </main>
  );
}
