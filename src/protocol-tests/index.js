import { isSequence, hasKeyedAccessors, hasSetAccessors, isEntryIterable } from '..';
import testSequence from './sequence';
import testKeyedAccessors from './keyed-accessors';
import testSetAccessors from './set-accessors';
import testEntryIterable from './entry-iterable';

export default function test(constructOneTwoThree) {
  const oneTwoThree = constructOneTwoThree([]);

  if (Array.from(oneTwoThree).length !== 3) {
    throw new Error(
      'You must pass a structure with three items in it.',
    );
  }

  if (isSequence(oneTwoThree)) {
    testSequence(constructOneTwoThree);
  }
  if (hasKeyedAccessors(oneTwoThree)) {
    testKeyedAccessors(constructOneTwoThree);
  }
  if (hasSetAccessors(oneTwoThree)) {
    testSetAccessors(constructOneTwoThree);
  }
  if (isEntryIterable(oneTwoThree)) {
    testEntryIterable(constructOneTwoThree);
  }
}
