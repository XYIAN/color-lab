'use client';

import { useState, useCallback, useEffect } from 'react';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface GlassPreviewProps {
  backgroundColor?: string;
  onChange?: (blur: number, opacity: number) => void;
  onSave?: (blur: number, opacity: number) => void;
}

export function GlassPreview({
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  onChange,
  onSave,
}: GlassPreviewProps) {
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(0.1);
  const [debouncedBlur, setDebouncedBlur] = useState(10);
  const [debouncedOpacity, setDebouncedOpacity] = useState(0.1);

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedBlur(blur);
      setDebouncedOpacity(opacity);
    }, 300);

    return () => clearTimeout(timer);
  }, [blur, opacity]);

  useEffect(() => {
    onChange?.(debouncedBlur, debouncedOpacity);
  }, [debouncedBlur, debouncedOpacity, onChange]);

  const handleBlurChange = (event: { value: number | number[] }) => {
    const newBlur = Array.isArray(event.value) ? event.value[0] : event.value;
    setBlur(newBlur);
  };

  const handleOpacityChange = (event: { value: number | null | undefined }) => {
    const newOpacity = event.value ?? 0.1;
    setOpacity(newOpacity);
  };

  const handleSave = useCallback(() => {
    onSave?.(blur, opacity);
  }, [blur, opacity, onSave]);

  const glassStyle = {
    backdropFilter: `blur(${blur}px)`,
    backgroundColor: backgroundColor.replace(/[\d.]+\)$/, `${opacity})`),
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
      <h3 className="text-xl font-semibold mb-4">Glassmorphism Preview</h3>

      {/* Preview Area */}
      <div className="relative mb-6">
        <div
          className="w-full h-48 rounded-lg bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"
          style={{ backgroundImage: 'url(/bg-3.png)', backgroundSize: 'cover' }}
        />
        <div
          className="absolute inset-4 rounded-lg flex items-center justify-center text-white font-semibold text-lg"
          style={glassStyle}
        >
          Glass Effect
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Blur: {blur}px</label>
          <Slider
            value={blur}
            onChange={handleBlurChange}
            min={0}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Opacity</label>
          <InputNumber
            value={opacity}
            onValueChange={handleOpacityChange}
            min={0}
            max={1}
            step={0.01}
            minFractionDigits={2}
            maxFractionDigits={2}
            className="w-full"
          />
        </div>

        {/* Save Button */}
        {onSave && (
          <Button
            icon="pi pi-heart"
            onClick={handleSave}
            label="Save Glass Effect"
            severity="success"
            className="w-full"
          />
        )}
      </div>

      {/* CSS Output */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">CSS Code</label>
        <code className="text-sm bg-muted p-3 rounded block overflow-x-auto">
          {`backdrop-filter: blur(${blur}px);
background-color: ${backgroundColor.replace(/[\d.]+\)$/, `${opacity})`)};
border: 1px solid rgba(255, 255, 255, 0.2);`}
        </code>
      </div>
    </div>
  );
}
