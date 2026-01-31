import { baseTheme } from './themes';

export { default as ThemeProvider } from './ThemeProviderWrapper';

export {
    light,
    dark,
    viking,
    liquidGlass
} from './themes'

export {
    baseTheme,
    devices,
    getZIndex,
} from './themes';
export type { ZIndexName } from './themes';
// Helpers
export {
    withFullWidth,
    withOffsetBottom,
    withOffsetsRight,
    withSpaceBetween,
} from './helpers';
export type { TFullWidth, TWithBasicElementOffsets, TWithSpaceBetween } from './helpers';

type TTheme = typeof baseTheme;
declare module 'styled-components' {
    export interface DefaultTheme {
        theme: string;

        colors: {
            // --- 1. SEMANTIC PALETTE ---
            section: string;
            sectionContent: string;

            overlay: string;
            overlayActive: string;

            highlighted: string;
            highlightedText: string;

            disabled: string;

            labelBackground: string;
            labelText: string;

            // Statuses
            warning: string;
            warningBackground: string;
            warningText: string;

            errorBackground: string;
            errorText: string;

            successBackground: string;
            successText: string;

            // --- 2. PHYSICS & EFFECTS (SHARED) ---
            effects: {
                texture: string;
                glow: {
                    soft: string;
                    medium: string;
                    strong: string;
                };
                depth: {
                    inner: {
                        soft: string;   // Shallow impression
                        medium: string; // Standard engraved
                        strong: string; // Deep drilled
                    };
                    outer: {
                        soft: string;   // Slight lift
                        medium: string; // Floating
                        strong: string; // Levitating
                    };
                };
                interaction: {
                    hover: string;
                    active: string;
                };
            };

            // --- 3. GEOMETRY (SHARED) ---
            geometry: {
                radius: string;
                ragged: string;
                cut: string;
            };

            // --- 4. ASSETS ---
            assets: {
                knotPattern: string;
            };

            // LEGACY/COMPATIBILITY (Optional)
            glassEffect?: string;
            fontFamily?: string;
            borderRadius?: string;
        };

        // GLOBAL VARIABLES (Layout, sizing, etc - NOT visual theme specific per se, but base system)
        variables: {
            border: {
                size: number;
                radius: number;
            };
            header: {
                height: {
                    mobile: number;
                    tablet: number;
                    desktop: number;
                };
            };
            offsets: {
                section: {
                    mobile: number;
                    tablet: number;
                    desktop: number;
                };
                betweenElements: {
                    mobile: number;
                    tablet: number;
                    desktop: number;
                };
                elementContent: {
                    mobile: number;
                    tablet: number;
                    desktop: number;
                };
            };
        };

        // Existing properties that might be missed
        zIndex: any;
        animation: {
            speed: {
                container: number;
                content: number;
                environment: number;
                pageClosing: number;
            };
        };
        font: {
            size: string;
            family: {
                text: string;
                title: string;
            }
        };
        elements: any;
        // Legacy top-level border props if needed by baseTheme
        border: {
            radius: string;
            size: string;
            circle: string;
        };
        offsets: {
            page: string;
            section: string;
            betweenElements: string;
            elementContent: string;
        };
        screens: {
            mobile: {
                device: string;
                height: number;
                width: number;
            };
            tablet: {
                device: string;
                height: number;
                width: number;
            };
            desktop: {
                device: string;
                height: number;
                width: number;
            };
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends DefaultTheme { }
}
// GlobalStyles
export { GlobalStyles } from './GlobalStyles';
