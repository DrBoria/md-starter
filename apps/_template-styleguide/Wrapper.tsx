import React from 'react';
import * as colorThemes from '@md/styles/themes/colors';
import { ModalProvider, LoggerProvider, PageTitle } from '@md/components';
import { ThemeProvider } from '@md/styles';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const childrenArray = React.useMemo(() => React.Children.toArray(children), [children]);

    // Safer check for ThemeEditor example
    const isThemeEditorExample = childrenArray.some(
        (child) => {
            if (!React.isValidElement(child)) return false;
            const typeName = (child.type as { name?: string; displayName?: string })?.name || (child.type as { name?: string; displayName?: string })?.displayName || '';
            const code = (child.props as { code?: string })?.code || '';
            return typeName.includes('ThemeEditor') || code.includes('ThemeEditor');
        }
    );

    // For only test Id we do not generate multiple themes
    if (isThemeEditorExample) {
        return <>{children}</>;
    }

    const validThemes = Object.entries(colorThemes).filter(
        ([key, theme]) => typeof theme === 'object' && key !== 'default' && (theme as { colors: { section: string } }).colors?.section
    );

    return (
        <ThemeProvider key="root-theme-provider" theme={colorThemes.viking}>
            <ModalProvider>
                <LoggerProvider>
                    {validThemes.map(([themeName, theme]) => (
                        <ThemeProvider key={themeName} theme={theme}>
                            <div style={{ background: `${(theme as { colors: { section: string } }).colors.section}`, marginBottom: '16px' }}>
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
