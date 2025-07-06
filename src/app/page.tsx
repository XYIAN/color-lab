'use client';

import { Toast } from 'primereact/toast';
import { useRef } from 'react';
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

  return (
    <PageWrapper>
      <Toast ref={toast} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Color Lab
          </h1>
          <p className="text-xl text-muted-foreground">
            Create, explore, and save stunning gradients and glassmorphic effects
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Gradient Builder */}
          <GradientBuilder onSave={handleSaveGradient} />

          {/* Glassmorphism Preview */}
          <GlassPreview onChange={handleSaveGlass} />
        </div>

        {/* Recent Saved Items */}
        {savedItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Recently Saved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <GradientCard
                        key={item.id}
                        gradient={gradientCSS}
                        title={gradient.name}
                        isSaved={isGradientSaved(gradient.id)}
                      />
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        )}

        {/* Quick Start Section */}
        <div className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="pi pi-palette text-2xl text-white" />
              </div>
              <h3 className="font-semibold mb-2">Build Gradients</h3>
              <p className="text-sm text-muted-foreground">
                Use the gradient builder to create beautiful color transitions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="pi pi-eye text-2xl text-white" />
              </div>
              <h3 className="font-semibold mb-2">Glass Effects</h3>
              <p className="text-sm text-muted-foreground">
                Experiment with blur and transparency for modern glassmorphism
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="pi pi-heart text-2xl text-white" />
              </div>
              <h3 className="font-semibold mb-2">Save & Share</h3>
              <p className="text-sm text-muted-foreground">
                Save your favorites and copy CSS code instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
