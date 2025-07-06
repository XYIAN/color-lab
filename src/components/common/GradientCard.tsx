'use client';

import { useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

interface GradientCardProps {
  gradient: string;
  title?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

export function GradientCard({
  gradient,
  title = 'Gradient',
  onSave,
  isSaved = false,
}: GradientCardProps) {
  const [copied, setCopied] = useState(false);
  const toast = useRef<Toast>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`background: ${gradient};`);
      setCopied(true);
      toast.current?.show({
        severity: 'success',
        summary: 'Copied!',
        detail: 'Gradient CSS copied to clipboard',
        life: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to copy to clipboard',
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="bg-card rounded-lg p-4 shadow-lg border border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex gap-2">
            <Button
              icon={copied ? 'pi pi-check' : 'pi pi-copy'}
              onClick={copyToClipboard}
              className="p-button-sm"
              text
              severity={copied ? 'success' : 'secondary'}
            />
            {onSave && (
              <Button
                icon={isSaved ? 'pi pi-heart-fill' : 'pi pi-heart'}
                onClick={onSave}
                className="p-button-sm"
                text
                severity={isSaved ? 'danger' : 'secondary'}
              />
            )}
          </div>
        </div>
        <div
          className="w-full h-32 rounded-lg mb-3 cursor-pointer transition-transform hover:scale-105"
          style={{ background: gradient }}
          onClick={copyToClipboard}
        />
        <code className="text-sm bg-muted p-2 rounded block overflow-x-auto">{gradient}</code>
      </div>
    </>
  );
}
