import 'styled-components';
import type { ThemeInterface } from '@md/styles';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeInterface {
        _brand?: 'sections';
    }
}
