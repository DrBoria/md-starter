'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import ThemeProviderWrapper from '@md/styles/ThemeProviderWrapper'
import { light } from '@md/styles'

type TColorTheme = typeof light;

export default function StyledThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode
  theme?: TColorTheme
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') {
    return <ThemeProviderWrapper theme={theme}>{children}</ThemeProviderWrapper>
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProviderWrapper theme={theme}>{children}</ThemeProviderWrapper>
    </StyleSheetManager>
  )
}
