## Protocol tests

These test are here to help you verify that your hand-rolled data-structure has the basic behavior one would expect.

Here's a setup example.

```js
import { Sequence, EntryIterable, KeyedAccessors } from 'structure-ish'
import testStructure from 'structure-ish/protocol-tests'

class MyMap {
  constructor(iterable) {
    this._map = new Map(iterable);
  }

  keys() { return this._map.keys() }
  values() { return this._map.values() }
  entries() { return this._map.entries() }

  get(key) { return this._map.get(key) }
  has(key) { return this._map.has(key) }

  [Symbol.iterator]() { return this._map[Symbol.iterator]() }

  [Sequence]() {}
  [EntryIterable]() {}
  [KeyedAccessors]() {}
}

function constructOneTwoThree() {
  return new MyMap([[9, 1], [8, 2], [7, 3]]);
}

testStructure(constructOneTwoThree)
```
