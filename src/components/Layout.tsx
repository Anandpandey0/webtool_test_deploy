// components/Layout.tsx
import Sidebar from '@/assets/home/Sidebar';
import React, { ReactNode } from 'react';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-black flex overflow-hidden" >
      <div className="w-[15vw] bg-white z-[100]">
        <Sidebar />
      </div>
      <div className="flex-grow bg-gray-200">
        {children}
      </div>
    </div>
  );
};

export default Layout;
