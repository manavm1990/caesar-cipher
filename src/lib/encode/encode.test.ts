import { testLong, testShort } from 'lib/common/common';
import { encode } from './encode';

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
