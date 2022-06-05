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

const shiftEncodeLower = (originalCharCode: number, shift: number) => {
  const shiftedCode = originalCharCode + shift - 1;

  // wrap around the alphabet
  if (shiftedCode > 122) {
    // At a shift of 22, the letter 'f' (shifted to 123) wraps to 'a' (97)
    return String.fromCharCode((shiftedCode % 122) + 96);
  }

  return String.fromCharCode(shiftedCode);
};

const shiftEncodeUpper = (originalCharCode: number, shift: number) => {
  const shiftedCode = originalCharCode + shift - 1;

  if (shiftedCode > 90) {
    return String.fromCharCode((shiftedCode % 90) + 64);
  }

  return String.fromCharCode(shiftedCode);
};

// A shift of 1 means no change (off by one)
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

export const encode = (text = '', shift = 4) =>
  text
    .split('')
    .map((char) => {
      if (!char.match(/[a-zA-Z]/)) return char;

      // Letters are 65-90 or 97-122
      // Get the unencoded char code to see if it's upper or lower case
      const originalCharCode = char.charCodeAt(0);

      if (originalCharCode >= 65 && originalCharCode <= 90) {
        return shiftEncodeUpper(originalCharCode, shift);
      }

      return shiftEncodeLower(originalCharCode, shift);
    })
    .join('');

export const getMostCommonLetters = (text = '') => {
  const sortedLetterTallyEntries = Object.entries(tallyLetters(text)).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    sortedLetterTallyEntries
      .filter((entry) => entry[1] === sortedLetterTallyEntries[0]![1])

      // Only care about the letters, not the count.
      .map((entry) => entry[0])
  );
};

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

export const removePunc = (text = '') => text.replace(/[^\w\s]/g, '');

export const removeSpaces = (text = '') => text.replace(/\s/g, '');

export const tallyLetters = (text = '') =>
  text
    .toLowerCase()
    .split('')
    .reduce((tally: { [key: string]: number }, letter: string) => {
      if (!letter.match(/[a-z]/)) return tally;
      tally[letter] = tally[letter] ? tally[letter]! + 1 : 1;
      return tally;
    }, {});
