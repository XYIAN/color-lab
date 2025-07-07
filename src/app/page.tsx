'use client';

import { Toast } from 'primereact/toast';
import { useRef, useState, useEffect } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { GradientBuilder } from '@/components/home/GradientBuilder';
import { GlassPreview } from '@/components/common/GlassPreview';
import { GradientCard } from '@/components/common/GradientCard';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Gradient, SavedItem } from '@/types';
import { generateGradientCSS } from '@/utils/gradientUtils';
import { STORAGE_KEYS } from '@/constants';

export default function HomePage() {
  const toast = useRef<Toast>(null);
  const [savedItems, setSavedItems] = useLocalStorage<SavedItem[]>(
    STORAGE_KEYS.SAVED_GRADIENTS,
    []
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSaveGradient = (gradient: Gradient) => {
    const savedItem: SavedItem = {
      id: gradient.id,
      type: 'gradient',
      data: gradient,
      createdAt: new Date(),
    };

    setSavedItems(prev => {
      const existing = prev.find(item => item.id === gradient.id);
      if (existing) {
        return prev.map(item => (item.id === gradient.id ? savedItem : item));
      }
      return [...prev, savedItem];
    });

    toast.current?.show({
      severity: 'success',
      summary: 'Gradient Saved!',
      detail: `${gradient.name} has been added to your collection`,
      life: 3000,
    });
  };

  const handleSaveGlass = (blur: number, opacity: number) => {
    const glassEffect = {
      id: Date.now().toString(),
      name: 'Glass Effect',
      blur,
      opacity,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      createdAt: new Date(),
    };

    const savedItem: SavedItem = {
      id: glassEffect.id,
      type: 'glass',
      data: glassEffect,
      createdAt: new Date(),
    };

    setSavedItems(prev => [...prev, savedItem]);

    toast.current?.show({
      severity: 'success',
      summary: 'Glass Effect Saved!',
      detail: 'Your glassmorphism effect has been saved',
      life: 3000,
    });
  };

  const isGradientSaved = (gradientId: string) => {
    return savedItems.some(item => item.id === gradientId);
  };

  const scrollToGradientBuilder = () => {
    const element = document.getElementById('gradient-builder');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGlassPreview = () => {
    const element = document.getElementById('glass-preview');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSavedItems = () => {
    if (mounted && savedItems.length > 0) {
      const element = document.getElementById('saved-items');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no saved items, scroll to the saved page
      window.location.href = '/saved';
    }
  };

  const scrollToComponents = () => {
    window.location.href = '/components';
  };

  // Parallax effect for the hero section
  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
  };

  return (
    <PageWrapper>
      <Toast ref={toast} />

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Hero Section */}
        <div className="relative mb-16 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div
              className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-xl animate-pulse"
              style={parallaxStyle}
            />
            <div
              className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-30 blur-lg animate-bounce"
              style={{
                transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              }}
            />
            <div
              className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-25 blur-md animate-spin"
              style={{ animationDuration: '20s' }}
            />
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 text-center py-20">
            <div className="mb-8">
              <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                Color Lab
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Create, explore, and save stunning gradients, glassmorphic effects, and customize
                PrimeReact components with our comprehensive design system
              </p>
            </div>

            {/* Floating Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={scrollToGradientBuilder}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                onMouseEnter={() => setActiveFeature('gradient')}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <i className="pi pi-palette text-lg" />
                  Start Creating
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={scrollToComponents}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                onMouseEnter={() => setActiveFeature('components')}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <i className="pi pi-th-large text-lg" />
                  Component Lab
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div
                className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                  activeFeature === 'gradient'
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 scale-105'
                    : 'bg-card/50 border border-border hover:border-purple-500/30'
                }`}
                onMouseEnter={() => setActiveFeature('gradient')}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <i className="pi pi-palette text-2xl text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Gradient Builder</h3>
                <p className="text-sm text-muted-foreground">
                  Create beautiful color transitions with real-time preview
                </p>
              </div>

              <div
                className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                  activeFeature === 'glass'
                    ? 'bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 scale-105'
                    : 'bg-card/50 border border-border hover:border-green-500/30'
                }`}
                onMouseEnter={() => setActiveFeature('glass')}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <i className="pi pi-eye text-2xl text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Glass Effects</h3>
                <p className="text-sm text-muted-foreground">
                  Design modern glassmorphism with blur and transparency
                </p>
              </div>

              <div
                className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                  activeFeature === 'components'
                    ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 scale-105'
                    : 'bg-card/50 border border-border hover:border-blue-500/30'
                }`}
                onMouseEnter={() => setActiveFeature('components')}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <i className="pi pi-th-large text-2xl text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Component Lab</h3>
                <p className="text-sm text-muted-foreground">
                  Customize PrimeReact components with real-time styling
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Gradient Builder */}
          <div id="gradient-builder" className="group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative">
                <GradientBuilder onSave={handleSaveGradient} />
              </div>
            </div>
          </div>

          {/* Glassmorphism Preview */}
          <div id="glass-preview" className="group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative">
                <GlassPreview onSave={handleSaveGlass} />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Start Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Quick Start Guide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with Color Lab in just a few clicks. Explore our powerful tools and
              unleash your creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
            <div
              className="group relative p-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={scrollToGradientBuilder}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <i className="pi pi-palette text-3xl text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Build Gradients</h3>
                <p className="text-muted-foreground mb-4">
                  Use the gradient builder to create beautiful color transitions with live preview
                </p>
                <div className="flex items-center justify-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                  <span className="font-semibold">Get Started</span>
                  <i className="pi pi-arrow-right group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div
              className="group relative p-10 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={scrollToGlassPreview}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <i className="pi pi-eye text-3xl text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Glass Effects</h3>
                <p className="text-muted-foreground mb-4">
                  Experiment with blur and transparency for modern glassmorphism effects
                </p>
                <div className="flex items-center justify-center gap-2 text-green-400 group-hover:text-green-300 transition-colors duration-300">
                  <span className="font-semibold">Try It Out</span>
                  <i className="pi pi-arrow-right group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div
              className="group relative p-10 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={scrollToComponents}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <i className="pi pi-th-large text-3xl text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Component Lab</h3>
                <p className="text-muted-foreground mb-4">
                  Customize PrimeReact components with real-time styling and preview
                </p>
                <div className="flex items-center justify-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  <span className="font-semibold">Explore</span>
                  <i className="pi pi-arrow-right group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div
              className="group relative p-10 rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={scrollToSavedItems}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <i className="pi pi-heart text-3xl text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Save & Share</h3>
                <p className="text-muted-foreground mb-4">
                  Save your favorites and copy CSS code instantly for your projects
                </p>
                <div className="flex items-center justify-center gap-2 text-red-400 group-hover:text-red-300 transition-colors duration-300">
                  <span className="font-semibold">View Saved</span>
                  <i className="pi pi-arrow-right group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Saved Items with Enhanced Design */}
        {mounted && savedItems.length > 0 && (
          <div id="saved-items" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Recently Saved
              </h2>
              <p className="text-xl text-muted-foreground">
                Your latest creations and customizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedItems
                .slice(-6)
                .reverse()
                .map(item => {
                  if (item.type === 'gradient') {
                    const gradient = item.data as Gradient;
                    const gradientCSS = generateGradientCSS(
                      gradient.colors,
                      gradient.direction,
                      gradient.angle
                    );

                    return (
                      <div key={item.id} className="group">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                          <div className="relative">
                            <GradientCard
                              gradient={gradientCSS}
                              title={gradient.name}
                              isSaved={isGradientSaved(gradient.id)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="text-center py-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-3xl p-12 border border-purple-500/20">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of designers and developers who use Color Lab to create stunning
                visual experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={scrollToGradientBuilder}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Creating Now
                </button>
                <button
                  onClick={scrollToComponents}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Explore Components
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
