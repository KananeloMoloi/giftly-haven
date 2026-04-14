import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Props {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout: React.FC<Props> = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
