const { keyWithMaxValue } = require('../../server/utils/object');

test('keyWithMaxValue({}) returns undefined', () => {
  expect(keyWithMaxValue({})).toBe(undefined);
});

test('keyWithMaxValue(null) returns undefined', () => {
  expect(keyWithMaxValue(null)).toBe(undefined);
});

test('keyWithMaxValue({ a: NaN }) returns undefined', () => {
  expect(keyWithMaxValue({ a: NaN })).toBe(undefined);
});

test('keyWithMaxValue({ a: 10 }) returns string', () => {
  expect(typeof(keyWithMaxValue({ a: 10 }))).toBe('string');
});

test('keyWithMaxValue({ a: 10 }) returns "a"', () => {
  expect(keyWithMaxValue({ a: 10 })).toBe('a');
});

test('keyWithMaxValue({ a: 10, b: 15 }) returns "a"', () => {
  expect(keyWithMaxValue({ a: 10, b: 15 })).toBe('b');
});

test('keyWithMaxValue({ a: 10, b: 10 }) returns "a"', () => {
  expect(keyWithMaxValue({ a: 10, b: 10 })).toBe('b');
});

