import { baseTheme } from '@md/styles/themes';

type TTheme = typeof baseTheme;

// Fix for typescript basic theme apply
declare module 'styled-components/native' {
    export interface DefaultTheme extends TTheme { }
}
