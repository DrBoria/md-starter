import 'styled-components/native';
import type { ThemeInterface } from '@md/styles';

declare module 'styled-components/native' {
    export interface DefaultTheme extends ThemeInterface {
        __ignore?: never;
    }
}
