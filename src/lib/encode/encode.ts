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
