import {
  decode,
  encode,
  getMostCommonLetters,
  guessWithFrequencyAnalysis,
  removePunc,
  removeSpaces,
  tallyLetters,
} from './index';

describe('getHighestLetterFrequency', () => {
  const test = 'Every good boy does fine.';

  it('should remove spaces', () => {
    expect(removeSpaces(test)).toBe('Everygoodboydoesfine.');
  });

  it('should remove punctuation', () => {
    expect(removePunc(test)).toBe('Every good boy does fine');
  });

  it('should tally up the letters', () => {
    expect(tallyLetters(test)).toEqual({
      e: 4,
      v: 1,
      r: 1,
      y: 2,
      g: 1,
      o: 4,
      d: 2,
      b: 1,
      s: 1,
      f: 1,
      i: 1,
      n: 1,
    });
  });

  it('should give the highest frequency letter', () => {
    expect(getMostCommonLetters('aabc')).toEqual(['a']);
  });

  it('should give the highest frequency letters', () => {
    expect(getMostCommonLetters(test)).toEqual(['e', 'o']);
  });

  it('should return an empty array if there are no letters', () => {
    expect(getMostCommonLetters('')).toEqual([]);
  });
});

describe('Caesar cipher encoding and decoding', () => {
  const testShort = 'Hello world!';
  const testLong =
    'This sentence should use the letter e more than any other letter.';

  it('should encode a string with a Caesar Cipher shift of 4', () => {
    expect(encode(testShort, 4)).toBe('Khoor zruog!');

    expect(encode(testLong)).toBe(
      'Wklv vhqwhqfh vkrxog xvh wkh ohwwhu h pruh wkdq dqb rwkhu ohwwhu.',
    );
  });

  it('should encode a lowercase string with a Caesar Cipher shift even when the letters wrap around the alphabet', () => {
    expect(encode(testShort.toLowerCase(), 22)).toBe('czggj rjmgy!');

    expect(encode(testLong.toLowerCase(), 22)).toBe(
      'ocdn nziozixz ncjpgy pnz ocz gzoozm z hjmz ocvi vit joczm gzoozm.',
    );
  });

  it('should encode a mixed case string with a Caesar Cipher shift even when the letters wrap around the alphabet', () => {
    expect(encode('Hello World!', 22)).toBe('Czggj Rjmgy!');

    expect(
      encode(
        'This sentence should use the letter E more than any other letter.',
        22,
      ),
    ).toBe('Ocdn nziozixz ncjpgy pnz ocz gzoozm Z hjmz ocvi vit joczm gzoozm.');
  });

  it('should encode an upper case string with a Caesar Cipher shift even when the letters wrap around the alphabet', () => {
    expect(encode(testShort.toUpperCase(), 22)).toBe('CZGGJ RJMGY!');

    expect(encode(testLong.toUpperCase(), 22)).toBe(
      'OCDN NZIOZIXZ NCJPGY PNZ OCZ GZOOZM Z HJMZ OCVI VIT JOCZM GZOOZM.',
    );
  });

  it('should decode a string with a Caesar Cipher shift of 4', () => {
    expect(decode('khoor zruog!', 4)).toBe('hello world!');
  });

  it('should decode a lowercase string with a Caesar Cipher shift even when the letters wrap around the alphabet', () => {
    expect(
      decode(
        'ocdn nziozixz ncjpgy pnz ocz gzoozm z hjmz ocvi vit joczm gzoozm.',
        22,
      ),
    ).toBe(testLong.toLowerCase());
  });

  it('should decode a mixed case string with a Caesar Cipher shift even when the letters wrap around the alphabet', () => {
    expect(
      decode(
        'Ocdn nziozixz ncjpgy pnz ocz gzoozm Z hjmz ocvi vit joczm gzoozm.',
        22,
      ),
    ).toBe('This sentence should use the letter E more than any other letter.');
  });

  it('should decode an upper case string with a Caesar Cipher shift even when the letters wrap around the alphabet', () => {
    expect(
      decode(
        'OCDN NZIOZIXZ NCJPGY PNZ OCZ GZOOZM Z HJMZ OCVI VIT JOCZM GZOOZM.',
        22,
      ),
    ).toBe(testLong.toUpperCase());
  });

  it("should make a reasonable guess based upon a single 'non-e' letter occurring most frequently", () => {
    expect(
      guessWithFrequencyAnalysis(
        'ocdn nziozixz ncjpgy pnz ocz gzoozm z hjmz ocvi vit joczm gzoozm.',
      ),
    ).toBe(testLong.toLowerCase());
  });
});
