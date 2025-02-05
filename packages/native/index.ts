import { baseTheme } from '@md/styles/themes';

export { default as ThemeProvider } from './ThemeProviderNative';
export { Card } from './components/Card';
export { Button } from './components/Button';
export { Link } from './components/Link';
export { LoadingSpinner } from './components/LoadingSpinner';
export { HamburgerMenu } from './components/HamburgerMenu';
export { PageContainer, BasicSection, HeadingContainer, Section, TextContainer } from './components/Containers';
export {
    PageTitle,
    Highlighted,
    SubTitle,
    SectionTitle,
    PlainText,
    Label,
} from './components/Typography';
export {
    Input
} from './components/Form';

type TTheme = typeof baseTheme;

// Fix for typescript basic theme apply
declare module 'styled-components/native' {
    export interface DefaultTheme extends TTheme { }
}
