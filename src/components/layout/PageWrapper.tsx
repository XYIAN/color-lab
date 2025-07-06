'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="relative z-10 flex">
          <main className="flex-1 lg:ml-64 min-h-screen p-4 lg:p-8">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Cosmic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 cosmic-bg"
        style={{ backgroundImage: 'url(/bg-3.png)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 min-h-screen p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
