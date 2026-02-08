
import border from './border';
import elements from './elements';
import font from './font';
import offsets from './offsets';
import zIndexes from './zIndexes';

const screens = {
  // Width
  mobileWidth: 320,
  tabletWidth: 600,
  desktopWidth: 1600,

  // Height
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
  zIndex: zIndexes,
  animation: {
    speed: {
      container: 2,
      content: 1,
      environment: 1,
      pageClosing: 1,
    }
  },
  font: {
    family: font.family,
    sizes: {
      small: "0.875rem",
      regular: "1rem",
      large: "1.25rem",
    },
  },

  elements,

  border: {
    radius: 'var(--border-radius)',
    size: 'var(--border-size)',
    circle: '50%',
  },

  // Offsets - from the biggest to smallest
  offsets: {
    // Padding in page - from the borders of the page and to content
    page: 'var(--page-offset)',
    // Padding inside section (between border of the section and content) and between sections
    section: 'var(--offset-section)',
    // Padding between elements inside section
    betweenElements: 'var(--offset-between-elements)',
    // Padding inside elements - between element content and border of elements
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
    warningBackground: '#fff',
    warningText: '#000',
    errorBackground: '#fff',
    errorText: '#000',
    successBackground: '#fff',
    successText: '#000',
    // Fallbacks
    labelBackground: '#eee',
    labelText: '#333',
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
    glow: { soft: 'none', medium: 'none', strong: 'none' },
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

  // Legacy/Compat

  /* ******************************************************* */
  /* ******************** Variables ************************ */
  /* ***************** Do not use in app ******************* */
  /* ******************************************************* */

  variables: {
    border,
    header: {
      height: {
        mobile: 75,
        tablet: 100,
        desktop: 100,
      },
    },
    offsets,
  },
};

export default base;
