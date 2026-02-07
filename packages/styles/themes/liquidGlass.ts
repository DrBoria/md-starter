import { css } from 'styled-components';

// The mixin (keep generic export for direct usage)
export const liquidGlassMixin = css`
  backdrop-filter: blur(10px);
    background: rgb(255 255 255 / 20%);
    box-shadow: 0 4px 30px rgb(0 0 0 / 10%);
`;

// The Theme Object (for Styleguide/ThemeProvider)
export default {
  theme: 'liquidGlass',

  // --- PALETTE (Light Glass) ---
  section: 'linear-gradient(135deg, #ffffff 0%, #f0f2f5 100%)',
  sectionContent: '#1f2937', // Dark gray text

  overlay: 'rgba(0, 0, 0, 0.05)',
  overlayActive: 'rgba(0, 0, 0, 0.1)',

  highlighted: '#3b82f6',    // Blue
  highlightedText: '#ffffff',

  disabled: '#9ca3af',       // Gray

  // Statuses
  warning: '#f59e0b',
  warningBackground: '#fffbeb',
  warningText: '#92400e',
  error: '#ef4444',
  errorBackground: '#fef2f2',
  errorText: '#b91c1c',
  success: '#10b981',
  successBackground: '#ecfdf5',
  successText: '#065f46',

  // --- PHYSICS & EFFECTS (Glassy) ---
  effects: {
    texture: 'none',
    glow: {
      soft: '0 0 10px rgba(59, 130, 246, 0.2)',
      medium: '0 0 20px rgba(59, 130, 246, 0.4)',
      strong: '0 0 30px rgba(59, 130, 246, 0.6)',
    },
    depth: {
      engraved: 'inset 0 1px 1px rgba(0,0,0,0.1), inset 0 -1px 1px rgba(255,255,255,0.8)',
      floating: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
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

  // Special properties
  glassEffect: 'blur(10px)',

  geometry: {
    radius: '12px',
    ragged: 'none',
    cut: 'none',
  },

  assets: {
    knotPattern: 'none',
  },

  // Legacy/Compat
  borderRadius: '12px',
  font: {
    size: '16px',
    family: {
      text: '"Inter", sans-serif',
      title: '"Inter", sans-serif'
    }
  },
  fontFamily: '"Inter", sans-serif',
  labelBackground: '#f3f4f6',
  labelText: '#374151',
};
