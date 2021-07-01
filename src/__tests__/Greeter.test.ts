import { Greeter, parser } from '../index';
test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});

test('parser Test', () => {
  expect(parser({name:'Carl'})).toBe('hallo');
});
