
import border from './border';
import elements from './elements';
import font from './font';
import offsets from './offsets';
import zIndexes from './zIndexes';

const screens = {
  mobileWidth: 320,
  tabletWidth: 600,
  desktopWidth: 1600,

  mobileHeight: 640,
  tabletHeight: 720,
  desktopHeight: 980,
};

export const devices = {
  mobile: `(min-width: ${screens.mobileWidth}px)`,
  tablet: `(min-width: ${screens.tabletWidth}px)`,
  desktop: `(min-width: ${screens.desktopWidth}px)`,
};

export const getZIndex = (name: keyof typeof zIndexes) => zIndexes[name];

const base = {
  theme: 'base',

  fontFamily: 'sans-serif',
  borderRadius: 0,
  zIndex: zIndexes,
  border: {
    radius: 'var(--border-radius)',
    size: 'var(--border-size)',
    cut: 'none',
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.15)',
    large: '0 8px 16px rgba(0,0,0,0.2)',
  },

  animation: {
    speed: {
      container: 2,
      content: 1,
      environment: 1,
      pageClosing: 1,
    }
  },
  font: {
    family: {
      ...font.family,
      code: 'monospace',
    },
    sizes: {
      small: "0.875rem",
      regular: "1rem",
      large: "1.25rem",
    },
    spacing: '0.1em',
  },

  elements,

  offsets: {
    page: 'var(--page-offset)',
    section: 'var(--offset-section)',
    betweenElements: 'var(--offset-between-elements)',
    elementContent: 'var(--offset-element-content)',
  },

  colors: {
    section: '#fff',
    sectionContent: '#000',
    overlay: 'rgba(0,0,0,0.1)',
    overlayActive: 'rgba(0,0,0,0.2)',
    highlighted: '#00f',
    highlightedText: '#fff',
    disabled: '#ccc',
    disabledText: '#999',

    warningBackground: '#fff',
    warningText: '#000',
    errorBackground: '#fff',
    errorText: '#000',
    successBackground: '#fff',
    successText: '#000',

    labelBackground: '#eee',
    labelText: '#333',
    overlayBackground: 'rgba(0,0,0,0.5)',
  },

  screens: {
    mobile: {
      device: `(min-width: ${screens.mobileWidth}px)`,
      height: screens.mobileHeight,
      width: screens.mobileWidth,
    },
    tablet: {
      device: `(min-width: ${screens.tabletWidth}px)`,
      height: screens.tabletHeight,
      width: screens.tabletWidth,
    },
    desktop: {
      device: `(min-width: ${screens.desktopWidth}px)`,
      height: screens.desktopHeight,
      width: screens.desktopWidth,
    },
  },

  effects: {
    texture: 'none',

    glow: { soft: 'none', medium: 'none', strong: 'none', small: 'none' },
    depth: {
      inner: { soft: 'none', medium: 'none', strong: 'none' },
      outer: { soft: 'none', medium: 'none', strong: 'none' },
    },
    interaction: { hover: 'none', active: 'none' },
  },

  geometry: {
    radius: '0px',
    ragged: 'none',
    cut: 'none',
  },

  variables: {
    border,
    header: {
      height: {
        mobile: 75,
        tablet: 100,
        desktop: 100,
      },
    },

    offsets: {
      ...offsets,
    },
  },
};

export default base;
