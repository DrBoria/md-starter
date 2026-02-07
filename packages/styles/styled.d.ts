import 'styled-components';
import type base from './themes/baseTheme';

type Theme = typeof base;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {
        theme?: string;
        effects?: Record<string, unknown>;
        geometry?: Record<string, unknown>;
        assets?: Record<string, unknown>;
        fontFamily?: string;
        shadows?: Record<string, unknown>;
        glassEffect?: string;
        borderRadius?: string;
        labelBackground?: string;
        labelText?: string;
    }
}
