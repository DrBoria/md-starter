import type { ThemeInterface } from './types';
import baseTheme from './baseTheme';

const viking: ThemeInterface = {
    theme: 'viking',

    fontFamily: '"Cinzel", serif',
    borderRadius: 0,
    zIndex: {
        content: 1,
        alert: 100,
        animatedElements: 10,
    },
    border: {
        radius: 0,
        size: 1,
        cut: '10px',
    },
    shadows: {
        small: '0 2px 4px rgba(0,0,0,0.3)',
        medium: '0 4px 8px rgba(0,0,0,0.4)',
        large: '0 8px 16px rgba(0,0,0,0.5)',
    },

    colors: {
        section: '#182022',
        sectionContent: '#ecf0f1',
        overlay: '#0b0e0f',
        overlayActive: '#1c2629',
        highlighted: '#30d5c8',
        highlightedText: '#081a18',
        disabled: '#374b4e',

        surface: '#182022',
        text: '#ecf0f1',
        background: '#0b0e0f',
        highlight: '#30d5c8',

        warningBackground: '#3e2723',
        warningText: '#ffccbc',
        errorBackground: '#3b1010',
        errorText: '#ffb3b3',
        successBackground: '#0a2e18',
        successText: '#a3e4b3',

        labelBackground: '#2c3e50',
        labelText: '#bdc3c7',

        success: '#a3e4b3',
        error: '#ffb3b3',
        warning: '#ffccbc',
        info: '#30d5c8',
    },

    effects: {
        texture: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        cracks: 'none',
        glow: {
            soft: '0 0 10px rgba(48, 213, 200, 0.2)',
            medium: '0 0 15px rgba(48, 213, 200, 0.5), 0 0 30px rgba(48, 213, 200, 0.2)',
            strong: '0 0 20px rgba(48, 213, 200, 0.8), 0 0 40px rgba(0, 255, 127, 0.4)',
            small: '0 0 5px rgba(48, 213, 200, 0.15)',
        },
        depth: {
            inner: {
                soft: 'inset 1px 1px 2px rgba(0,0,0,0.6), inset -0.5px -0.5px 1px rgba(255,255,255,0.05)',
                medium: 'inset 2px 2px 8px rgba(0,0,0,0.85), inset -1px -1px 2px rgba(255,255,255,0.08)',
                strong: 'inset 4px 4px 12px rgba(0,0,0,0.95), inset -1px -1px 2px rgba(255,255,255,0.05)',
            },
            outer: {
                soft: '0 5px 15px rgba(0,0,0,0.6)',
                medium: '0 15px 35px rgba(0,0,0,0.8), 0 0 0 1px rgba(48, 213, 200, 0.1)',
                strong: '0 25px 50px rgba(0,0,0,1.0), 0 0 0 1px rgba(48, 213, 200, 0.2)',
            },
        },
        interaction: {
            hover: `
        transform: translateY(-2px);
        filter: brightness(1.15);
        box-shadow: 0 10px 20px -5px rgba(48, 213, 200, 0.2);
      `,
            active: `
        transform: translateY(1px);
        filter: brightness(0.9);
        box-shadow: 0 2px 10px -5px rgba(0,0,0,0.6);
      `
        },
    },

    geometry: {
        radius: '0px',
        ragged: 'polygon(0% 1.5%, 25% 0%, 55% 2%, 80% 0.5%, 100% 1.5%, 100% 98.5%, 85% 100%, 50% 98%, 20% 100%, 0% 98.5%)',
        cut: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
    },

    font: {
        family: {
            text: '"Cinzel", serif',
            title: '"Cinzel", serif'
        },
        sizes: baseTheme.font.sizes,
    },

    variables: baseTheme.variables,
    screens: baseTheme.screens,
    offsets: baseTheme.offsets,
    elements: baseTheme.elements,
};

export default viking;
