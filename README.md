# Structure-ish

Structure-ish exists in order to help es6 code authors reflectively identify and distinguish data
structures. A structure is considered to be any object which provides transparent access to a single
collection of arbitrary stored data.

The goal of structurish is to capture the muliple ways this critical reflective data is currently
exposed, to facilitate multiple data structures libraries playing nicely with each other (and with
native types), and to promote a long term extensible solution (protocol Symbols) which if broadly
adopted would eventually make it unnecessary.

## The Structure API

All structures are required to provide the following basic API:

- Four methods which return iterators: `[Symbol.iterator]()`, `keys()`, `values()`, and `entries()`
- A `forEach` method of the signature `forEach(value, key)` (and potentially a third argument, the
  structure)

Additionally structures which are concrete provide random access/update to values via the following
API:

- A `has(key)` method
- Either `get(key)` and `set(key, value)`, or `has(key)` and `add(key)`
- A `size` property returning the number of entries stored

If you're already familiar with es6, you'll notice that I've basically just described the APIs
provided by the `Map` and `Set` builtin classes. Also this definition means that Array is a
structure, but **not** technically a concrete structure.

** NOTE ** Typed Arrays, e.g. `UInt8Array` fit the definition of structures, but are not considered
so for the purposes of this library.

## Additional Terminology

- A _Sequence_ is a structure which is not concrete (and not an Array).
- A _List_ stores indexed data and exposes it through the concrete structure API. There is no native
  List implementation.

## The Structure-ish API

The most important caveat is that the structurish API is not duck typed. It requires structures to
be positively identified.

- `isStructure` Returns true if its argument is structure
- `isKeyedStructure` Returns true if its argument is a structure whose iterator returns
  `[key, value]` pairs
- `isConcreteStructure` Returns true if its argument is a concrete structure
- `isMapish` Returns true if its argument implements the es6 `Map` API
- `isSetish` Returns true if its argument implements the es6 `Set` API
- `isListish` Returns true if its argument looks like a List (see terminology above)

## Creating New Types of Structures

If you can, the easiest way to create a new type of structure is to subclass `Map`, `Set`, or
`Array`. At the moment however this cannot be done if you need to support IE11, as it cannot even be
transpiled correctly.

Therefore this library exports Symbols, which if incorporated into a class will cause it to be
treated as a structure by structure-ish.

The following symbols are exported:

- `Structure`: When defined, denotes that the object or instance is iterable, and additionally has `keys`, `values`, and `entries` iterators and a `forEach(value, key)` method.
- `KeyedMethods`: Denotes that the `get`, `set`, `has`, `remove`, methods are available, as well as the `size` property.
- `SetMethods`: Denotes that `add`, `has`, and `remove` methods are available, as well as the `size` property.
- `EntryIterable`: Denotes that the default iterator for this object can be expected to yield `[key, value]` pairs. If `Structure` is also defined, the `entries` iterator should yield the same items as the default iterator, and the `keys` and `values` iterators should yield the equivalent of `Array.from(obj).map(([key,]) => key)` and `Array.from(obj).map(([, value]) => value)` respectively.

Here's an example in which the correct symbols are applied to create a custom Map class:

```js
import {
  Structure,
  KeyedMethods,
  EntryIterable,
  isStructure,
  isMapish,
  isEntryIterable,
} from 'structure-ish';

class MyMap {
  // has, get, set, keys, values, entries and forEach implementations go here
  [Symbol.iterator]() {
    return this.entries();
  }

  // Only these methods interact with structure-ish
  [Structure]() {
    return true;
  }
  [EntryIterable]() {
    return true;
  }
  [KeyedMethods]() {
    return true;
  }
}

isStructure(new MyMap()); // true
isMapish(new MyMap()); // true
isEntryIterable(new MyMap()); // true
```

This is a fair bit of boilerplate, but fortunately it should be reasonable to encapsulate the
boilerplate in a base class and reuse it.
