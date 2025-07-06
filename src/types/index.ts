export interface Gradient {
  id: string;
  name: string;
  colors: string[];
  direction: 'linear' | 'radial';
  angle?: number;
  createdAt: Date;
}

export interface Palette {
  id: string;
  name: string;
  colors: string[];
  createdAt: Date;
}

export interface GlassEffect {
  id: string;
  name: string;
  blur: number;
  opacity: number;
  backgroundColor: string;
  createdAt: Date;
}

export interface SavedItem {
  id: string;
  type: 'gradient' | 'palette' | 'glass';
  data: Gradient | Palette | GlassEffect;
  createdAt: Date;
}

export interface ThemeConfig {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
