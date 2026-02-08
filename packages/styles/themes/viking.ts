// eslint-disable-next-line no-restricted-imports
import type { ThemeInterface } from '../types';
import baseTheme from './baseTheme';

// 1. Assets (Data URI for optimization)
// const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;
// const KNOT = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 5 0, 10 10 T 20 10' stroke='%2330d5c8' fill='none' opacity='0.3'/%3E%3C/svg%3E")`;


const viking: ThemeInterface = {
    theme: 'viking',

    colors: {
        // --- PALETTE (Dark Slate & Turquoise) ---
        section: '#182022',        // Wet Stone
        sectionContent: '#ecf0f1', // Mist

        overlay: '#0b0e0f',        // Deep Cave (Input bg)
        overlayActive: '#1c2629',

        highlighted: '#30d5c8',    // Aurora Turquoise (Main)
        highlightedText: '#081a18',// Dark text on turquoise

        disabled: '#374b4e',       // Steel (Borders)

        // Statuses
        warningBackground: '#3e2723',
        warningText: '#ffccbc',
        errorBackground: '#3b1010',
        errorText: '#ffb3b3',
        successBackground: '#0a2e18',
        successText: '#a3e4b3',

        // Fallbacks
        labelBackground: '#2c3e50',
        labelText: '#bdc3c7',
    },

    // --- SHARED EFFECTS (The Magic) ---
    effects: {
        texture: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,

        glow: {
            // Soft halo (text or inactive borders)
            soft: '0 0 10px rgba(48, 213, 200, 0.2)',
            // Standard glow (Hover state)
            medium: '0 0 15px rgba(48, 213, 200, 0.5), 0 0 30px rgba(48, 213, 200, 0.2)',
            // Strong glow (Focus input / Active button)
            strong: '0 0 20px rgba(48, 213, 200, 0.8), 0 0 40px rgba(0, 255, 127, 0.4)',
        },

        depth: {
            inner: {
                // Soft (Shallow): For minor indentations or inactive states
                soft: 'inset 1px 1px 2px rgba(0,0,0,0.6), inset -0.5px -0.5px 1px rgba(255,255,255,0.05)',
                // Medium (Standard Engraved): For Inputs
                medium: 'inset 2px 2px 8px rgba(0,0,0,0.85), inset -1px -1px 2px rgba(255,255,255,0.08)',
                // Strong (Deep Drilled): For specialized/heavy inputs or pressed states
                strong: 'inset 4px 4px 12px rgba(0,0,0,0.95), inset -1px -1px 2px rgba(255,255,255,0.05)',
            },
            outer: {
                // Soft: Subtle lift (Cards?)
                soft: '0 5px 15px rgba(0,0,0,0.6)',
                // Medium: Floating (Modals / Cards)
                medium: '0 15px 35px rgba(0,0,0,0.8), 0 0 0 1px rgba(48, 213, 200, 0.1)',
                // Strong: Levitating (Alerts?)
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

    // --- GEOMETRY ---
    geometry: {
        radius: '0px',
        // Minimalist organic edge - very few points to avoid "ribbing" on small elements
        ragged: 'polygon(0% 1.5%, 25% 0%, 55% 2%, 80% 0.5%, 100% 1.5%, 100% 98.5%, 85% 100%, 50% 98%, 20% 100%, 0% 98.5%)',
        cut: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
    },

    // Legacy/Compat properties
    font: {
        family: {
            text: '"Cinzel", serif',
            title: '"Cinzel", serif'
        },
        sizes: baseTheme.font.sizes,
    },

    // System properties from baseTheme
    variables: baseTheme.variables,
    screens: baseTheme.screens,
    offsets: baseTheme.offsets,
    elements: baseTheme.elements,
};

export default viking;
