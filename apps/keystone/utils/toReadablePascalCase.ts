function toReadablePascalCase(text: string): string {
  // Split the text at each uppercase letter, adding a space before each one
  const words = text.replace(/([A-Z])/g, " $1").trim();

  // Return the transformed text
  return words;
}

export { toReadablePascalCase };
