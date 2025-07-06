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
  type: 'gradient' | 'palette' | 'glass' | 'component';
  data: Gradient | Palette | GlassEffect | ComponentConfig;
  createdAt: Date;
}

export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };
  spacing: {
    padding: string;
    margin: string;
    borderRadius: string;
  };
  effects: {
    shadow: string;
    blur: string;
  };
}

export type ThemeMode = 'light' | 'dark' | 'system';

// Component Customization Types
export interface ComponentConfig {
  id: string;
  name: string;
  type: ComponentType;
  styles: ComponentStyles;
  content: ComponentContent;
  createdAt: Date;
}

export type ComponentType =
  | 'card'
  | 'carousel'
  | 'accordion'
  | 'panel'
  | 'fieldset'
  | 'tabview'
  | 'datatable'
  | 'chart'
  | 'button'
  | 'input'
  | 'dropdown'
  | 'slider';

export interface ComponentStyles {
  // Colors
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  primaryColor?: string;
  secondaryColor?: string;

  // Typography
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;

  // Spacing
  padding?: string;
  margin?: string;
  borderRadius?: string;

  // Effects
  shadow?: string;
  opacity?: number;
  blur?: number;

  // Animation
  animation?: string;
  transition?: string;

  // Layout
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export interface ComponentContent {
  title?: string;
  description?: string;
  items?: ComponentItem[];
  links?: SocialLink[];
  data?: Record<string, unknown>[];
}

export interface ComponentItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
  image?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
}

// Customization Panel Types
export interface CustomizationPanel {
  id: string;
  title: string;
  type: 'colors' | 'typography' | 'spacing' | 'effects' | 'layout' | 'content';
  controls: CustomizationControl[];
}

export interface CustomizationControl {
  id: string;
  type: 'color' | 'slider' | 'input' | 'dropdown' | 'toggle' | 'textarea';
  label: string;
  value: string | number | boolean;
  options?: Array<{ label: string; value: string | number }>;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}
