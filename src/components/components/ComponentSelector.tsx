'use client';

import { Button } from 'primereact/button';
import { ComponentType } from '@/types';

interface ComponentSelectorProps {
  selectedComponent: ComponentType;
  onComponentChange: (type: ComponentType) => void;
}

const COMPONENT_OPTIONS: Array<{
  type: ComponentType;
  label: string;
  icon: string;
  description: string;
}> = [
  {
    type: 'card',
    label: 'Card',
    icon: 'pi pi-id-card',
    description: 'Display content in a card layout',
  },
  {
    type: 'carousel',
    label: 'Carousel',
    icon: 'pi pi-images',
    description: 'Rotating content slides',
  },
  {
    type: 'accordion',
    label: 'Accordion',
    icon: 'pi pi-list',
    description: 'Collapsible content sections',
  },
  {
    type: 'panel',
    label: 'Panel',
    icon: 'pi pi-window-maximize',
    description: 'Content container with header',
  },
  {
    type: 'fieldset',
    label: 'Fieldset',
    icon: 'pi pi-tag',
    description: 'Grouped form elements',
  },
  {
    type: 'tabview',
    label: 'Tab View',
    icon: 'pi pi-folder',
    description: 'Tabbed content interface',
  },
  {
    type: 'datatable',
    label: 'Data Table',
    icon: 'pi pi-table',
    description: 'Sortable data grid',
  },
  {
    type: 'chart',
    label: 'Chart',
    icon: 'pi pi-chart-bar',
    description: 'Data visualization',
  },
  {
    type: 'button',
    label: 'Button',
    icon: 'pi pi-play',
    description: 'Interactive button element',
  },
  {
    type: 'input',
    label: 'Input',
    icon: 'pi pi-pencil',
    description: 'Text input field',
  },
  {
    type: 'dropdown',
    label: 'Dropdown',
    icon: 'pi pi-chevron-down',
    description: 'Select from options',
  },
  {
    type: 'slider',
    label: 'Slider',
    icon: 'pi pi-sliders-h',
    description: 'Range input control',
  },
];

export function ComponentSelector({
  selectedComponent,
  onComponentChange,
}: ComponentSelectorProps) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-semibold mb-4">Select Component</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {COMPONENT_OPTIONS.map(option => (
          <Button
            key={option.type}
            icon={option.icon}
            label={option.label}
            onClick={() => onComponentChange(option.type)}
            severity={selectedComponent === option.type ? 'info' : 'secondary'}
            text
            className="h-auto p-3 flex flex-col items-center gap-2"
            title={option.description}
          />
        ))}
      </div>
    </div>
  );
}
