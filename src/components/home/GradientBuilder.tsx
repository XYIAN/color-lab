'use client';

import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { generateGradientCSS, generateRandomGradient } from '@/utils/gradientUtils';
import { GRADIENT_DIRECTIONS, DEFAULT_GRADIENT_ANGLES, DEFAULT_COLORS } from '@/constants';
import { Gradient } from '@/types';

interface GradientBuilderProps {
  onSave?: (gradient: Gradient) => void;
}

export function GradientBuilder({ onSave }: GradientBuilderProps) {
  const [colors, setColors] = useState<string[]>(['#FF6B6B', '#4ECDC4']);
  const [direction, setDirection] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(45);
  const [name, setName] = useState('My Gradient');

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, '#FFFFFF']);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const randomizeGradient = () => {
    setColors(generateRandomGradient());
    setName(`Gradient ${Math.floor(Math.random() * 1000)}`);
  };

  const handleSave = () => {
    if (onSave) {
      const gradient: Gradient = {
        id: Date.now().toString(),
        name,
        colors,
        direction,
        angle: direction === 'linear' ? angle : undefined,
        createdAt: new Date(),
      };
      onSave(gradient);
    }
  };

  const gradientCSS = generateGradientCSS(colors, direction, angle);

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gradient Builder</h2>
        <Button
          icon="pi pi-refresh"
          onClick={randomizeGradient}
          label="Random"
          severity="secondary"
          text
        />
      </div>

      {/* Gradient Preview */}
      <div className="mb-6">
        <div
          className="w-full h-32 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          style={{ background: gradientCSS }}
        />
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Gradient Name</label>
          <InputText
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter gradient name"
            className="w-full"
          />
        </div>

        {/* Direction Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Direction</label>
          <Dropdown
            value={direction}
            onChange={e => setDirection(e.value)}
            options={GRADIENT_DIRECTIONS}
            optionLabel="label"
            optionValue="value"
            placeholder="Select direction"
            className="w-full"
          />
        </div>

        {/* Angle Control (Linear only) */}
        {direction === 'linear' && (
          <div>
            <label className="block text-sm font-medium mb-2">Angle: {angle}°</label>
            <Slider
              value={angle}
              onChange={e => setAngle(Array.isArray(e.value) ? e.value[0] : e.value)}
              min={0}
              max={360}
              step={1}
              className="w-full"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {DEFAULT_GRADIENT_ANGLES.map(angleOption => (
                <Button
                  key={angleOption.value}
                  label={angleOption.label}
                  onClick={() => setAngle(angleOption.value)}
                  severity={angle === angleOption.value ? 'info' : 'secondary'}
                  text
                  size="small"
                />
              ))}
            </div>
          </div>
        )}

        {/* Color Controls */}
        <div>
          <label className="block text-sm font-medium mb-2">Colors ({colors.length}/5)</label>
          <div className="space-y-3">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={e => updateColor(index, e.target.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <InputText
                  value={color}
                  onChange={e => updateColor(index, e.target.value)}
                  className="flex-1"
                  placeholder="#FFFFFF"
                />
                {colors.length > 2 && (
                  <Button
                    icon="pi pi-trash"
                    onClick={() => removeColor(index)}
                    severity="danger"
                    text
                    size="small"
                  />
                )}
              </div>
            ))}
            {colors.length < 5 && (
              <Button
                icon="pi pi-plus"
                onClick={addColor}
                label="Add Color"
                severity="success"
                text
              />
            )}
          </div>
        </div>

        {/* Quick Color Palette */}
        <div>
          <label className="block text-sm font-medium mb-2">Quick Colors</label>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_COLORS.map(color => (
              <button
                key={color}
                onClick={() => {
                  addColor();
                  updateColor(colors.length, color);
                }}
                className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Save Button */}
        {onSave && (
          <Button
            icon="pi pi-heart"
            onClick={handleSave}
            label="Save Gradient"
            severity="success"
            className="w-full"
          />
        )}
      </div>

      {/* CSS Output */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">CSS Code</label>
        <code className="text-sm bg-muted p-3 rounded block overflow-x-auto">
          background: {gradientCSS};
        </code>
      </div>
    </div>
  );
}
