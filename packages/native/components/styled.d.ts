import 'styled-components/native';
import type { ThemeInterface } from '@md/styles';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeInterface {
        isNative?: boolean;
    }
}

declare module 'styled-components/native' {
    export interface DefaultTheme extends ThemeInterface {
        isNative?: boolean;
    }
}

declare module '*.svg' {
    import type React from 'react';
    import type { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}
