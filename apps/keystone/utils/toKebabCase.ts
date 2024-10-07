/**
 * Converts a camelCase or PascalCase string to kebab-case.
 * @param input - The input string in camelCase or PascalCase format.
 * @returns The string converted to kebab-case.
 */
function toKebabCase(input: string): string {
  // Check if the input is already in kebab-case
  if (/^[a-z]+(?:-[a-z]+)*$/.test(input)) {
    return input; // Return the input as it is if it's already in kebab-case
  }

  // Regex to find uppercase letters in the string and replace them
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Insert a hyphen between lowercase letters/numbers followed by uppercase letters
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2") // Insert a hyphen between consecutive uppercase letters followed by a lowercase letter
    .toLowerCase(); // Convert the whole string to lowercase
}

export { toKebabCase };
