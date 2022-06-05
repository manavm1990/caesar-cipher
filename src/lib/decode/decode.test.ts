import { testLong, testShort } from 'lib/common/common';
import { decode, guessWithFrequencyAnalysis } from './decode';

it('should decode a string with a Caesar Cipher shift of 4', () => {
  expect(decode('Khoor zruog!', 4)).toBe(testShort);
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
