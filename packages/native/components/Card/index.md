# Card Component

The `Card` component is a touchable card element with an optional image, title, description, date, and read time. It is styled using `styled-components` for React Native and is compatible with your current theme.

## Usage

```jsx
const React = require("react").default || require("react");
const { Card } = require(".");
const ThemeProviderNative = require("../../ThemeProviderNative").default || require("../../ThemeProviderNative");

// Example function for handling press events
const handlePress = () => {
  console.log("Card Pressed");
};

<ThemeProviderNative>
  <Card
    image="https://example.com/image.jpg"
    title="Sample Card"
    description="This is a description for the sample card component."
    date="October 25, 2024"
    readTime="5"
    onPress={handlePress}
  />
</ThemeProviderNative>
  ;
```
