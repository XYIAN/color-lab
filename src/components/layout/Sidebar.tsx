'use client';

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Sidebar() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { href: '/', label: 'Home', icon: 'pi pi-home' },
    { href: '/components', label: 'Components', icon: 'pi pi-th-large' },
    { href: '/saved', label: 'Saved', icon: 'pi pi-heart' },
    { href: '/about', label: 'About', icon: 'pi pi-info-circle' },
  ];

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <Button
        icon="pi pi-bars"
        onClick={() => setVisible(true)}
        className="lg:hidden fixed top-4 left-4 z-50"
        rounded
        text
      />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Image src="/icon-1.png" alt="Color Lab" width={32} height={32} />
            <h1 className="text-xl font-bold">Color Lab</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <i className={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Controls */}
          <div className="space-y-2">
            <Button
              icon={theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'}
              onClick={toggleTheme}
              className="w-full"
              text
              label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <PrimeSidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="lg:hidden"
        position="left"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Image src="/icon-1.png" alt="Color Lab" width={32} height={32} />
            <h1 className="text-xl font-bold">Color Lab</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setVisible(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <i className={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Controls */}
          <div className="space-y-2">
            <Button
              icon={theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'}
              onClick={toggleTheme}
              className="w-full"
              text
              label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            />
          </div>
        </div>
      </PrimeSidebar>
    </>
  );
}
