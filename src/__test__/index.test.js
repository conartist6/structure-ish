import {
  List as ImmList,
  Map as ImmMap,
  Set as ImmSet,
  Seq as ImmSeq,
  Record as ImmRecordFactory,
} from 'immutable';

import {
  isSequence,
  hasKeyedAccessors,
  hasSetAccessors,
  isEntryIterable,
  Sequence,
  KeyedAccessors,
  SetAccessors,
  EntryIterable,
} from '../index';

const TestRecord = ImmRecordFactory({ foo: null });

class TestSequence {
  keys() {}
  values() {}
  entries() {}
  forEach() {}
  [Symbol.iterator]() {}
  [Sequence]() {}
}

class TestKeyedStore {
  get() {}
  has() {}
  get size() {
    return 0;
  }
  [KeyedAccessors]() {}
}

class TestSetStore {
  has() {}
  get size() {
    return 0;
  }
  [SetAccessors]() {}
}

class TestEntryIterable {
  [Symbol.iterator]() {}
  [EntryIterable]() {
    return true;
  }
}
``;
describe('isSequence', () => {
  it('returns false for undefined input', () => {
    expect(() => isSequence()).not.toThrow();
    expect(isSequence()).toBe(false);
  });

  it('returns true for immutable collections', () => {
    expect(isSequence(ImmMap())).toBe(true);
    expect(isSequence(ImmList())).toBe(true);
    expect(isSequence(ImmSet())).toBe(true);
    expect(isSequence(ImmSeq.Keyed())).toBe(true);
    expect(isSequence(ImmSeq.Indexed())).toBe(true);
    expect(isSequence(ImmSeq.Set())).toBe(true);
  });

  it('returns true for built in types', () => {
    expect(isSequence([])).toBe(true);
    expect(isSequence(new Map())).toBe(true);
    expect(isSequence(new Set())).toBe(true);
  });

  it('returns false for typed arrays', () => {
    expect(isSequence(new Uint16Array())).toBe(false);
    expect(isSequence(new Uint16Array())).toBe(false);
    expect(isSequence(new Uint32Array())).toBe(false);
    expect(isSequence(new Int16Array())).toBe(false);
    expect(isSequence(new Int16Array())).toBe(false);
    expect(isSequence(new Int32Array())).toBe(false);
    expect(isSequence(new Float32Array())).toBe(false);
    expect(isSequence(new Float64Array())).toBe(false);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(isSequence(new TestSequence())).toBe(true);
  });

  it('returns false for non-structure inputs', () => {
    expect(isSequence(ImmMap)).toBe(false);
    expect(isSequence(ImmList)).toBe(false);
    expect(isSequence(ImmSet)).toBe(false);
    expect(isSequence(ImmSeq.Keyed)).toBe(false);
    expect(isSequence(ImmSeq.Indexed)).toBe(false);
    expect(isSequence(ImmSeq.Set)).toBe(false);
    expect(isSequence(TestRecord())).toBe(false);
    expect(isSequence(Array)).toBe(false);
    expect(isSequence({})).toBe(false);
  });
});

describe('hasKeyedAccessors', () => {
  it('returns false for undefined input', () => {
    expect(() => hasKeyedAccessors()).not.toThrow();
    expect(hasKeyedAccessors()).toBe(false);
  });

  it('returns true for immutable Maps and Lists', () => {
    expect(hasKeyedAccessors(ImmMap())).toBe(true);
    expect(hasKeyedAccessors(ImmList())).toBe(true);
  });

  it('returns true for Maps', () => {
    expect(hasKeyedAccessors(new Map())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(hasKeyedAccessors(new TestKeyedStore())).toBe(true);
  });

  it('returns false for non-keyed-structure inputs', () => {
    expect(hasKeyedAccessors(TestRecord())).toBe(false);
    expect(hasKeyedAccessors(Array)).toBe(false);
    expect(hasKeyedAccessors({})).toBe(false);
    expect(hasSetAccessors([])).toBe(false);
    expect(hasKeyedAccessors(new Set())).toBe(false);
    expect(hasKeyedAccessors(ImmSeq.Keyed())).toBe(false);
    expect(hasKeyedAccessors(ImmSeq.Indexed())).toBe(false);
  });
});

describe('hasSetAccessors', () => {
  it('returns false for undefined input', () => {
    expect(() => hasSetAccessors()).not.toThrow();
    expect(hasSetAccessors()).toBe(false);
  });

  it('returns true for immutable Sets', () => {
    expect(hasSetAccessors(ImmSet())).toBe(true);
  });

  it('returns true for Sets', () => {
    expect(hasSetAccessors(new Set())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(hasSetAccessors(new TestSetStore())).toBe(true);
  });

  it('returns false for non-keyed-structure inputs', () => {
    expect(hasSetAccessors(TestRecord())).toBe(false);
    expect(hasSetAccessors(Array)).toBe(false);
    expect(hasSetAccessors({})).toBe(false);
    expect(hasSetAccessors([])).toBe(false);
    expect(hasSetAccessors(new Map())).toBe(false);
    expect(hasSetAccessors(ImmSeq.Set())).toBe(false);
  });
});

describe('isEntryIterable', () => {
  it('returns false for undefined input', () => {
    expect(() => isEntryIterable()).not.toThrow();
    expect(isEntryIterable()).toBe(false);
  });

  it('returns true for Entry Iterables', () => {
    expect(isEntryIterable(new Map())).toBe(true);
    expect(isEntryIterable(ImmMap())).toBe(true);
    expect(isEntryIterable(ImmSeq.Keyed())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(isEntryIterable(new TestEntryIterable())).toBe(true);
  });

  it('returns false for non-entry-iterable inputs', () => {
    expect(isEntryIterable(new Set())).toBe(false);
    expect(isEntryIterable(ImmList())).toBe(false);
    expect(isEntryIterable(ImmSet())).toBe(false);
    expect(isEntryIterable(ImmSeq.Indexed())).toBe(false);
    expect(isEntryIterable(ImmSeq.Set())).toBe(false);
    expect(isEntryIterable(TestRecord())).toBe(false);
    expect(isEntryIterable([])).toBe(false);
    expect(isEntryIterable({})).toBe(false);
  });
});
