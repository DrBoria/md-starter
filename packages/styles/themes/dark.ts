// 1. Assets
const NOISE = 'none';
const KNOT = 'none';

export default {
  theme: 'dark',

  // --- PALETTE (Standard Dark) ---
  section: '#1f232b',       // Dark blue-black, atmospheric
  sectionContent: '#f0f0f0',       // Soft off-white for contrast

  overlay: '#38494e',       // Deep, shadowy overlay
  overlayActive: '#172123',       // Even darker active overlay

  highlighted: '#7d9b99',
  highlightedText: '#222f31',

  disabled: '#5A5A5A',

  labelBackground: '#888888',       // Muted gray for secondary text
  labelText: '#f0f0f0',

  // Statuses
  warning: '#CC3300',
  warningBackground: '#4a4200',    // Deep amber background
  warningText: '#FFCC00',          // Bright amber text

  errorBackground: '#4f1a1a',      // Dark maroon for errors
  errorText: '#FF6666',            // Fiery red for error text

  successBackground: '#1B5E20', // Green 900
  successText: '#69F0AE', // Green A200

  // --- SHARED EFFECTS (Standard) ---
  effects: {
    texture: NOISE,
    glow: {
      soft: '0 0 4px rgba(0,0,0,0.5)',
      medium: '0 0 8px rgba(0,0,0,0.5)',
      strong: '0 0 12px rgba(0,0,0,0.5)',
    },
    depth: {
      engraved: 'inset 0 1px 2px rgba(0,0,0,0.3)',
      floating: '0 4px 6px rgba(0,0,0,0.3)',
      // Compat
      inner: {
        soft: 'inset 0 1px 2px rgba(0,0,0,0.3)',
        medium: 'inset 0 2px 4px rgba(0,0,0,0.3)',
        strong: 'inset 0 4px 8px rgba(0,0,0,0.3)',
      },
      outer: {
        soft: '0 2px 4px rgba(0,0,0,0.3)',
        medium: '0 4px 6px rgba(0,0,0,0.3)',
        strong: '0 8px 12px rgba(0,0,0,0.3)',
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
