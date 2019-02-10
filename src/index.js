function isImmutableStructurish(shape) {
  return shape['@@__IMMUTABLE_ITERABLE__@@'];
}

function isImmutableConcrete(shape) {
  return shape['@@__IMMUTABLE_ITERABLE__@@'] && !shape['@@__IMMUTABLE_SEQ__@@'];
}

function isImmutableSequence(shape) {
  return shape['@@__IMMUTABLE_SEQUENCE__@@'];
}

function isImmutableKeyed(shape) {
  return shape['@@__IMMUTABLE_KEYED__@@'];
}

function isImmutableMap(shape) {
  return shape['@@__IMMUTABLE_KEYED__@@'] && !shape['@@__IMMUTABLE_SEQ__@@'];
}

function isImmutableSet(shape) {
  return (
    shape['@@__IMMUTABLE_ITERABLE__@@'] &&
    !shape['@@__IMMUTABLE_SEQ__@@'] &&
    !shape['@@__IMMUTABLE_KEYED__@@'] &&
    !shape['@@__IMMUTABLE_INDEXED__@@']
  );
}

function isImmutableList(shape) {
  return shape['@@__IMMUTABLE_INDEXED__@@'] && !shape['@@__IMMUTABLE_SEQ__@@'];
}

export const ConcreteStructure = Symbol.for('structure-ish.protocol.concrete-structure');
export const Structure = Symbol.for('structure-ish.protocol.structure');
export const KeyedMethods = Symbol.for('structure-ish.prototcol.get-set');
export const SetMethods = Symbol.for('structure-ish.protocol.add');
export const EntryIterable = Symbol.for('structure-ish.protocol.entry-iterable');

export function isStructure(shape) {
  return !!(
    shape &&
    (shape instanceof Map ||
      shape instanceof Set ||
      Array.isArray(shape) ||
      shape[Structure] ||
      isImmutableStructurish(shape))
  );
}

export function isKeyedStructure(shape) {
  return !!(
    shape &&
    ((shape[EntryIterable] && shape[KeyedMethods] && shape[Structure]) || shape instanceof Map || isImmutableKeyed(shape))
  );
}

export function isConcreteStructure(shape) {
  return !!(
    shape &&
    (shape instanceof Map ||
      shape instanceof Set ||
      (shape[ConcreteStructure] && shape[Structure]) ||
      isImmutableConcrete(shape))
  );
}

export function isMapish(shape) {
  return !!(
    shape &&
    ((shape[KeyedMethods] && shape[EntryIterable] && shape[ConcreteStructure] && shape[Structure]) ||
      shape instanceof Map ||
      isImmutableMap(shape))
  );
}

export function isSetish(shape) {
  return !!(
    shape &&
    ((shape[SetMethods] && shape[ConcreteStructure] && shape[Structure]) ||
      shape instanceof Set ||
      isImmutableSet(shape))
  );
}

export function isListish(shape) {
  return !!(
    shape &&
    ((shape[KeyedMethods] && !shape[EntryIterable] && shape[ConcreteStructure] && shape[Structure]) ||
      isImmutableList(shape))
  );
}

export function isEntryIterable(shape) {
  return !!(
    shape &&
    (shape[EntryIterable] ||
      shape instanceof Map ||
      isImmutableKeyed(shape))
  );
}
