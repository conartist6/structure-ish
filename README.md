# Structure-ish

Structure-ish provides core protocols for es6 data storage objects. By using structurish you can declare, for example, that your object (`obj`) implements the `KeyedMethods` protocol. This means that doing `obj.set(key, value)` followed by `obj.get(key)` will result in `value`. Without this library you may be able to check that methods exist with the names `get` and `set`, but the presence of a protocol symbol gives additional information about the behavior you can expect.

Protocol declaration and detection is critical to facilitate multiple data structure implementations playing nicely with each other (and playing nicely with native types), and to promote a long term extensible solution (protocol Symbols) which if broadly adopted would eventually make it unnecessary.

## Usage

To use structure-ish, you must have a working implementation of es6 symbols. If you need to support browsers such as IE11 which do not support symbols, it is your responsibiltiy to set up the relevant parts of corejs, including the Symbol constructor and the well-known-symbol `Symbol.iterator`.

Install with `npm install structure-ish` or `yarn add structure-ish`.

Also note that structure-ish expects to be minified. When `NODE_ENV === 'production'`, static analysis should remove the consistency checks implemented to help eliminate bugs and inconsistencies during dev and test.

## The Structure-ish API

The most important caveat is that the structurish API is not duck typed. It requires structures to be positively identified.

- `isStructure(shape)` Returns true if `shape` is iterable, and additionally has `keys`, `values`, and `entries` iterators and a `forEach(value, key)` method.
- `hasKeyedMethods(shape)` Returns true if `shape` has `get`, `set`, `has`, and `delete`, methods, as well as a `size` property.
- `hasSetMethods(shape)` Returns true if `shape` has `add`, `has`, and `delete`, methods, as well as a `size` property.
- `isEntryIterable(shape)` Returns true if the default iterator for `shape` can be expected to yield `[key, value]` pairs. If `Structure` is also defined, the `entries` iterator should yield the same items as the default iterator, and the `keys` and `values` iterators should yield the equivalent of `Array.from(obj).map(([key,]) => key)` and `Array.from(obj).map(([, value]) => value)` respectively.
- `isMapish(shape)` Returns true if `shape` implements the es6 `Map` API by being a structure, an entry iterable, and having keyed methods.
- `isSetish(shape)` Returns true if `shape` implements the es6 `Set` API by being a structure with set methods.
- `isListish(shape)` Returns true if `shape` looks like a List, meaning a structure with keyed methods.

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

**Question**: Are typed arrays structures? Uint8Array, for example.

They could be considered structures but for reasons of performance they are not.
