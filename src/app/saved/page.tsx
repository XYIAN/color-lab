'use client';

import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { GradientCard } from '@/components/common/GradientCard';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SavedItem, Gradient, GlassEffect } from '@/types';
import { generateGradientCSS } from '@/utils/gradientUtils';
import { STORAGE_KEYS } from '@/constants';

export default function SavedPage() {
  const toast = useRef<Toast>(null);
  const [savedItems, setSavedItems] = useLocalStorage<SavedItem[]>(
    STORAGE_KEYS.SAVED_GRADIENTS,
    []
  );
  const [filter, setFilter] = useState<'all' | 'gradient' | 'glass'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  const filterOptions = [
    { label: 'All Items', value: 'all' },
    { label: 'Gradients', value: 'gradient' },
    { label: 'Glass Effects', value: 'glass' },
  ];

  const sortOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
    { label: 'Name A-Z', value: 'name' },
  ];

  const filteredItems = savedItems
    .filter(item => filter === 'all' || item.type === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return (a.data as Gradient | GlassEffect).name.localeCompare(
            (b.data as Gradient | GlassEffect).name
          );
        default:
          return 0;
      }
    });

  const handleDelete = (itemId: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== itemId));
    toast.current?.show({
      severity: 'success',
      summary: 'Item Deleted',
      detail: 'Item has been removed from your collection',
      life: 3000,
    });
  };

  const handleClearAll = () => {
    setSavedItems([]);
    toast.current?.show({
      severity: 'success',
      summary: 'Collection Cleared',
      detail: 'All saved items have been removed',
      life: 3000,
    });
  };

  return (
    <PageWrapper>
      <Toast ref={toast} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Saved Collection</h1>
            <p className="text-muted-foreground">
              Your saved gradients, palettes, and glass effects
            </p>
          </div>

          {savedItems.length > 0 && (
            <Button
              icon="pi pi-trash"
              label="Clear All"
              severity="danger"
              text
              onClick={handleClearAll}
            />
          )}
        </div>

        {/* Filters and Controls */}
        {savedItems.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Filter by Type</label>
              <Dropdown
                value={filter}
                onChange={e => setFilter(e.value)}
                options={filterOptions}
                optionLabel="label"
                optionValue="value"
                placeholder="Filter items"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Sort by</label>
              <Dropdown
                value={sortBy}
                onChange={e => setSortBy(e.value)}
                options={sortOptions}
                optionLabel="label"
                optionValue="value"
                placeholder="Sort items"
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Items Grid */}
        {savedItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <i className="pi pi-heart text-3xl text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">No Saved Items Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start creating gradients and glass effects to see them here!
            </p>
            <Button
              label="Go to Color Lab"
              icon="pi pi-palette"
              severity="info"
              onClick={() => (window.location.href = '/')}
            />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No Items Match Your Filter</h2>
            <p className="text-muted-foreground">
              Try adjusting your filter settings to see more items.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              if (item.type === 'gradient') {
                const gradient = item.data as Gradient;
                const gradientCSS = generateGradientCSS(
                  gradient.colors,
                  gradient.direction,
                  gradient.angle
                );

                return (
                  <div key={item.id} className="relative">
                    <GradientCard gradient={gradientCSS} title={gradient.name} isSaved={true} />
                    <Button
                      icon="pi pi-trash"
                      onClick={() => handleDelete(item.id)}
                      severity="danger"
                      text
                      className="absolute top-2 right-2"
                      size="small"
                    />
                  </div>
                );
              } else if (item.type === 'glass') {
                const glass = item.data as GlassEffect;
                return (
                  <div
                    key={item.id}
                    className="bg-card rounded-lg p-4 shadow-lg border border-border relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{glass.name}</h3>
                      <Button
                        icon="pi pi-trash"
                        onClick={() => handleDelete(item.id)}
                        severity="danger"
                        text
                        size="small"
                      />
                    </div>
                    <div
                      className="w-full h-32 rounded-lg mb-3"
                      style={{
                        backdropFilter: `blur(${glass.blur}px)`,
                        backgroundColor: glass.backgroundColor.replace(
                          /[\d.]+\)$/,
                          `${glass.opacity})`
                        ),
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    />
                    <code className="text-sm bg-muted p-2 rounded block overflow-x-auto">
                      {`backdrop-filter: blur(${glass.blur}px);
background-color: ${glass.backgroundColor.replace(/[\d.]+\)$/, `${glass.opacity})`)};
border: 1px solid rgba(255, 255, 255, 0.2);`}
                    </code>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Stats */}
        {savedItems.length > 0 && (
          <div className="mt-12 bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Collection Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{savedItems.length}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {savedItems.filter(item => item.type === 'gradient').length}
                </div>
                <div className="text-sm text-muted-foreground">Gradients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {savedItems.filter(item => item.type === 'glass').length}
                </div>
                <div className="text-sm text-muted-foreground">Glass Effects</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
