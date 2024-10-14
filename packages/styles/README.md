# Styles

> Here lies global definition for styles in application and ThemeProviderWrapper
> All global/reusable styles should be placed in this folder.

# ThemeProviderWrapper

        Inside ThemeProviderWrapper added css-variables for providing more readability in media queries
        This is easy way to update basic variables like offsets when media queries applied
        Following this style you do not need to write media query in every component where you use offset. Just list differences between mobile, tablet and desktop offsets in ThemeProviderWrapper and use css-variable in application

```diff
- Not
```

```jsx
const Button = styled.button`
  @media (min-width: ${screens.mobile.width}px) {
    padding: ${offsets.padding.mobile};
  }
  @media (min-width: ${screens.tablet.width}px) {
    padding: ${offsets.padding.tablet};
  }
  @media (min-width: ${screens.desktop.width}px) {
    padding: ${offsets.padding.desktop};
  }
`;
```

```diff
+ But
```

```jsx
const Button = styled.button`
  padding: ${offsets.padding};
`;
```

# Color Themes

        If you need more color themes add it to /styles/themes and provide using ThemeProvider around component where you want to use it.
