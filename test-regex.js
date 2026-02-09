
const strings = [
  "${({ theme }) => theme.colors.section}", // GlobalStyles
  "${({ theme }: { theme: Theme }) => theme.font.sizes.regular}", // ThemeProviderWrapper
  "baseTheme.offsets", // liquidGlass
  "${({ theme }) => theme.colors.section || 'white'}", // Bad Fallback 1
  "${({ theme }) => theme.space?.[2] || '10px'}", // Bad Fallback 2
  "theme.colors.red", // Simple
  "var(--page-offset)", // Variable (should fail theme check?, valid in CSS)
  "10px", // Literal (should fail)
];

// Regex we want to test:
// Must contain 'theme' or 'Theme'.
// Must NOT contain '||'.
const regexString = "^(?=.*(?:theme|Theme))(?!.*\\|\\|)[\\s\\S]*$";
const regex = new RegExp(regexString);

console.log(`Testing Regex: /${regexString}/`);

strings.forEach(str => {
  const match = regex.test(str);
  console.log(`String: "${str}"\nMatches: ${match} (Expected: ${!str.includes("||") && (str.includes("theme") || str.includes("Theme"))})\n`);
});
