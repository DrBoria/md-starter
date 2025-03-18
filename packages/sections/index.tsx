export { HamburgerMenu } from './default';

import type { baseTheme } from '@md/styles/themes';

type TTheme = typeof baseTheme;
declare module 'styled-components' {
    export type DefaultTheme = TTheme
}
