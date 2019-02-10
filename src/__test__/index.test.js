import {
  List as ImmList,
  Map as ImmMap,
  Set as ImmSet,
  Seq as ImmSeq,
  Record as ImmRecordFactory,
} from 'immutable';

import {
  isStructure,
  isMapish,
  isSetish,
  isListish,
  hasKeyedMethods,
  hasSetMethods,
  isEntryIterable,
  Structure,
  KeyedMethods,
  EntryIterable,
  SetMethods,
} from '../index';

const TestRecord = ImmRecordFactory({ foo: null });

class TestStructure {
  keys() {}
  values() {}
  entries() {}
  [Symbol.iterator]() {}
  [Structure]() {}
}

class TestKeyedStore {
  get() {}
  set() {}
  has() {}
  delete() {}
  get size() {
    return 0;
  }
  [KeyedMethods]() {}
}

class TestSetStore {
  add() {}
  has() {}
  delete() {}
  get size() {
    return 0;
  }
  [SetMethods]() {}
}

class TestMap {
  get() {}
  set() {}
  has() {}
  delete() {}
  keys() {}
  values() {}
  entries() {}
  get size() {
    return 0;
  }
  [Symbol.iterator]() {}
  [Structure]() {}
  [KeyedMethods]() {}
  [EntryIterable]() {}
}

class TestSet {
  add() {}
  has() {}
  delete() {}
  keys() {}
  values() {}
  entries() {}
  get size() {
    return 0;
  }
  [Symbol.iterator]() {}
  [Structure]() {}
  [SetMethods]() {}
}

class TestList {
  get() {}
  set() {}
  has() {}
  delete() {}
  keys() {}
  values() {}
  entries() {}
  get size() {
    return 0;
  }
  [Symbol.iterator]() {}
  [Structure]() {}
  [KeyedMethods]() {}
}

class TestEntryIterable {
  [Symbol.iterator]() {}
  [EntryIterable]() {
    return true;
  }
}
``;
describe('isStructure', () => {
  it('returns false for undefined input', () => {
    expect(() => isStructure()).not.toThrow();
    expect(isStructure()).toBe(false);
  });

  it('returns true for immutable collections', () => {
    expect(isStructure(ImmMap())).toBe(true);
    expect(isStructure(ImmList())).toBe(true);
    expect(isStructure(ImmSet())).toBe(true);
    expect(isStructure(ImmSeq.Keyed())).toBe(true);
    expect(isStructure(ImmSeq.Indexed())).toBe(true);
    expect(isStructure(ImmSeq.Set())).toBe(true);
  });

  it('returns true for built in types', () => {
    expect(isStructure([])).toBe(true);
    expect(isStructure(new Map())).toBe(true);
    expect(isStructure(new Set())).toBe(true);
  });

  it('returns false for typed arrays', () => {
    expect(isStructure(new Uint16Array())).toBe(false);
    expect(isStructure(new Uint16Array())).toBe(false);
    expect(isStructure(new Uint32Array())).toBe(false);
    expect(isStructure(new Int16Array())).toBe(false);
    expect(isStructure(new Int16Array())).toBe(false);
    expect(isStructure(new Int32Array())).toBe(false);
    expect(isStructure(new Float32Array())).toBe(false);
    expect(isStructure(new Float64Array())).toBe(false);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(isStructure(new TestStructure())).toBe(true);
  });

  it('returns false for non-structure inputs', () => {
    expect(isStructure(ImmMap)).toBe(false);
    expect(isStructure(ImmList)).toBe(false);
    expect(isStructure(ImmSet)).toBe(false);
    expect(isStructure(ImmSeq.Keyed)).toBe(false);
    expect(isStructure(ImmSeq.Indexed)).toBe(false);
    expect(isStructure(ImmSeq.Set)).toBe(false);
    expect(isStructure(TestRecord())).toBe(false);
    expect(isStructure(Array)).toBe(false);
    expect(isStructure({})).toBe(false);
  });
});

describe('hasKeyedMethods', () => {
  it('returns false for undefined input', () => {
    expect(() => hasKeyedMethods()).not.toThrow();
    expect(hasKeyedMethods()).toBe(false);
  });

  it('returns true for immutable Maps and Lists', () => {
    expect(hasKeyedMethods(ImmMap())).toBe(true);
    expect(hasKeyedMethods(ImmList())).toBe(true);
  });

  it('returns true for Maps', () => {
    expect(hasKeyedMethods(new Map())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(hasKeyedMethods(new TestKeyedStore())).toBe(true);
    expect(hasKeyedMethods(new TestList())).toBe(true);
  });

  it('returns false for non-keyed-structure inputs', () => {
    expect(hasKeyedMethods(TestRecord())).toBe(false);
    expect(hasKeyedMethods(Array)).toBe(false);
    expect(hasKeyedMethods({})).toBe(false);
    expect(hasSetMethods([])).toBe(false);
    expect(hasKeyedMethods(new Set())).toBe(false);
    expect(hasKeyedMethods(new TestSet())).toBe(false);
    expect(hasKeyedMethods(ImmSeq.Keyed())).toBe(false);
    expect(hasKeyedMethods(ImmSeq.Indexed())).toBe(false);
  });
});

describe('hasSetMethods', () => {
  it('returns false for undefined input', () => {
    expect(() => hasSetMethods()).not.toThrow();
    expect(hasSetMethods()).toBe(false);
  });

  it('returns true for immutable Sets', () => {
    expect(hasSetMethods(ImmSet())).toBe(true);
  });

  it('returns true for Sets', () => {
    expect(hasSetMethods(new Set())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(hasSetMethods(new TestSetStore())).toBe(true);
  });

  it('returns false for non-keyed-structure inputs', () => {
    expect(hasSetMethods(TestRecord())).toBe(false);
    expect(hasSetMethods(Array)).toBe(false);
    expect(hasSetMethods({})).toBe(false);
    expect(hasSetMethods([])).toBe(false);
    expect(hasSetMethods(new Map())).toBe(false);
    expect(hasSetMethods(new TestList())).toBe(false);
    expect(hasSetMethods(new TestMap())).toBe(false);
    expect(hasSetMethods(ImmSeq.Set())).toBe(false);
  });
});

describe('isMapish', () => {
  it('returns false for undefined input', () => {
    expect(() => isMapish()).not.toThrow();
    expect(isMapish()).toBe(false);
  });

  it('returns true for native Maps', () => {
    expect(isMapish(new Map())).toBe(true);
  });

  it('returns true for Immutable Maps', () => {
    expect(isMapish(ImmMap())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(isMapish(new TestMap())).toBe(true);
  });

  it('returns false for non-Mapish inputs', () => {
    expect(isMapish(Map)).toBe(false);
    expect(isMapish(ImmMap)).toBe(false);
    expect(isMapish(ImmSeq.Keyed())).toBe(false);
    expect(isMapish(TestRecord())).toBe(false);
    expect(isMapish(new Set())).toBe(false);
    expect(isMapish([])).toBe(false);
    expect(isMapish({})).toBe(false);
  });
});

describe('isSetish', () => {
  it('returns false for undefined input', () => {
    expect(() => isSetish()).not.toThrow();
    expect(isSetish()).toBe(false);
  });

  it('returns true for native Sets', () => {
    expect(isSetish(new Set())).toBe(true);
  });

  it('returns true for Immutable Sets', () => {
    expect(isSetish(ImmSet())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(isSetish(new TestSet())).toBe(true);
  });

  it('returns false for non-Setish inputs', () => {
    expect(isSetish(Set)).toBe(false);
    expect(isSetish(ImmSet)).toBe(false);
    expect(isSetish(ImmSeq.Set())).toBe(false);
    expect(isSetish(TestRecord())).toBe(false);
    expect(isSetish(new Map())).toBe(false);
    expect(isSetish([])).toBe(false);
    expect(isSetish({})).toBe(false);
  });
});

describe('isListish', () => {
  it('returns false for undefined input', () => {
    expect(() => isListish()).not.toThrow();
    expect(isListish()).toBe(false);
  });

  it('returns true for Listish inputs', () => {
    expect(isListish(ImmList())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(isListish(new TestList())).toBe(true);
  });

  it('returns false for non-Listish inputs', () => {
    expect(isListish(ImmList())).toBe(true);
    expect(isListish(ImmSeq.Indexed())).toBe(false);
    expect(isListish(TestRecord())).toBe(false);
    expect(isListish([])).toBe(false);
    expect(isListish({})).toBe(false);
  });
});

describe('isEntryIterable', () => {
  it('returns false for undefined input', () => {
    expect(() => isListish()).not.toThrow();
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
