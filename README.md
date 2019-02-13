# Structure-ish

Structure-ish provides data interoperability through core protocols for es6 data storage objects. By using structurish you can declare, for example, that your object (`obj`) implements the `KeyedMethods` protocol. This means that doing `obj.set(key, value)` followed by `obj.get(key)` will result in `value`. It is impossible to g

Structure-ish is prinicpally targeted at libraries which need to consume data structures passed to them from the outside. It allows them to understand what assumptions are safe to make, so that APIs can be designed which can natively interact with a multitude of differe data structures.

[![Build Status](https://travis-ci.org/conartist6/structure-ish.svg?branch=master)](https://travis-ci.org/conartist6/structure-ish)
[![npm version](https://img.shields.io/npm/v/structure-ish.svg)](https://www.npmjs.com/package/structure-ish)

## Usage

To use structure-ish, you must have a working implementation of es6 symbols. If you need to support browsers such as IE11 which do not support symbols, it is your responsibiltiy to set up the relevant parts of corejs, including the Symbol constructor and the well-known-symbol `Symbol.iterator`.

Install with `npm install structure-ish` or `yarn add structure-ish`.

Also note that structure-ish expects to be minified. When `NODE_ENV === 'production'`, static analysis should remove the consistency checks implemented to help eliminate bugs.

## The Structure-ish API

- `isStructure(shape)` Returns true if `shape` is iterable, and additionally has `keys`, `values`, and `entries` iterators and a `forEach(value, key)` method.
- `hasKeyedMethods(shape)` Returns true if `shape` has `get`, `set`, `has`, and `delete`, methods, as well as a `size` property. These methods may be expected to have the same API and behavior that they would for an es6 Map.
- `hasSetMethods(shape)` Returns true if `shape` has `add`, `has`, and `delete`, methods, as well as a `size` property. These methods may be expected to have the same API and behavior that they would for an es6 Set.
- `isImmutable(shape)` Returns true if `shape` has mutator methods which must be understood to return a modified copy of `shape`.
- `isEntryIterable(shape)` Returns true if the default iterator for `shape` can be expected to yield `[key, value]` pairs. If `Structure` is also defined, the `entries` iterator should yield the same items as the default iterator, and the `keys` and `values` iterators should yield the equivalent of `Array.from(obj).map(([key,]) => key)` and `Array.from(obj).map(([, value]) => value)` respectively.
- `isMapish(shape)` Returns true if `shape` implements the es6 `Map` API by being a structure, an entry iterable, and having keyed methods.
- `isSetish(shape)` Returns true if `shape` implements the es6 `Set` API by being a structure with set methods.
- `isListish(shape)` Returns true if `shape` looks like a List, meaning a structure with keyed methods.

## Creating New Types of Structures

If you can, the easiest way to create a new type of structure is to subclass `Map`, `Set`, or `Array`. At the moment however this cannot be done if you need to support IE11, as it cannot even be transpiled correctly.

Therefore this library exports Symbols, which if incorporated into a class will cause it to be treated as a structure by structure-ish.

These symbols imply things about how certain other methods will behave. To see what behavior is implied, please see the method definitions above. Make sure you fully implement the expected behavior. The methods will do their best to let you know if they find entire methods missing from the protocol you purport to support, but they cannot do more than that in terms of verifying expected runtime behavior.

The following are the symbols exported:

- `Structure`: When defined, causes `isStructure` to return true (or throw an error).
- `KeyedMethods`: When defined, causes `hasKeyedMethods` to return true (or throw an error). Note that it is implied that each key can store only a single value, such that successive sets for the same key overwrite values, as happens in a `Map`.
- `SetMethods`: When defined, causes `hasSetMethods` to return true (or throw an error). Note that it is implied that each value can appear only once, such that `add(value)` is a no-op if the structure `has(value)`, as happens in a `Set`.
- `EntryIterable`: When defined, causes `isEntryIterable` to return true (or throw an error).
- `Immutable`: When defined, causes `isImmutable` to return true.

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
  [Structure]() {} // Note that these could also be defined as class properties
  [EntryIterable]() {}
  [KeyedMethods]() {}
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

**Question**: Are typed arrays structures? Uint8Array, for example.

They could be considered structures but for reasons of performance they are not.
