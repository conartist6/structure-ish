import expect from 'expect';
import { isEntryIterable } from '..';
import { it, expectMethodsExist } from './helpers';

export default function test(constructOneTwoThree) {
  it('has required methods', () => {
    expectMethodsExist(constructOneTwoThree(), ['has']);
  });

  it('has a size property', () => {
    expect(constructOneTwoThree()).toHaveProprety('size', 3);
  })

  if (constructOneTwoThree()[Symbol.iterator]) {
    it('has the values yielded by its iterator', () => {
      const oneTwoThree = constructOneTwoThree();
      for (const item of oneTwoThree) {
        const value = isEntryIterable(oneTwoThree) ? item[1] : item;
        expect(oneTwoThree.has(value)).toBe(true);
      }
    });
  }

  it('does not contain prototype properties', () => {
    expect(constructOneTwoThree().has('hasOwnProperty')).toBe(false);
  });
}
