import { baseTheme } from '@md/styles/themes';

export { default as ThemeProvider } from './ThemeProviderNative';
export { Card } from './Card';
export { Button } from './Button';
export { Link } from './Link';
export { LoadingSpinner } from './LoadingSpinner';
export { PageContainer, BasicSection, HeadingContainer } from './Containers';
export {
    PageTitle,
    Highlighted,
    SubTitle,
    SectionTitle,
    PlainText,
    Label,
} from './Typography';
export {
    Input
} from './Form';

type TTheme = typeof baseTheme;

// Fix for typescript basic theme apply
declare module 'styled-components/native' {
    export interface DefaultTheme extends TTheme { }
}
