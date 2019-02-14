import expect from 'expect';
import { it, expectMethodsExist } from './helpers';

const iterators = [Symbol.iterator, 'keys', 'values', 'entries']

export default function test(constructOneTwoThree) {
  it('has required methods', () => {
    expectMethodsExist(constructOneTwoThree(), [...iterators, 'forEach'])
  });

  it('required methods all expose the same number of items', () => {
    let forEachLength = 0;

    constructOneTwoThree().forEach(() => forEachLength++);

    expect(forEachLength).toBe(3);

    for (const iterator of iterators) {
      expect(Array.from(constructOneTwoThree()[iterator]())).toHaveLength(3);
    }
  });

  it('keys are the same wherever they appear', () => {
    const expectedKeys = [];

    constructOneTwoThree().forEach((_, key) => expectedKeys.push(key));

    expect(Array.from(constructOneTwoThree().keys())).toEqual(expectedKeys);
    expect(Array.from(constructOneTwoThree().entries()).map(([key]) => key)).toEqual(expectedKeys);
  });

  it('values are the same wherever they appear', () => {
    const expectedValues = [];

    constructOneTwoThree().forEach(value => expectedValues.push(value));

    expect(Array.from(constructOneTwoThree().values())).toEqual(expectedValues);
    expect(Array.from(constructOneTwoThree().entries()).map(([, value]) => value)).toEqual(expectedValues);
  });
}
