import basic from './basic';

export default {
  theme: 'light',

  ...basic,
  section:        '#d3d8da',       // Light gray, soft on the eyes
  sectionContent: '#202020',       // Dark gray for main content
  overlay:        '#e6e6e6',       // Light overlay
  overlayActive:  '#dcdcdc',       // Slightly darker active overlay
  label:          '#777777',       // Muted gray for labels

  // Info
  warningBackground: '#FFE69C',    // Pale amber background
  warningText: '#8C6D00',          // Dark amber for text

  errorBackground: '#F3B3B5',      // Light red background
  errorText: '#9C2326',            // Dark red for error text

  successBackground: '#BDE8C2',    // Light green for success background
  successText: '#155724',          // Dark green for text
};
