
import type { ThemeInterface } from './types';
import baseTheme from './baseTheme';

const liquidGlass: ThemeInterface = {
  theme: 'liquidGlass',

  fontFamily: '"Inter", sans-serif',
  borderRadius: 12,
  zIndex: {
    content: 1,
    alert: 100,
    animatedElements: 10,
  },
  border: {
    radius: 12,
    size: 1,
    cut: 'none',
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.15)',
    large: '0 8px 16px rgba(0,0,0,0.2)',
  },

  colors: {
    section: 'rgb(255 255 255 / 20%)',
    sectionContent: '#1f2937',
    overlay: 'rgba(0, 0, 0, 0.05)',
    overlayActive: 'rgba(0, 0, 0, 0.1)',
    highlighted: '#3b82f6',
    highlightedText: '#ffffff',
    disabled: '#9ca3af',
    disabledText: '#6b7280',

    warningBackground: '#fffbeb',
    warningText: '#92400e',
    errorBackground: '#fef2f2',
    errorText: '#b91c1c',
    successBackground: '#ecfdf5',
    successText: '#065f46',

    labelBackground: '#f3f4f6',
    labelText: '#374151',
    overlayBackground: 'rgba(0, 0, 0, 0.5)',
  },

  effects: {
    texture: 'blur(10px)',
    glow: {
      soft: '0 0 10px rgba(59, 130, 246, 0.2)',
      medium: '0 0 20px rgba(59, 130, 246, 0.4)',
      strong: '0 0 30px rgba(59, 130, 246, 0.6)',
      small: '0 0 5px rgba(59, 130, 246, 0.15)',
    },
    depth: {
      inner: {
        soft: 'inset 0 1px 1px rgba(0,0,0,0.1), inset 0 -1px 1px rgba(255,255,255,0.8)',
        medium: 'inset 0 2px 2px rgba(0,0,0,0.1), inset 0 -2px 2px rgba(255,255,255,0.8)',
        strong: 'inset 0 4px 4px rgba(0,0,0,0.1), inset 0 -4px 4px rgba(255,255,255,0.8)',
      },
      outer: {
        soft: '0 4px 16px 0 rgba(31, 38, 135, 0.1)',
        medium: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        strong: '0 12px 48px 0 rgba(31, 38, 135, 0.2)',
      },
    },
    interaction: {
      hover: `
    transform: translateY(-2px);
    filter: brightness(1.05);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  `,
      active: `
    transform: translateY(1px);
    filter: brightness(0.95);
    box-shadow: 0 2px 10px -5px rgba(0,0,0,0.1);
  `
    }
  },

  geometry: {
    radius: '12px',
    ragged: 'none',
    cut: 'none',
  },

  font: {
    family: {
      text: '"Inter", sans-serif',
      title: '"Inter", sans-serif',
      code: 'monospace',
    },
    sizes: baseTheme.font.sizes,
    spacing: 'normal',
  },

  variables: baseTheme.variables,
  screens: baseTheme.screens,
  offsets: baseTheme.offsets,
  elements: baseTheme.elements,
};



export default liquidGlass;
