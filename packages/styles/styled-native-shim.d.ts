declare module 'styled-components/native' {
    import * as React from 'react';
    import {
        DefaultTheme,
        ThemedStyledProps,
        Interpolation,
        CSSObject,
        FlattenSimpleInterpolation
    } from 'styled-components';

    // Re-export DefaultTheme to receive augmentations
    export interface DefaultTheme extends DefaultTheme { }

    // Type for a styled component builder
    interface StyledFunction<C> {
        <U extends object = {}>(
            first: TemplateStringsArray | CSSObject | ((props: ThemedStyledProps<React.ComponentProps<C> & U, DefaultTheme>) => Interpolation<ThemedStyledProps<React.ComponentProps<C> & U, DefaultTheme>>),
            ...rest: Array<Interpolation<ThemedStyledProps<React.ComponentProps<C> & U, DefaultTheme>>>
        ): React.ComponentType<React.ComponentProps<C> & U>;

        attrs(attrs: any): StyledFunction<C>;
    }

    interface ReactNativeStyledInterface {
        <C extends React.ComponentType<any>>(component: C): StyledFunction<C>;

        // Primitive components (add more as needed)
        View: StyledFunction<typeof import('react-native').View>;
        Text: StyledFunction<typeof import('react-native').Text>;
        Image: StyledFunction<typeof import('react-native').Image>;
        ScrollView: StyledFunction<typeof import('react-native').ScrollView>;
        SafeAreaView: StyledFunction<typeof import('react-native').SafeAreaView>;
        TextInput: StyledFunction<typeof import('react-native').TextInput>;
        TouchableOpacity: StyledFunction<typeof import('react-native').TouchableOpacity>;
        TouchableHighlight: StyledFunction<typeof import('react-native').TouchableHighlight>;
        TouchableWithoutFeedback: StyledFunction<typeof import('react-native').TouchableWithoutFeedback>;
        FlatList: StyledFunction<typeof import('react-native').FlatList>;
        SectionList: StyledFunction<typeof import('react-native').SectionList>;
        ActivityIndicator: StyledFunction<typeof import('react-native').ActivityIndicator>;
    }

    const styled: ReactNativeStyledInterface;
    export default styled;

    export {
        css,
        ThemeProvider,
        useTheme,
        withTheme
    } from 'styled-components';
}
