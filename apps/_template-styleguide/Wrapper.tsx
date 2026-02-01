import React from 'react';
import * as colorThemes from '@md/styles/themes/colors';
import { ModalProvider, LoggerProvider, PageTitle } from '@md/components';
import { ThemeProvider, baseTheme } from '@md/styles';

const Wrapper = ({ children }) => {
    const childrenArray = React.useMemo(() => React.Children.toArray(children), [children]);
    
    // Safer check for ThemeEditor example
    const isThemeEditorExample = childrenArray.some(
        (child) => {
            const typeName = child?.type?.name || child?.type?.displayName || '';
            const code = child?.props?.code || '';
            return typeName.includes('ThemeEditor') || code.includes('ThemeEditor');
        }
    );

    // For only test Id we do not generate multiple themes
    if (isThemeEditorExample) {
        return <>{children}</>;
    }

    const validThemes = Object.entries(colorThemes).filter(
        ([key, theme]) => typeof theme === 'object' && key !== 'default' && (theme as any).section
    );

    return (
        <ThemeProvider key="root-theme-provider" theme={colorThemes.light}>
            <ModalProvider>
                <LoggerProvider>
                    {validThemes.map(([themeName, theme]) => (
                        <ThemeProvider key={themeName} theme={theme}>
                            <div style={{ background: `${(theme as any).section}`, marginBottom: '16px' }}>
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
