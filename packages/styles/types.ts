
import 'styled-components';

export interface ThemeInterface {
    theme: string;

    // Semantic Colors
    colors: {
        section: string;
        sectionContent: string;
        overlay: string;
        overlayActive: string;
        highlighted: string;
        highlightedText: string;
        disabled: string;

        // Status
        warningBackground: string;
        warningText: string;
        errorBackground: string;
        errorText: string;
        successBackground: string;
        successText: string;

        // Base override placeholders (optional in specific themes)
        labelBackground?: string;
        labelText?: string;
    };

    // Semantic Effects
    effects: {
        texture: string;
        glow: {
            soft: string;
            medium: string;
            strong: string;
        };
        depth: {
            inner: {
                soft: string;
                medium: string;
                strong: string;
            };
            outer: {
                soft: string;
                medium: string;
                strong: string;
            };
        };
        interaction: {
            hover: string;
            active: string;
        };
    };

    geometry: {
        radius: string;
        ragged: string;
        cut: string;
    },

    // Legacy/Compat top-level props (to be deprecated or mapped)
    font: {
        family: {
            text: string;
            title: string;
        };
        sizes: {
            small: string;
            regular: string;
            large: string;
        }
    };

    // System properties provided by baseTheme
    variables: {
        border: {
            radius: number;
            size: number;
            cut: string;
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
    screens: {
        mobile: { device: string; height: number; width: number };
        tablet: { device: string; height: number; width: number };
        desktop: { device: string; height: number; width: number };
    };
    offsets: {
        page: string;
        section: string;
        betweenElements: string;
        elementContent: string;
    };
    elements: {
        header: {
            height: string;
        };
        form: {
            height: string;
        };
        icons: {
            height: string;
            width: string;
            radius: string;
        };
    };
}

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeInterface { }
}
