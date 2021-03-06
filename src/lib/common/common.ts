export const testShort = 'Hello world!';
export const testLong =
  'This sentence should use the letter e more than any other letter.';

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
