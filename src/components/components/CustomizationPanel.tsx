'use client';

import { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import { ComponentConfig, ComponentStyles, ComponentContent } from '@/types';

interface CustomizationPanelProps {
  componentConfig: ComponentConfig;
  onStyleChange: (property: keyof ComponentStyles, value: string | number) => void;
  onContentChange: (
    property: keyof ComponentContent,
    value: string | ComponentConfig['content'][keyof ComponentContent]
  ) => void;
}

const FONT_FAMILIES = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Open Sans', value: 'Open Sans' },
  { label: 'Lato', value: 'Lato' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Montserrat', value: 'Montserrat' },
  { label: 'Source Sans Pro', value: 'Source Sans Pro' },
  { label: 'Ubuntu', value: 'Ubuntu' },
];

const FONT_WEIGHTS = [
  { label: 'Thin (100)', value: '100' },
  { label: 'Light (300)', value: '300' },
  { label: 'Normal (400)', value: '400' },
  { label: 'Medium (500)', value: '500' },
  { label: 'Semi-bold (600)', value: '600' },
  { label: 'Bold (700)', value: '700' },
  { label: 'Extra Bold (800)', value: '800' },
];

const ANIMATIONS = [
  { label: 'None', value: 'none' },
  { label: 'Fade In', value: 'fadeIn 0.5s ease-in' },
  { label: 'Slide Up', value: 'slideUp 0.3s ease-out' },
  { label: 'Scale In', value: 'scaleIn 0.3s ease-out' },
  { label: 'Bounce', value: 'bounce 0.6s ease-in-out' },
];

export function CustomizationPanel({
  componentConfig,
  onStyleChange,
  onContentChange,
}: CustomizationPanelProps) {
  const [activeIndex, setActiveIndex] = useState<number | number[]>(0);

  const { styles, content } = componentConfig;

  return (
    <div className="bg-card rounded-lg p-6 border border-border h-fit sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Customization</h2>

      <Accordion activeIndex={activeIndex} onTabChange={e => setActiveIndex(e.index)}>
        {/* Colors */}
        <AccordionTab header="Colors">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={styles.backgroundColor}
                  onChange={e => onStyleChange('backgroundColor', e.target.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <InputText
                  value={styles.backgroundColor}
                  onChange={e => onStyleChange('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Text Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={styles.textColor}
                  onChange={e => onStyleChange('textColor', e.target.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <InputText
                  value={styles.textColor}
                  onChange={e => onStyleChange('textColor', e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Border Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={styles.borderColor}
                  onChange={e => onStyleChange('borderColor', e.target.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <InputText
                  value={styles.borderColor}
                  onChange={e => onStyleChange('borderColor', e.target.value)}
                  placeholder="#e5e7eb"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={styles.primaryColor}
                  onChange={e => onStyleChange('primaryColor', e.target.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <InputText
                  value={styles.primaryColor}
                  onChange={e => onStyleChange('primaryColor', e.target.value)}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </AccordionTab>

        {/* Typography */}
        <AccordionTab header="Typography">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Font Family</label>
              <Dropdown
                value={styles.fontFamily}
                onChange={e => onStyleChange('fontFamily', e.value)}
                options={FONT_FAMILIES}
                placeholder="Select font family"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Font Size</label>
              <InputText
                value={styles.fontSize}
                onChange={e => onStyleChange('fontSize', e.target.value)}
                placeholder="16px"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Font Weight</label>
              <Dropdown
                value={styles.fontWeight}
                onChange={e => onStyleChange('fontWeight', e.value)}
                options={FONT_WEIGHTS}
                placeholder="Select font weight"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Line Height</label>
              <InputText
                value={styles.lineHeight}
                onChange={e => onStyleChange('lineHeight', e.target.value)}
                placeholder="1.5"
                className="w-full"
              />
            </div>
          </div>
        </AccordionTab>

        {/* Spacing */}
        <AccordionTab header="Spacing">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Padding</label>
              <InputText
                value={styles.padding}
                onChange={e => onStyleChange('padding', e.target.value)}
                placeholder="16px"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Margin</label>
              <InputText
                value={styles.margin}
                onChange={e => onStyleChange('margin', e.target.value)}
                placeholder="0px"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Border Radius</label>
              <InputText
                value={styles.borderRadius}
                onChange={e => onStyleChange('borderRadius', e.target.value)}
                placeholder="8px"
                className="w-full"
              />
            </div>
          </div>
        </AccordionTab>

        {/* Effects */}
        <AccordionTab header="Effects">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Shadow</label>
              <InputText
                value={styles.shadow}
                onChange={e => onStyleChange('shadow', e.target.value)}
                placeholder="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Opacity: {styles.opacity}</label>
              <Slider
                value={styles.opacity}
                onChange={e =>
                  onStyleChange('opacity', Array.isArray(e.value) ? e.value[0] : e.value)
                }
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Blur: {styles.blur}px</label>
              <Slider
                value={styles.blur}
                onChange={e => onStyleChange('blur', Array.isArray(e.value) ? e.value[0] : e.value)}
                min={0}
                max={20}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Animation</label>
              <Dropdown
                value={styles.animation}
                onChange={e => onStyleChange('animation', e.value)}
                options={ANIMATIONS}
                placeholder="Select animation"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Transition</label>
              <InputText
                value={styles.transition}
                onChange={e => onStyleChange('transition', e.target.value)}
                placeholder="all 0.2s ease"
                className="w-full"
              />
            </div>
          </div>
        </AccordionTab>

        {/* Layout */}
        <AccordionTab header="Layout">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Width</label>
              <InputText
                value={styles.width}
                onChange={e => onStyleChange('width', e.target.value)}
                placeholder="100%"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Height</label>
              <InputText
                value={styles.height}
                onChange={e => onStyleChange('height', e.target.value)}
                placeholder="auto"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Width</label>
              <InputText
                value={styles.maxWidth}
                onChange={e => onStyleChange('maxWidth', e.target.value)}
                placeholder="400px"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Height</label>
              <InputText
                value={styles.maxHeight}
                onChange={e => onStyleChange('maxHeight', e.target.value)}
                placeholder="none"
                className="w-full"
              />
            </div>
          </div>
        </AccordionTab>

        {/* Content */}
        <AccordionTab header="Content">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <InputText
                value={content.title}
                onChange={e => onContentChange('title', e.target.value)}
                placeholder="Component title"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <InputText
                value={content.description}
                onChange={e => onContentChange('description', e.target.value)}
                placeholder="Component description"
                className="w-full"
              />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
}
