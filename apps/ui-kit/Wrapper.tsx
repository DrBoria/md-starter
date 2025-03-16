import React, { FC } from 'react';
import * as colorThemes from '@md/styles/themes/colors';
import { ModalProvider, LoggerProvider } from '@md/components';
import { ThemeProvider } from '@md/styles';

const Wrapper: FC = ({ children }) => {
    return (
        <ThemeProvider>
            <ModalProvider>
                <LoggerProvider>
                    {Object.entries(colorThemes).map(([themeName, theme]) => (
                        <div key={themeName}>
                            <h2>{themeName}</h2>
                            <ThemeProvider theme={theme}>
                                {children}
                            </ThemeProvider>
                        </div>
                    ))}
                </LoggerProvider>
            </ModalProvider>
        </ThemeProvider>
    );
};

export default Wrapper;
