declare function isStructure(shape?: any): boolean;
declare function hasKeyedMethods(shape?: any): boolean;
declare function hasSetMethods(shape?: any): boolean;
declare function isImmutable(shape?: any): boolean;
declare function isEntryIterable(shape?: any): boolean;
declare function isListish(shape?: any): boolean;
declare function isMapish(shape?: any): boolean;
declare function isSetish(shape?: any): boolean;

declare const Structure: symbol;
declare const KeyedMethods: symbol;
declare const SetMethods: symbol;
declare const Immutable: symbol;
declare const EntryIterable: symbol;

export {
  isStructure,
  hasKeyedMethods,
  hasSetMethods,
  isImmutable,
  isEntryIterable,
  isListish,
  isMapish,
  isSetish,
  Structure,
  KeyedMethods,
  SetMethods,
  Immutable,
  EntryIterable,
};
