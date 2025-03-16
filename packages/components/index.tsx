import { baseTheme } from '@md/styles/themes';

export * from './default/Button';
export * from './default/Buttons';
export * from './default/Form';
export * from './default/Pagination';
export * from './default/Separator';
export * from './default/LoadingSpinner';
export * from './default/Tooltip';
export * from './default/Logo';
export * from './default/Tabs';
export * from './default/Carousel';
export * from './default/Card';
export * from './default/Loading';
export * from './default/Header';
export * from './default/StatusLabel';
export * from './default/ProgressBar';
export * from './default/Validation';
export * from './default/Logger';
export * from './default/Modals';
export * from './default/Containers';
export * from './default/Typography';
export * from './default/Images';
export * from './default/Link';
export * from './default/MenuItem';
export * from './default/Icons';

type TTheme = typeof baseTheme;
declare module 'styled-components' {
    export interface DefaultTheme extends TTheme { }
}
