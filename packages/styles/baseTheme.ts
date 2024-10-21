import { light } from './themes';

const font = {
  sizeMin: 12,
  sizeMax: 16,
};

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

export type ZIndexName = 'background' | 'animatedElements' | 'content' | 'alert';
const zIndexes: Record<ZIndexName, number> = {
  background: -10,
  animatedElements: -1,
  content: 0,
  alert: 10000,
};

export const getZIndex = (name: ZIndexName) => zIndexes[name];

const basicOffset = 8;
const base = {
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
    // font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));
    size: `calc(
      ${font.sizeMin}px + ${font.sizeMax - font.sizeMin} *
        ((100vw - ${screens.mobileWidth}px) / ${screens.desktopWidth - screens.mobileWidth})
    )`,
    family: {
      text: '"Comic Sans MS", "Comic Sans"',
      title: '"Roboto", Arial',
    },
  },

  elements: {
    header: {
      height: 'var(--height-header)',
    },
    form: {
      height: '50px',
    },
    icons: {
      height: '20px',
      width: '20px',
      radius: '10px',
    },
  },

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
    batweenElements: 'var(--offset-between-elements)',
    // Padding inside elements - between element content and border of elements
    elementContent: 'var(--offset-element-content)',
  },

  colors: {
    ...light,
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

  /* ******************************************************* */
  /* ******************** Variables ************************ */
  /* ***************** Do not use in app ******************* */
  /* ******************************************************* */

  variables: {
    border: {
      size: 1,
      radius: basicOffset * 2,
    },

    header: {
      height: {
        mobile: 75,
        tablet: 100,
        desktop: 150,
      },
    },
    offsets: {
      section: {
        mobile: basicOffset * 3,
        tablet: basicOffset * 6,
        desktop: basicOffset * 12,
      },
      betweenElements: {
        mobile: basicOffset,
        tablet: basicOffset,
        desktop: basicOffset * 2,
      },
      elementContent: {
        mobile: basicOffset,
        tablet: basicOffset * 2,
        desktop: basicOffset * 2,
      },
    },
  },
};

type TTheme = typeof base;

// Fix for typescript basic theme apply
declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {}
}

export default base;
