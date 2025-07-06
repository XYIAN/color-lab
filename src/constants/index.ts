export const APP_NAME = 'Color Lab';
export const APP_DESCRIPTION =
  'Create, save, and explore stunning gradients, palettes, and glassmorphic themes';

export const DEFAULT_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
  '#F1948A',
  '#82E0AA',
  '#F8C471',
  '#E74C3C',
  '#3498DB',
];

export const GRADIENT_DIRECTIONS = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
];

export const DEFAULT_GRADIENT_ANGLES = [
  { value: 0, label: '0°' },
  { value: 45, label: '45°' },
  { value: 90, label: '90°' },
  { value: 135, label: '135°' },
  { value: 180, label: '180°' },
  { value: 225, label: '225°' },
  { value: 270, label: '270°' },
  { value: 315, label: '315°' },
];

export const STORAGE_KEYS = {
  SAVED_GRADIENTS: 'color-lab-saved-gradients',
  SAVED_PALETTES: 'color-lab-saved-palettes',
  SAVED_GLASS: 'color-lab-saved-glass',
  SAVED_COMPONENTS: 'color-lab-saved-components',
  THEME_PREFERENCE: 'color-lab-theme',
} as const;

export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/yourusername',
  LINKEDIN: 'https://linkedin.com/in/yourusername',
  WEBSITE: 'https://yourwebsite.com',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
