// StyledComponentsRegistry.jsx
'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ThemeProvider } from '@md/styles';
import { light } from '@md/styles';

export default function StyledComponentsRegistry({
    children,
    theme = light,
}) {
    const sheet = new ServerStyleSheet();

    useServerInsertedHTML(() => {
        const styles = sheet.getStyleElement();
        sheet.instance.clearTag();
        return <>{styles}</>;
    });

    return (
        <StyleSheetManager sheet={sheet.instance}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyleSheetManager>
    );
}
