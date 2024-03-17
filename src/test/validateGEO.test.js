import validateGEO from '../js/validateGEO.js';

test.each([
  ['true for valid GEO', '63.41381, −52.45362', true],
  ['true for valid GEO', '63.41381,−52.45362', true],
  ['true for valid GEO', '[63.41381, −52.45362]', true],
  ['false for invalid GEO', '98.71751,−232.52572', false],
])('Validate GEO %s', (_, input, expected) => {
  expect(validateGEO(input)).toBe(expected);
});
