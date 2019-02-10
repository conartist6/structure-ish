# Structure-ish

Structure-ish exists in order to help es6 code authors reflectively identify and distinguish data structures. A structure is considered to be any object which provides transparent access to a single collection of arbitrary stored data.

The goal of structurish is to capture the muliple ways this critical reflective data is currently exposed, to facilitate multiple data structures libraries playing nicely with each other (and with native types), and to promote a long term extensible solution (protocol Symbols) which if broadly adopted would eventually make it unnecessary.

## Usage

To use structure-ish, you must have a working implementation of es6 symbols. If you need to support browsers such as IE11 which do not support symbols, it is your responsibiltiy to set up the relevant parts of corejs, including the Symbol constructor and the well-known-symbol `Symbol.iterator`.

Install with `npm install structure-ish` or `yarn add structure-ish`.

Also note that structure-ish expects to be minified. When `NODE_ENV === 'production'`, static analysis should remove the consistency checks implemented to help eliminate bugs and inconsistencies during dev and test.

## The Structure API

All structures are required to provide the following basic API:

- Four methods which return iterators: `[Symbol.iterator]()`, `keys()`, `values()`, and `entries()`
- A `forEach` method of the signature `forEach(value, key)` (and potentially a third argument, the
  structure)

Additionally structures which are concrete provide random access/update to values via the following API:

- A `has(key)` method
- Either `get(key)` and `set(key, value)`, or `has(key)` and `add(key)`
- A `size` property returning the number of entries stored

If you're already familiar with es6, you'll notice that I've basically just described the APIs provided by the `Map` and `Set` builtin classes. Also this definition means that Array is a structure, but **not** technically a concrete structure.

** NOTE ** Typed Arrays, e.g. `UInt8Array` fit the definition of structures, but are not considered so for the purposes of this library.

## Additional Terminology

- A _Sequence_ is a structure which is not concrete (and not an Array).
- A _List_ stores indexed data and exposes it through the concrete structure API. There is no native List implementation.

## The Structure-ish API

The most important caveat is that the structurish API is not duck typed. It requires structures to be positively identified.

- `isStructure` Returns true if the object or instance is iterable, and additionally has `keys`, `values`, and `entries` iterators and a `forEach(value, key)` method.
- `hasKeyedMethods` Returns true if it is safe to use the `get`, `set`, `has`, and `delete`, methods, as well as the `size` property.
- `hasSetMethods` Returns true if it is safe to use the `add`, `has`, and `delete`, methods, as well as the `size` property.
- `isEntryIterable` Denotes that the default iterator for this object can be expected to yield `[key, value]` pairs. If `Structure` is also defined, the `entries` iterator should yield the same items as the default iterator, and the `keys` and `values` iterators should yield the equivalent of `Array.from(obj).map(([key,]) => key)` and `Array.from(obj).map(([, value]) => value)` respectively.
- `isMapish` Returns true if its argument implements the es6 `Map` API by being a structure, an entry iterable, and having keyed methods.
- `isSetish` Returns true if its argument implements the es6 `Set` API by being a structure with set methods.
- `isListish` Returns true if its argument looks like a List, meaning a structure with keyed methods.

## Creating New Types of Structures

If you can, the easiest way to create a new type of structure is to subclass `Map`, `Set`, or `Array`. At the moment however this cannot be done if you need to support IE11, as it cannot even be transpiled correctly.

Therefore this library exports Symbols, which if incorporated into a class will cause it to be treated as a structure by structure-ish.

The following symbols are exported:

Note that where it is specified that methods may throw an error, they will do so when the declared symbol suggests that certain methods will exist but they are not present. These checks only run when `process.env.NODE_ENV !== 'production'`.

- `Structure`: When defined, this symbol causes `isStructure` to return true (or throw an error).
- `KeyedMethods`: When defined, this symbol causes `hasKeyedMethods` to return true (or throw an error).
- `SetMethods`: When defined, this symbol causes `hasSetMethods` to return true (or throw an error).
- `EntryIterable`: When defined, this symbol causes `isEntryIterable` to return true (or throw an error).

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

## FAQs

**Question**: I assumed that `hasKeyedMethods(Immutable.Seq.Keyed())`, (or similar) would be true, why isn't it?
Because the `get` and `set` methods probably won't have the performance characteristics you would expect, and the `size` property might not exist at all.
