import {
  List as ImmList,
  Map as ImmMap,
  Set as ImmSet,
  Seq as ImmSeq,
  Record as ImmRecordFactory,
} from 'immutable';

import {
  isStructure,
  isKeyedStructure,
  isConcreteStructure,
  isMapish,
  isSetish,
  isListish,
  isEntryIterable,
  Structure,
  KeyedMethods,
  EntryIterable,
  ConcreteStructure,
  SetMethods,
} from '..';

const TestRecord = ImmRecordFactory({ foo: null });

class TestStructure {
  [Structure]() {
    return true;
  }
}

class TestKeyedStructure {
  [Structure]() {
    return true;
  }
  [KeyedMethods]() {
    return true;
  }
  [EntryIterable]() {
    return true;
  }
}

class TestConcreteStructure {
  [Structure]() {
    return true;
  }
  [ConcreteStructure]() {
    return true;
  }
}

class TestMap {
  [Structure]() {
    return true;
  }
  [ConcreteStructure]() {
    return true;
  }
  [KeyedMethods]() {
    return true;
  }
  [EntryIterable]() {
    return true;
  }
}

class TestSet {
  [Structure]() {
    return true;
  }
  [ConcreteStructure]() {
    return true;
  }
  [SetMethods]() {
    return true;
  }
}

class TestList {
  [Structure]() {
    return true;
  }
  [ConcreteStructure]() {
    return true;
  }
  [KeyedMethods]() {
    return true;
  }
}

class TestEntryIterable {
  [EntryIterable]() {
    return true;
  }
}

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

describe('isKeyedStructure', () => {
  it('returns false for undefined input', () => {
    expect(() => isKeyedStructure()).not.toThrow();
    expect(isKeyedStructure()).toBe(false);
  });

  it('returns true for immutable Keyed collections', () => {
    expect(isKeyedStructure(ImmMap())).toBe(true);
    expect(isKeyedStructure(ImmSeq.Keyed())).toBe(true);
  });

  it('returns true for Maps', () => {
    expect(isKeyedStructure(new Map())).toBe(true);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(isKeyedStructure(new TestKeyedStructure())).toBe(true);
    expect(isKeyedStructure(new TestMap())).toBe(true);
  });

  it('returns false for non-keyed-structure inputs', () => {
    expect(isKeyedStructure(TestRecord())).toBe(false);
    expect(isKeyedStructure(Array)).toBe(false);
    expect(isKeyedStructure({})).toBe(false);
    expect(isKeyedStructure(new Set())).toBe(false);
    expect(isKeyedStructure(new TestList())).toBe(false);
    expect(isKeyedStructure(new TestSet())).toBe(false);
  });
});

describe('isConcreteStructure', () => {
  it('returns false for undefined input', () => {
    expect(() => isConcreteStructure()).not.toThrow();
    expect(isConcreteStructure()).toBe(false);
  });

  it('returns true for immutable concrete collections', () => {
    expect(isConcreteStructure(ImmMap())).toBe(true);
    expect(isConcreteStructure(ImmList())).toBe(true);
    expect(isConcreteStructure(ImmSet())).toBe(true);
  });

  it('returns false for immutable sequences', () => {
    expect(isConcreteStructure(ImmSeq.Keyed())).toBe(false);
    expect(isConcreteStructure(ImmSeq.Indexed())).toBe(false);
    expect(isConcreteStructure(ImmSeq.Set())).toBe(false);
  });

  it('returns true for built in types', () => {
    expect(isConcreteStructure(new Map())).toBe(true);
    expect(isConcreteStructure(new Set())).toBe(true);
  });

  it('returns false for Arrays', () => {
    expect(isConcreteStructure([])).toBe(false);
  });

  it('returns true for classes with the proper symbols defined', () => {
    expect(isConcreteStructure(new TestConcreteStructure())).toBe(true);
    expect(isConcreteStructure(new TestMap())).toBe(true);
    expect(isConcreteStructure(new TestSet())).toBe(true);
    expect(isConcreteStructure(new TestList())).toBe(true);
  });

  it('returns false for classes without the Concrete symbol defind', () => {
    expect(isConcreteStructure(new TestStructure())).toBe(false);
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
