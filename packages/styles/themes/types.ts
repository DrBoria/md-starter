export interface ThemeInterface {
    theme: string;

    fontFamily: string;
    borderRadius: number | string;
    zIndex: Record<string, number>;
    border: {
        radius: string | number;
        size: string | number;
        cut: string;
    };
    shadows: {
        small: string;
        medium: string;
        large: string;
    };

    colors: {
        section: string;
        sectionContent: string;
        overlay: string;
        overlayActive: string;
        highlighted: string;
        highlightedText: string;
        disabled: string;
        disabledText: string;

        warningBackground: string;
        warningText: string;
        errorBackground: string;
        errorText: string;
        successBackground: string;
        successText: string;

        labelBackground: string;
        labelText: string;
        overlayBackground: string;
    };

    effects: {
        texture: string;
        glow: {
            soft: string;
            medium: string;
            strong: string;
            small: string;
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
    };

    font: {
        family: {
            text: string;
            title: string;
            code: string;
        };
        sizes: {
            small: string;
            regular: string;
            large: string;
        };
        spacing: string;
    };

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
            minWidth: string;
        };
        icons: {
            height: string;
            width: string;
            radius: string;
        };
        modal: {
            width: string;
            height: string;
        };
        sidebar: {
            width: string;
        };
    };
}
