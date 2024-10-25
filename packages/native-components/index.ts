import { baseTheme } from '@md/styles/themes';

export { default as ThemeProvider } from './ThemeProviderNative';
export { Card } from './Card';

type TTheme = typeof baseTheme;

// Fix for typescript basic theme apply
declare module 'styled-components/native' {
    export interface DefaultTheme extends TTheme { }
}
