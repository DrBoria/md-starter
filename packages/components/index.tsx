export * from './default/forms/Button';
export * from './default/forms/Form';
export * from './default/navigation/Pagination';
export * from './default/layout/Separator';
export * from './default/data-display/Tooltip';
export * from './default/common/Logo';
export * from './default/navigation/Tabs';
export * from './default/data-display/Carousel';
export * from './default/data-display/Card';
export * from './default/feedback/Loading';
export * from './default/navigation/Header';
export * from './default/data-display/StatusLabel';
export * from './default/data-display/ProgressBar';
export * from './default/feedback/Validation';
export * from './default/feedback/Toasts';
export * from './default/overlays/Modals';
export * from './default/layout/Containers';
export * from './default/data-display/Typography';
export * from './default/forms/TokenInputField';
export * from './default/forms/Switch';
export * from './default/forms/Toggle';
export * from './default/data-display/Images';
export * from './default/navigation/Link';

export * from './default/common/Icons';

import 'styled-components';
import type { baseTheme } from '@md/styles/themes';

type TTheme = typeof baseTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {
    theme?: string;

    // Explicitly typed effects structure matching themes
    effects: {
      texture: string;
      cracks?: string;
      glow: {
        soft: string;
        medium: string;
        strong: string;
        [key: string]: string | undefined;
      };
      depth: {
        inner: {
          soft: string;
          medium: string;
          strong: string;
          [key: string]: string | undefined;
        };
        outer: {
          soft: string;
          medium: string;
          strong: string;
          [key: string]: string | undefined;
        };
      };
      interaction: {
        hover: string;
        active: string;
        [key: string]: string | undefined;
      };
      [key: string]: unknown;
    };

    // Explicitly typed geometry
    geometry: {
      radius: string;
      ragged: string;
      cut: string;
      [key: string]: unknown;
    };

    fontFamily?: string;
    shadows?: Record<string, string>;
    borderRadius?: string;
    labelBackground?: string;
    labelText?: string;

    // Core Layout Colors - Required for back-compat
    surface?: string;
    section?: string;
    sectionContent?: string;
    overlay?: string;
    overlayActive?: string;
    background?: string;
    text?: string;
    highlighted?: string;
    highlightedText?: string;
    disabled?: string;
    successBackground?: string;
    successText?: string;
    error?: string;
    errorText?: string;

    // Screens - Assume required if baseTheme provides them
    screens: {
      mobile: { height: string; width: number; device: string };
      tablet: { height: string; width: number; device: string };
      desktop: { height: string; width: number; device: string };
    };
    elements: {
      header: { height: string };
      form: { height: string };
      icons: { height: string; width: string; radius: string };
    };
    offsets: {
      section: string;
      elementContent: string;
      betweenElements: string;
      // potentially recursived
      [key: string]: unknown;
    };
    border: {
      size: number;
      radius: number;
    };
    font: {
      family?: { text: string; title: string };
      sizes: { small: string; regular: string; large: string };
    };
    colors: Record<string, string>;

    // Explicitly define variables to match usage - REQUIRED
    variables: {
      offsets: {
        section: Record<string, number>;
        betweenElements: Record<string, number>;
        elementContent: Record<string, number>;
        [key: string]: unknown;
      };
      border: {
        radius: number | string;
        size: number | string;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
  }
}
