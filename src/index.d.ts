declare function isSequence(shape?: any): boolean;
declare function hasKeyedAccessors(shape?: any): boolean;
declare function hasSetAccessors(shape?: any): boolean;
declare function isEntryIterable(shape?: any): boolean;

declare const Sequence: symbol;
declare const KeyedAccessors: symbol;
declare const SetAccessors: symbol;
declare const EntryIterable: symbol;

export {
  isSequence,
  hasKeyedAccessors,
  hasSetAccessors,
  isEntryIterable,
  Sequence,
  KeyedAccessors,
  SetAccessors,
  EntryIterable,
};
