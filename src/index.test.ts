import {
  decode,
  encode,
  getMostCommonLetters,
  removePunc,
  removeSpaces,
  tallyLetters,
} from './index';

const test = 'Every good boy does fine.';

describe('getHighestLetterFrequency', () => {
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
  it('should encode a string with a Caesar Cipher shift of 3', () => {
    expect(encode('Hello world!', 3)).toBe('Khoor zruog!');
  });

  it('should decode a string with a Caesar Cipher shift of 3', () => {
    expect(decode('khoor zruog!', 3)).toBe('hello world!');
  });
});
