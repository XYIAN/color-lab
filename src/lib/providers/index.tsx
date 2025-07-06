'use client';

import { PrimeReactProvider } from 'primereact/api';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return <PrimeReactProvider>{children}</PrimeReactProvider>;
  }

  return (
    <PrimeReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={true}
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </PrimeReactProvider>
  );
}
