import { initials } from '../../utils/userUtils';

test('initials("Ivanov Ivan") returns string', () => {
  expect(typeof(initials('Ivanov Ivan'))).toBe('string');
});

test('initials("ivanov ivan") returns "I I"', () => {
  expect(initials('ivanov ivan')).toBe('I I');
});

test('initials("Ivanov") returns I', () => {
  expect(initials('Ivanov')).toBe('I');
});
