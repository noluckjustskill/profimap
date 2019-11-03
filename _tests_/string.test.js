const { generate } = require('../server/utils/string');

test('generate(5) returns string', () => {
  expect(typeof(generate(5))).toBe('string');
});

test('generate(5) returns 5 characters string', () => {
  expect(generate(5)).toHaveLength(5);
});
