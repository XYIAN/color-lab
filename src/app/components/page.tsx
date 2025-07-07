'use client';

import { useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { useTheme } from 'next-themes';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { CustomizationPanel } from '@/components/components/CustomizationPanel';
import { ComponentPreview } from '@/components/components/ComponentPreview';
import { ComponentSelector } from '@/components/components/ComponentSelector';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ComponentConfig, ComponentType, ComponentStyles, ComponentContent } from '@/types';
import { STORAGE_KEYS } from '@/constants';

// Theme-aware default configurations
const getDefaultConfig = (type: ComponentType, theme: string): ComponentConfig => {
  const isDark = theme === 'dark';

  const baseStyles: ComponentStyles = {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    textColor: isDark ? '#f9fafb' : '#000000',
    borderColor: isDark ? '#374151' : '#e5e7eb',
    primaryColor: '#3b82f6',
    secondaryColor: isDark ? '#9ca3af' : '#6b7280',
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: '1.5',
    padding: '16px',
    margin: '0px',
    borderRadius: '8px',
    shadow: isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    opacity: 1,
    blur: 0,
    animation: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
    height: 'auto',
    maxWidth: '400px',
    maxHeight: 'none',
  };

  return {
    id: Date.now().toString(),
    name: `Custom ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    type,
    styles: baseStyles,
    content: {
      title: 'Sample Card',
      description: 'This is a customizable card component',
      items: [
        {
          id: '1',
          title: 'Feature 1',
          content: 'Description of feature 1',
          icon: 'pi pi-star',
        },
        {
          id: '2',
          title: 'Feature 2',
          content: 'Description of feature 2',
          icon: 'pi pi-heart',
        },
      ],
      links: [
        {
          id: '1',
          platform: 'GitHub',
          url: 'https://github.com',
          icon: 'pi pi-github',
          color: '#333333',
        },
        {
          id: '2',
          platform: 'LinkedIn',
          url: 'https://linkedin.com',
          icon: 'pi pi-linkedin',
          color: '#0077b5',
        },
      ],
    },
    createdAt: new Date(),
  };
};

export default function ComponentsPage() {
  const toast = useRef<Toast>(null);
  const { resolvedTheme } = useTheme();
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('card');
  const [componentConfig, setComponentConfig] = useState<ComponentConfig>(() =>
    getDefaultConfig('card', resolvedTheme || 'light')
  );

  const [savedComponents, setSavedComponents] = useLocalStorage<ComponentConfig[]>(
    STORAGE_KEYS.SAVED_COMPONENTS || 'color-lab-saved-components',
    []
  );

  // Reset component config when theme changes
  useEffect(() => {
    const currentTheme = resolvedTheme || 'light';
    setComponentConfig(prev => ({
      ...getDefaultConfig(prev.type, currentTheme),
      id: prev.id,
      name: prev.name,
    }));
  }, [resolvedTheme]);

  const handleStyleChange = (property: keyof ComponentStyles, value: string | number) => {
    setComponentConfig(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        [property]: value,
      },
    }));
  };

  const handleContentChange = (
    property: keyof ComponentContent,
    value: string | ComponentConfig['content'][keyof ComponentContent]
  ) => {
    setComponentConfig(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [property]: value,
      },
    }));
  };

  const handleSaveComponent = () => {
    const updatedConfig = {
      ...componentConfig,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setSavedComponents(prev => [...prev, updatedConfig]);

    toast.current?.show({
      severity: 'success',
      summary: 'Component Saved!',
      detail: `${updatedConfig.name} has been added to your collection`,
      life: 3000,
    });
  };

  const handleComponentTypeChange = (type: ComponentType) => {
    setSelectedComponent(type);
    const currentTheme = resolvedTheme || 'light';
    setComponentConfig(getDefaultConfig(type, currentTheme));
  };

  return (
    <PageWrapper>
      <Toast ref={toast} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Component Lab
          </h1>
          <p className="text-xl text-muted-foreground">
            Customize and preview PrimeReact components with real-time styling
          </p>
        </div>

        {/* Component Selector */}
        <div className="mb-8">
          <ComponentSelector
            selectedComponent={selectedComponent}
            onComponentChange={handleComponentTypeChange}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 min-h-screen">
          {/* Component Preview */}
          <div className="xl:col-span-2">
            <ComponentPreview componentConfig={componentConfig} onSave={handleSaveComponent} />
          </div>

          {/* Customization Panel */}
          <div className="xl:col-span-1">
            <CustomizationPanel
              componentConfig={componentConfig}
              onStyleChange={handleStyleChange}
              onContentChange={handleContentChange}
            />
          </div>
        </div>

        {/* Saved Components */}
        {savedComponents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Saved Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedComponents.map(component => (
                <div
                  key={component.id}
                  className="bg-card rounded-lg p-4 border border-border hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setComponentConfig(component)}
                >
                  <h3 className="font-semibold mb-2">{component.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(component.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
