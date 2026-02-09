import 'styled-components';
import { ThemeInterface } from '@md/styles';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeInterface { }
}
