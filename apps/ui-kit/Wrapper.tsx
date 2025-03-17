import React, { FC } from 'react';
import * as colorThemes from '@md/styles/themes/colors';
import { ModalProvider, LoggerProvider, PageTitle } from '@md/components';
import { ThemeProvider } from '@md/styles';

const Wrapper: FC = ({ children }) => {
    const childrenArray = React.Children.toArray(children);
    const isThemeEditorExample = childrenArray.some(
        (child) => {
            return child?._owner?.memoizedProps?.code?.includes('ThemeEditor');
        }
    );

    // For only test Id we do not generate multiple themes
    if (isThemeEditorExample) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider>
            <ModalProvider>
                <LoggerProvider>
                    {Object.entries(colorThemes).map(([themeName, theme]) => (
                        <ThemeProvider theme={theme}>
                            <div key={themeName} style={{ background: `${theme.section}`, marginBottom: '16px' }}>
                                <PageTitle>{themeName}</PageTitle>
                                {children}
                            </div>
                        </ThemeProvider>
                    ))}
                </LoggerProvider>
            </ModalProvider>
        </ThemeProvider>
    );
};

export default Wrapper;
