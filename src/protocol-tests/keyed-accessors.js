import expect from 'expect';
import { isSequence, isEntryIterable } from '..';
import { it, expectMethodsExist } from './helpers';

export default function test(constructOneTwoThree) {
  it('has required methods', () => {
    expectMethodsExist(constructOneTwoThree(), ['has', 'get']);
  });

  it('has a size property', () => {
    expect(constructOneTwoThree()).toHaveProperty('size', 3);
  })

  if (constructOneTwoThree()[Symbol.iterator]) {
    it('has the keys yielded by its iterator', () => {
      const oneTwoThree = constructOneTwoThree();
      for (const item of oneTwoThree) {
        const key = isEntryIterable(oneTwoThree) ? item[0] : item;
        expect(oneTwoThree.has(key)).toBe(true);
      }
    });

    if (isEntryIterable(constructOneTwoThree()) || isSequence(constructOneTwoThree())) {
      it('can get the keys yielded by its iterator', () => {
        const oneTwoThree = constructOneTwoThree();
        const entries = isEntryIterable(oneTwoThree) ? oneTwoThree[Symbol.iterator]() : oneTwoThree.entries();
        for (const [key, value] of entries) {
          expect(oneTwoThree.get(key)).toBe(value);
        }
      });
    }
  }

  it('does not contain prototype properties', () => {
    expect(constructOneTwoThree().has('hasOwnProperty')).toBe(false);
  });
}
