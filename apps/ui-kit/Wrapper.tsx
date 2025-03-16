import React, { FC } from 'react';
import { ThemeProvider } from '@md/styles';
import { ModalProvider, LoggerProvider } from '@md/components';


const Wrapper: FC = ({ children }) => (
    <ModalProvider>
        <LoggerProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </LoggerProvider>
    </ModalProvider>
);
export default Wrapper;
