import { getMostCommonLetters } from '../common/common';

const shiftDecodeLowerCase = (originalCharCode: number, shift: number) => {
  const decodedCharCode = originalCharCode - shift + 1;

  if (decodedCharCode < 65) {
    return String.fromCharCode(90 - (65 - decodedCharCode) + 1);
  }

  return String.fromCharCode(decodedCharCode);
};

const shiftDecodeUpperCase = (originalCharCode: number, shift: number) => {
  const decodedCharCode = originalCharCode - shift + 1;

  if (decodedCharCode < 97) {
    return String.fromCharCode(122 - (97 - decodedCharCode) + 1);
  }

  return String.fromCharCode(decodedCharCode);
};

export const decode = (encoded = '', shift: number) =>
  encoded
    .split('')
    .map((char) => {
      if (!char.match(/[a-zA-Z]/)) return char;

      // Letters are 65-90 or 97-122
      // Get the encoded char code to see if it's upper or lower case
      const encodedCharCode = char.charCodeAt(0);

      if (encodedCharCode >= 65 && encodedCharCode <= 90) {
        return shiftDecodeLowerCase(encodedCharCode, shift);
      }

      return shiftDecodeUpperCase(encodedCharCode, shift);
    })
    .join('');

export const guessWithFrequencyAnalysis = (encoded: string) => {
  // The most common letter in the English language is 'e'.
  // It's character code is 101.

  // TODO: Implement this function to send out multiple guesses for ties.
  const mostCommonLetterCode = getMostCommonLetters(encoded)
    .filter((letter) => letter !== 'e')[0]
    ?.charCodeAt(0);

  if (!mostCommonLetterCode) return null;

  return decode(encoded, mostCommonLetterCode - 101 + 1);
};
