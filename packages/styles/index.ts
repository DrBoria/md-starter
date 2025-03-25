import { baseTheme } from './themes';

export { default as ThemeProvider } from './ThemeProviderWrapper';

export {
    light,
    dark
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
    export interface DefaultTheme extends TTheme { }
}

