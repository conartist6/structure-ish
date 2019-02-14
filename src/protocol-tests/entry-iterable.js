import expect from 'expect';
import { it, expectMethodExists } from './helpers';

export default function test(constructOneTwoThree) {
  it('has required methods', () => {
    expectMethodExists(constructOneTwoThree(), Symbol.iterator);
  });

  it('has a default iterator which returns [key, value] pairs', () => {
    for (const entry of constructOneTwoThree()) {
      expect(entry[0]).not.toBe(undefined);
      expect(entry[1]).not.toBe(undefined);
      expect(entry.length).toBe(2);
    }
  });
}
