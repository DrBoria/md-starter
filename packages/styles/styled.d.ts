import 'styled-components';
import base from './themes/baseTheme';

type Theme = typeof base;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {
        theme?: string;
        effects?: any;
        geometry?: any;
        assets?: any;
        fontFamily?: string;
        shadows?: any;
        glassEffect?: string;
        borderRadius?: string;
        labelBackground?: string;
        labelText?: string;
    }
}
