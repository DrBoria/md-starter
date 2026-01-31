import { css } from 'styled-components';
import light from './light';

// The mixin (keep generic export for direct usage)
export const liquidGlassMixin = css`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// The Theme Object (for Styleguide/ThemeProvider)
export default {
  ...light,
  theme: 'liquidGlass',

  // Override colors for glass look
  section: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  sectionContent: '#ffffff',

  overlay: 'rgba(255, 255, 255, 0.15)',
  overlayActive: 'rgba(255, 255, 255, 0.25)',

  // --- PHYSICS & EFFECTS (Glassy) ---
  effects: {
    ...light.effects,
    texture: 'none',
    glow: {
      soft: '0 0 10px rgba(255,255,255,0.2)',
      medium: '0 0 20px rgba(255,255,255,0.4)',
      strong: '0 0 30px rgba(255,255,255,0.6)',
    },
    depth: {
      engraved: 'inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.1)',
      floating: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      inner: {
        soft: 'inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.1)',
        medium: 'inset 0 2px 2px rgba(255,255,255,0.2), inset 0 -2px 2px rgba(0,0,0,0.1)',
        strong: 'inset 0 4px 4px rgba(255,255,255,0.2), inset 0 -4px 4px rgba(0,0,0,0.1)',
      },
      outer: {
        soft: '0 4px 16px 0 rgba(31, 38, 135, 0.37)',
        medium: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        strong: '0 12px 48px 0 rgba(31, 38, 135, 0.37)',
      },
    },
    // Keep interaction from light if needed, or override
    interaction: light.effects.interaction
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

  // Legacy
  borderRadius: '12px',
};
