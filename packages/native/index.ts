import type { baseTheme } from '@md/styles/themes';

type TTheme = typeof baseTheme;

// Fix for typescript basic theme apply
declare module 'styled-components/native' {
    export type DefaultTheme = TTheme
}
