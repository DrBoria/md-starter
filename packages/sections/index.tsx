export { HamburgerMenu } from './default';

import { baseTheme } from '@md/styles/themes';

type TTheme = typeof baseTheme;
declare module 'styled-components' {
    export interface DefaultTheme extends TTheme { }
}
