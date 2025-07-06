export function generateGradientCSS(
  colors: string[],
  direction: 'linear' | 'radial',
  angle?: number
): string {
  if (colors.length === 0) return '';
  if (colors.length === 1) return colors[0];

  if (direction === 'linear') {
    const gradientAngle = angle || 45;
    return `linear-gradient(${gradientAngle}deg, ${colors.join(', ')})`;
  } else {
    return `radial-gradient(circle, ${colors.join(', ')})`;
  }
}

export function hexToRgba(hex: string, alpha: number = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function rgbaToHex(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return '#000000';

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;
}

export function generateRandomGradient(): string[] {
  const colors = [
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
  ];

  const shuffled = colors.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2 + Math.floor(Math.random() * 3));
}

export function validateColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
  const rgbaRegex = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/;

  return hexRegex.test(color) || rgbRegex.test(color) || rgbaRegex.test(color);
}
