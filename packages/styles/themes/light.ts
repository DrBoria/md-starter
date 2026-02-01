// 1. Assets
const NOISE = 'none';
const KNOT = 'none';

export default {
  theme: 'light',

  // --- PALETTE (Standard Light) ---
  section: '#eff1f6',       // Light gray, soft on the eyes
  sectionContent: '#202020',       // Dark gray for main content

  overlay: '#e6e6e6',       // Light overlay
  overlayActive: '#dcdcdc',       // Slightly darker active overlay

  background: '#ffffff',
  text: '#000000',

  highlighted: '#7d9b99',
  highlightedText: '#222f31',

  disabled: '#5A5A5A',

  labelBackground: '#777777',       // Muted gray for labels
  labelText: '#202020',

  // Statuses
  warning: '#CC3300',
  warningBackground: '#FFE69C',    // Pale amber background
  warningText: '#8C6D00',          // Dark amber for text

  errorBackground: '#F3B3B5',      // Light red background
  errorText: '#9C2326',            // Dark red for error text

  successBackground: '#BDE8C2',    // Light green for success background
  successText: '#155724',          // Dark green for text

  // --- SHARED EFFECTS (Standard) ---
  effects: {
    texture: NOISE,
    glow: {
      soft: '0 0 4px rgba(0,0,0,0.1)',
      medium: '0 0 8px rgba(0,0,0,0.1)',
      strong: '0 0 12px rgba(0,0,0,0.1)',
    },
    depth: {
      engraved: 'inset 0 1px 2px rgba(0,0,0,0.1)',
      floating: '0 4px 6px rgba(0,0,0,0.1)',
      // Compat
      inner: {
        soft: 'inset 0 1px 2px rgba(0,0,0,0.1)',
        medium: 'inset 0 1px 2px rgba(0,0,0,0.1)',
        strong: 'inset 0 1px 2px rgba(0,0,0,0.1)',
      },
      outer: {
        soft: '0 4px 6px rgba(0,0,0,0.1)',
        medium: '0 4px 6px rgba(0,0,0,0.1)',
        strong: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
    interaction: {
      hover: 'transform: translateY(-1px);',
      active: 'transform: translateY(0px);',
    }
  },

  // --- GEOMETRY (Standard) ---
  geometry: {
    radius: '6px',
    ragged: 'none',
    cut: 'none',
  },

  assets: {
    knotPattern: KNOT,
  },

  // Legacy
  glassEffect: 'none',
  fontFamily: 'inherit',
  borderRadius: '4px',
};
