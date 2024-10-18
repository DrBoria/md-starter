/**
 * Converts a singular word to its plural form by adding 's' or 'es'
 * based on the last letter of the word.
 *
 * @param word - The singular word to pluralize.
 * @returns The pluralized word.
 */
const toPlural = (word: string): string => {
  // Get the last letter of the word
  const lastLetter = word.slice(-1);
  const lastTwoLetters = word.slice(-2);

  // Check if the word ends with 's', 'x', 'z', 'ch', or 'sh'
  if (
    lastLetter === "s" ||
    lastLetter === "x" ||
    lastLetter === "z" ||
    lastTwoLetters === "ch" ||
    lastTwoLetters === "sh"
  ) {
    return word + "es";
  }

  // Otherwise, just add 's'
  return word + "s";
};

export { toPlural };
