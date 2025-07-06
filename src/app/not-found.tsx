'use client';

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import Link from 'next/link';
import Image from 'next/image';
import { PageWrapper } from '@/components/layout/PageWrapper';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 4) {
      // Easter egg: redirect to home after 5 clicks
      window.location.href = '/';
    }
  };

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
			rgba(255, 107, 107, 0.3) 0%, 
			rgba(78, 205, 196, 0.2) 25%, 
			rgba(69, 183, 209, 0.2) 50%, 
			transparent 100%)`,
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0" style={gradientStyle} />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto p-8">
          {/* Animated 404 */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>

          {/* Floating Icon */}
          <div className="mb-8 relative">
            <div className="inline-block animate-bounce">
              <Image
                src="/icon-2.png"
                alt="Color Lab Icon"
                width={120}
                height={120}
                className="drop-shadow-2xl"
              />
            </div>

            {/* Sparkles around icon */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-spin"
                style={{
                  left: `${50 + 60 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                  top: `${50 + 60 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Oops! Color Not Found
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              This gradient seems to have faded into the void. But don&apos;t worry, there are
              plenty of beautiful colors waiting for you!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/">
              <Button
                label="Back to Color Lab"
                icon="pi pi-palette"
                className="px-8 py-3 text-lg font-semibold"
                severity="info"
              />
            </Link>

            <Button
              label="Explore Saved Colors"
              icon="pi pi-heart"
              className="px-8 py-3 text-lg font-semibold"
              severity="secondary"
              onClick={() => (window.location.href = '/saved')}
            />
          </div>

          {/* Fun Interactive Element */}
          <div className="cursor-pointer select-none" onClick={handleSecretClick}>
            <p className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {clickCount === 0 && '💡 Click me for a surprise!'}
              {clickCount === 1 && '🎨 Keep clicking...'}
              {clickCount === 2 && '🌈 Almost there...'}
              {clickCount === 3 && '✨ One more time!'}
              {clickCount >= 4 && '🚀 Magic happening...'}
            </p>
          </div>

          {/* Theme-aware decorative elements */}
          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-pink-500 animate-pulse" />
            <div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-teal-500 animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </PageWrapper>
  );
}
