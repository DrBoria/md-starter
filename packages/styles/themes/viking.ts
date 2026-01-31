// 1. Assets (Data URI for optimization)
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;
const KNOT = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 5 0, 10 10 T 20 10' stroke='%2330d5c8' fill='none' opacity='0.3'/%3E%3C/svg%3E")`;

export default {
    theme: 'viking',

    // --- PALETTE (Dark Slate & Turquoise) ---
    section: '#182022',        // Wet Stone
    sectionContent: '#ecf0f1', // Mist

    overlay: '#0b0e0f',        // Deep Cave (Input bg) - User request
    overlayActive: '#1c2629',

    highlighted: '#30d5c8',    // Aurora Turquoise (Main)
    highlightedText: '#081a18',// Dark text on turquoise

    disabled: '#374b4e',       // Steel (Borders)

    // Statuses
    warning: '#e67e22',
    warningBackground: '#3e2723',
    warningText: '#ffccbc',
    errorBackground: '#3b1010',
    errorText: '#ffb3b3',
    successBackground: '#0a2e18',
    successText: '#a3e4b3',

    // --- SHARED EFFECTS (The Magic) ---
    effects: {
        texture: NOISE,

        glow: {
            // Soft halo (text or inactive borders)
            soft: '0 0 10px rgba(48, 213, 200, 0.1)',
            // Standard glow (Hover state)
            medium: '0 0 15px rgba(48, 213, 200, 0.4), 0 0 30px rgba(48, 213, 200, 0.1)',
            // Strong glow (Focus input / Active button)
            strong: '0 0 20px rgba(48, 213, 200, 0.6), 0 0 40px rgba(0, 255, 127, 0.3)',
        },

        depth: {
            inner: {
                // Soft (Shallow): For minor indentations or inactive states
                soft: 'inset 1px 1px 2px rgba(0,0,0,0.6), inset -0.5px -0.5px 1px rgba(255,255,255,0.05)',
                // Medium (Standard Engraved): For Inputs
                medium: 'inset 2px 2px 6px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.05)',
                // Strong (Deep Drilled): For specialized/heavy inputs or pressed states
                strong: 'inset 4px 4px 10px rgba(0,0,0,0.9), inset -1px -1px 2px rgba(255,255,255,0.02)',
            },
            outer: {
                // Soft: Subtle lift (Cards?)
                soft: '0 5px 15px rgba(0,0,0,0.5)',
                // Medium: Floating (Modals / Cards)
                medium: '0 15px 35px rgba(0,0,0,0.7), 0 0 0 1px rgba(48, 213, 200, 0.05)',
                // Strong: Levitating (Alerts?)
                strong: '0 25px 50px rgba(0,0,0,0.9), 0 0 0 1px rgba(48, 213, 200, 0.1)',
            },
            // Legacy/Base Compat
            engraved: 'inset 2px 2px 6px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.05)',
            floating: '0 15px 35px rgba(0,0,0,0.7), 0 0 0 1px rgba(48, 213, 200, 0.05)',
        },

        // Interaction packages
        interaction: {
            hover: `
        transform: translateY(-2px);
        filter: brightness(1.1);
        box-shadow: 0 10px 20px -5px rgba(48, 213, 200, 0.15);
      `,
            active: `
        transform: translateY(1px);
        filter: brightness(0.95);
        box-shadow: 0 2px 10px -5px rgba(0,0,0,0.5);
      `
        }
    },

    // --- GEOMETRY ---
    geometry: {
        radius: '0px',
        // Ragged edge (generated polygon)
        ragged: 'polygon(0% 0%, 5% 2%, 10% 0%, 15% 1%, 20% 0%, 30% 2%, 40% 0%, 50% 1%, 60% 0%, 70% 2%, 80% 0%, 90% 1%, 100% 0%, 100% 100%, 0% 100%)',
        cut: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
    },

    assets: {
        knotPattern: KNOT
    },

    // Legacy/Compat props required by DefaultTheme type
    glassEffect: 'blur(10px) saturate(180%)',
    font: {
        size: '14px',
        family: {
            text: '"Cinzel", serif',
            title: '"Cinzel", serif'
        }
    },
    fontFamily: '"Cinzel", serif',
    borderRadius: '0px',
    labelBackground: '#2c3e50', // Fallback
    labelText: '#bdc3c7', // Fallback
};
