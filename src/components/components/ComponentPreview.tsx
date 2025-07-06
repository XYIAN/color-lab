'use client';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import { ComponentConfig } from '@/types';

interface ComponentPreviewProps {
  componentConfig: ComponentConfig;
  onSave?: () => void;
}

export function ComponentPreview({ componentConfig, onSave }: ComponentPreviewProps) {
  const { type, styles, content } = componentConfig;

  const componentStyle = {
    backgroundColor: styles.backgroundColor,
    color: styles.textColor,
    borderColor: styles.borderColor,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
    fontFamily: styles.fontFamily,
    lineHeight: styles.lineHeight,
    padding: styles.padding,
    margin: styles.margin,
    borderRadius: styles.borderRadius,
    boxShadow: styles.shadow,
    opacity: styles.opacity,
    backdropFilter: styles.blur ? `blur(${styles.blur}px)` : undefined,
    animation: styles.animation !== 'none' ? styles.animation : undefined,
    transition: styles.transition,
    width: styles.width,
    height: styles.height,
    maxWidth: styles.maxWidth,
    maxHeight: styles.maxHeight,
  };

  const renderComponent = () => {
    switch (type) {
      case 'card':
        return (
          <Card title={content.title} className="w-full" style={componentStyle}>
            <p className="m-0">{content.description}</p>
            {content.items && (
              <div className="mt-4 space-y-2">
                {content.items.map(item => (
                  <div key={item.id} className="flex items-center gap-2">
                    <i className={item.icon} />
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-sm text-muted-foreground">{item.content}</span>
                  </div>
                ))}
              </div>
            )}
            {content.links && (
              <div className="mt-4 flex gap-2">
                {content.links.map(link => (
                  <Button
                    key={link.id}
                    icon={link.icon}
                    severity="secondary"
                    text
                    style={{ color: link.color }}
                  />
                ))}
              </div>
            )}
          </Card>
        );

      case 'carousel':
        const carouselItems = content.items || [
          { id: '1', title: 'Slide 1', content: 'First slide content', image: '/bg-1.png' },
          { id: '2', title: 'Slide 2', content: 'Second slide content', image: '/bg-2.png' },
          { id: '3', title: 'Slide 3', content: 'Third slide content', image: '/bg-3.png' },
        ];

        const carouselTemplate = (item: (typeof carouselItems)[0]) => (
          <div className="p-4 text-center" style={componentStyle}>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p>{item.content}</p>
          </div>
        );

        return (
          <Carousel
            value={carouselItems}
            numVisible={1}
            numScroll={1}
            className="w-full"
            itemTemplate={carouselTemplate}
          />
        );

      case 'accordion':
        const accordionItems = content.items || [
          { id: '1', title: 'Section 1', content: 'Content for section 1' },
          { id: '2', title: 'Section 2', content: 'Content for section 2' },
          { id: '3', title: 'Section 3', content: 'Content for section 3' },
        ];

        return (
          <Accordion className="w-full">
            {accordionItems.map(item => (
              <AccordionTab key={item.id} header={item.title} style={componentStyle}>
                <p>{item.content}</p>
              </AccordionTab>
            ))}
          </Accordion>
        );

      case 'panel':
        return (
          <Panel header={content.title} className="w-full" style={componentStyle}>
            <p>{content.description}</p>
          </Panel>
        );

      case 'fieldset':
        return (
          <Fieldset legend={content.title} className="w-full" style={componentStyle}>
            <p>{content.description}</p>
          </Fieldset>
        );

      case 'tabview':
        const tabItems = content.items || [
          { id: '1', title: 'Tab 1', content: 'Content for tab 1' },
          { id: '2', title: 'Tab 2', content: 'Content for tab 2' },
          { id: '3', title: 'Tab 3', content: 'Content for tab 3' },
        ];

        return (
          <TabView className="w-full">
            {tabItems.map(item => (
              <TabPanel key={item.id} header={item.title} style={componentStyle}>
                <p>{item.content}</p>
              </TabPanel>
            ))}
          </TabView>
        );

      case 'datatable':
        const tableData = content.data || [
          { id: 1, name: 'Item 1', value: 100 },
          { id: 2, name: 'Item 2', value: 200 },
          { id: 3, name: 'Item 3', value: 300 },
        ];

        return (
          <DataTable value={tableData} className="w-full" style={componentStyle}>
            <Column field="id" header="ID" />
            <Column field="name" header="Name" />
            <Column field="value" header="Value" />
          </DataTable>
        );

      case 'button':
        return (
          <Button
            label={content.title || 'Custom Button'}
            icon="pi pi-check"
            className="w-full"
            style={componentStyle}
          />
        );

      case 'input':
        return (
          <InputText
            placeholder={content.description || 'Enter text...'}
            className="w-full"
            style={componentStyle}
          />
        );

      case 'dropdown':
        const dropdownOptions = [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ];

        return (
          <Dropdown
            options={dropdownOptions}
            placeholder={content.description || 'Select an option'}
            className="w-full"
            style={componentStyle}
          />
        );

      case 'slider':
        return (
          <div className="w-full" style={componentStyle}>
            <Slider min={0} max={100} step={1} className="w-full" />
          </div>
        );

      default:
        return (
          <div className="p-4 text-center" style={componentStyle}>
            <p>Component type &quot;{type}&quot; not implemented yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Component Preview</h2>
        {onSave && (
          <Button icon="pi pi-heart" onClick={onSave} label="Save Component" severity="success" />
        )}
      </div>

      <div className="border border-border rounded-lg p-4 bg-background">{renderComponent()}</div>

      {/* CSS Output */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">CSS Styles</label>
        <code className="text-sm bg-muted p-3 rounded block overflow-x-auto">
          {Object.entries(componentStyle)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
            .join('\n')}
        </code>
      </div>
    </div>
  );
}
