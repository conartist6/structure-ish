# Structure-ish

Structure-ish provides data interoperability through core protocols for es6 data storage objects. By using structurish you can declare, for example, that your object (`obj`) implements the `KeyedMethods` protocol. This means that doing `obj.set(key, value)` followed by `obj.get(key)` will result in `value`. While you may be able to check that methods exist, without structure-ish you will have no assurances as to their behavior.

Structure-ish is prinicpally targeted at libraries which need to consume data structures passed to them from the outside. It allows them to understand what assumptions are safe to make, so that APIs can be designed which can natively interact with a multitude of differe data structures.

[![Build Status](https://travis-ci.org/conartist6/structure-ish.svg?branch=master)](https://travis-ci.org/conartist6/structure-ish)
[![npm version](https://img.shields.io/npm/v/structure-ish.svg)](https://www.npmjs.com/package/structure-ish)

## Usage

To use structure-ish, you must have a working implementation of es6 symbols. If you need to support browsers such as IE11 which do not support symbols, it is your responsibiltiy to set up the relevant parts of corejs, including the Symbol constructor and the well-known-symbol `Symbol.iterator`.

Install with `npm install structure-ish` or `yarn add structure-ish`.

Also note that structure-ish expects to be minified. When `NODE_ENV === 'production'`, static analysis should remove the consistency checks implemented to help eliminate bugs.

## The Structure-ish API

Please note: while you can be confident after using this API that certain methods exist and take certain parameters, you must not assume that they do not take other parameters, because many implementations will! You must be careful not to pass more parameters than necessary, assuming the extras will be discarded.

- `isSequence(shape)` Returns true if `shape` is iterable, and additionally has `keys`, `values`, and `entries` iterators and a `forEach(value, key)` method.
- `hasKeyedAccessors(shape)` Returns true if `shape` has `get` and `has` methods, as well as a `size` property.
- `hasSetAccessors(shape)` Returns true if `shape` has a `has` method and a `size` property.
- `isEntryIterable(shape)` Returns true if the default iterator for `shape` can be expected to yield `[key, value]` pairs. If `Structure` is also defined, the `entries` iterator should yield the same items as the default iterator, and the `keys` and `values` iterators should yield the equivalent of `Array.from(obj).map(([key,]) => key)` and `Array.from(obj).map(([, value]) => value)` respectively.

## Creating New Types of Structures

If you can, the easiest way to create a new type of structure is to subclass `Map`, `Set`, or `Array`. At the moment however this cannot be done if you need to support IE11, as it cannot even be transpiled correctly.

Therefore this library exports Symbols, which if incorporated into a class will cause it to be treated as a structure by structure-ish.

These symbols imply things about how certain other methods will behave. It is beyond the scope of this README to explain the complete set of expectations that are implied, yet it is extermely important that that set of expectations is formalized, so for this purpose I have created tests. You can find in `src/protocol-tests` directory. They can be used as a reference material or, even better, they can be imported directly into your unit tests and executed against your structure implemenation. I cannot recommend this approach enough, and will be readily available to support any issues you should have integrating structure-ish tests with an existing unit testing setup.

The following symbols are exported:

- `Sequence`: When defined, causes `isSequence` to return true (or throw an error).
- `KeyedAccessors`: When defined, causes `hasKeyedAccessors` to return true (or throw an error).
- `SetAccessors`: When defined, causes `hasSetAccessors` to return true (or throw an error).
- `EntryIterable`: When defined, causes `isEntryIterable` to return true (or throw an error).

Here's an example in which the correct symbols are applied to create a custom Map class:

```js
import {
  Sequence,
  KeyedAccessors,
  EntryIterable,
  isSequence,
  isEntryIterable,
  hasKeyedAccessors,
} from 'structure-ish';

class MyMap {
  // has, get, set, keys, values, entries and forEach implementations go here
  [Symbol.iterator]() {
    return this.entries();
  }

  // Only these methods interact with structure-ish
  [Sequence]() {} // Note that these could also be defined as class properties
  [EntryIterable]() {}
  [KeyedAccessors]() {}
}

isSequence(new MyMap()); // true
isEntryIterable(new MyMap()); // true
hasKeyedAccessors(new MyMap()); // true
```

This is a fair bit of boilerplate, but fortunately it should be reasonable to encapsulate the
boilerplate in a base class and reuse it.

## FAQs

**Question**: I assumed that `hasKeyedMethods(Immutable.Seq.Keyed())`, (or similar) would be true, why isn't it?

Because the `get` and `set` methods probably won't have the performance characteristics you would expect, and the `size` property might not exist at all.

**Question**: Are typed arrays structures? Uint8Array, for example.

They could be considered structures but for reasons of performance they are not.
