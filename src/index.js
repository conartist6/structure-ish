function isImmutableStructure(shape) {
  return shape['@@__IMMUTABLE_ITERABLE__@@'];
}

function isImmutableKeyed(shape) {
  return shape['@@__IMMUTABLE_KEYED__@@'];
}

function isImmutableIndexed(shape) {
  return shape['@@__IMMUTABLE_INDEXED__@@'];
}

function isImmutableDuplicated(shape) {
  return (
    shape['@@__IMMUTABLE_ITERABLE__@@'] &&
    !shape['@@__IMMUTABLE_KEYED__@@'] &&
    !shape['@@__IMMUTABLE_INDEXED__@@']
  );
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

export const Structure = Symbol.for('structure-ish.prototcol.structure');
export const KeyedMethods = Symbol.for('structure-ish.prototcol.get-set');
export const SetMethods = Symbol.for('structure-ish.protocol.add');
export const EntryIterable = Symbol.for('structure-ish.protocol.entry-iterable');

export function isStructure(shape) {
  return !!(
    shape && shape[Symbol.iterator] &&
    (shape instanceof Map ||
      shape instanceof Set ||
      Array.isArray(shape) ||
      (shape[Structure]) ||
      isImmutableStructure(shape))
  );
}

export function isMapish(shape) {
  return !!(
    shape && shape[Symbol.iterator] &&
    ((shape[KeyedMethods] && shape[EntryIterable] && shape[Structure]) ||
      shape instanceof Map ||
      isImmutableMap(shape))
  );
}

export function isSetish(shape) {
  return !!(
    shape && shape[Symbol.iterator] &&
    ((shape[SetMethods] && shape[Structure]) ||
      shape instanceof Set ||
      isImmutableSet(shape))
  );
}

export function isListish(shape) {
  return !!(
    shape && shape[Symbol.iterator] &&
    ((shape[KeyedMethods] && !shape[EntryIterable] && shape[Structure]) ||
      isImmutableList(shape))
  );
}

export function hasKeyedMethods(shape) {
  return !!(
    shape && (shape[KeyedMethods] || shape instanceof Map || isImmutableKeyed(shape) || isImmutableIndexed(shape))
    )
}

export function hasSetMethods(shape) {
  return !!(
    shape && (shape[SetMethods] || shape instanceof Set || isImmutableDuplicated(shape))
    )
}

export function isEntryIterable(shape) {
  return !!(
    shape &&
    shape[Symbol.iterator] &&
    (shape[EntryIterable] ||
      shape instanceof Map ||
      isImmutableKeyed(shape))
  );
}
