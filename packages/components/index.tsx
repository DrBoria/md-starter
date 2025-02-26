'use client'

import { baseTheme } from '@md/styles/themes';

export { Button } from './default/Button';
export { Form, Input, SearchInput, FormLabel, TextCheckbox, Select, Radio, Submit } from './default/Form';
export { Pagination } from './default/Pagination';
export { Separator } from './default/Separator';
export { LoadingSpinner } from './default/LoadingSpinner';
export { Tooltip } from './default/Tooltip';
export { Logo } from './default/Logo';
export { Tabs } from './default/Tabs';
export { Carousel } from './default/Carousel';
export { Card } from './default/Card';
export { Loading, LoaderImage } from './default/Loading';
export { Header } from './default/Header';
export { StatusLabel } from './default/StatusLabel';
export { ProgressBar } from './default/ProgressBar';
export { ErrorValidationMessage, ErrorValidationContainer } from './default/Validation';

export {
    ColumnsContainer,
    DashboardCardsContainer,
    FocusedContainer,
    LinksContainer,
    OneLineContainer,
    MenuItemContainer,
    TextContainer,
    Section,
} from './default/Containers';
export {
    SubTitle,
    PageTitle,
    SectionTitle,
    DescriptionText,
    PlainText,
    HeaderText,
    LinkInForm,
} from './default/Typography';
export { CircleImage, WideImage } from './default/Images';
export { Link } from './default/Link';
export { MenuItem } from './default/MenuItem';


type TTheme = typeof baseTheme;
declare module 'styled-components' {
    export interface DefaultTheme extends TTheme { }
}
