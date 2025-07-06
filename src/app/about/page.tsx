'use client';

import { Button } from 'primereact/button';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { SOCIAL_LINKS } from '@/constants';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Image
              src="/icon-2.png"
              alt="Color Lab"
              width={120}
              height={120}
              className="mx-auto drop-shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            About Color Lab
          </h1>
          <p className="text-xl text-muted-foreground">
            Your creative playground for colors, gradients, and glassmorphism
          </p>
        </div>

        {/* What is Color Lab */}
        <div className="bg-card rounded-lg p-8 border border-border mb-8">
          <h2 className="text-2xl font-bold mb-4">What is Color Lab?</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Color Lab is a mobile-first, interactive web application designed for designers,
            developers, and anyone who loves working with colors. Create stunning gradients,
            experiment with glassmorphism effects, and build beautiful color palettes with ease.
          </p>
          <p className="text-lg text-muted-foreground">
            Built with modern web technologies including Next.js 15, PrimeReact, and Tailwind CSS,
            Color Lab provides a smooth, responsive experience across all devices.
          </p>
        </div>

        {/* How to Use */}
        <div className="bg-card rounded-lg p-8 border border-border mb-8">
          <h2 className="text-2xl font-bold mb-6">How to Use Color Lab</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <i className="pi pi-palette text-primary" />
                Gradient Builder
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Choose between linear and radial gradients</li>
                <li>• Add up to 5 colors with intuitive controls</li>
                <li>• Adjust angles for linear gradients</li>
                <li>• Use quick color palette for inspiration</li>
                <li>• Copy CSS code instantly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <i className="pi pi-eye text-primary" />
                Glassmorphism Effects
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Adjust blur intensity with live preview</li>
                <li>• Control transparency levels</li>
                <li>• See real-time CSS output</li>
                <li>• Perfect for modern UI designs</li>
                <li>• Save your favorite effects</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card rounded-lg p-8 border border-border mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="pi pi-mobile text-2xl text-white" />
              </div>
              <h3 className="font-semibold mb-2">Mobile-First Design</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for touch devices with responsive layouts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="pi pi-moon text-2xl text-white" />
              </div>
              <h3 className="font-semibold mb-2">Theme Switching</h3>
              <p className="text-sm text-muted-foreground">
                Toggle between light and dark modes instantly
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="pi pi-download text-2xl text-white" />
              </div>
              <h3 className="font-semibold mb-2">Local Storage</h3>
              <p className="text-sm text-muted-foreground">
                Save your creations locally for easy access
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card rounded-lg p-8 border border-border mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Connect & Follow</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              icon="pi pi-github"
              label="Follow me on GitHub @XYIAN"
              severity="info"
              className="px-6 py-3"
              onClick={() => window.open(SOCIAL_LINKS.GITHUB, '_blank')}
            />
            <Button
              icon="pi pi-linkedin"
              label="Connect on LinkedIn"
              severity="secondary"
              className="px-6 py-3"
              onClick={() => window.open(SOCIAL_LINKS.LINKEDIN, '_blank')}
            />
            <Button
              icon="pi pi-globe"
              label="Visit Website"
              severity="success"
              className="px-6 py-3"
              onClick={() => window.open(SOCIAL_LINKS.WEBSITE, '_blank')}
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-6">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-blue-500">Next.js 15</div>
              <div className="text-sm text-muted-foreground">App Router</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-purple-500">PrimeReact</div>
              <div className="text-sm text-muted-foreground">UI Components</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-cyan-500">Tailwind CSS</div>
              <div className="text-sm text-muted-foreground">Styling</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-green-500">TypeScript</div>
              <div className="text-sm text-muted-foreground">Type Safety</div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
