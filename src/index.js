var isProd =
  typeof process !== 'undefined' &&
  ('BABEL_ENV' in process.env ? process.env.BABEL_ENV : process.env.NODE_ENV) === 'production';

function isImmutableJsCollection(shape) {
  return shape['@@__IMMUTABLE_ITERABLE__@@'];
}

function isImmutableJsConcrete(shape) {
  return shape['@@__IMMUTABLE_ITERABLE__@@'] && !shape['@@__IMMUTABLE_SEQ__@@'];
}

function isImmutableJsKeyed(shape) {
  return shape['@@__IMMUTABLE_KEYED__@@'];
}

function isImmutableJsIndexed(shape) {
  return shape['@@__IMMUTABLE_INDEXED__@@'];
}

function isImmutableJsDuplicated(shape) {
  return (
    shape['@@__IMMUTABLE_ITERABLE__@@'] &&
    !shape['@@__IMMUTABLE_KEYED__@@'] &&
    !shape['@@__IMMUTABLE_INDEXED__@@']
  );
}

function isImmutableJsMap(shape) {
  return shape['@@__IMMUTABLE_KEYED__@@'] && !shape['@@__IMMUTABLE_SEQ__@@'];
}

function isImmutableJsSet(shape) {
  return (
    shape['@@__IMMUTABLE_ITERABLE__@@'] &&
    !shape['@@__IMMUTABLE_SEQ__@@'] &&
    !shape['@@__IMMUTABLE_KEYED__@@'] &&
    !shape['@@__IMMUTABLE_INDEXED__@@']
  );
}

function isImmutableJsList(shape) {
  return shape['@@__IMMUTABLE_INDEXED__@@'] && !shape['@@__IMMUTABLE_SEQ__@@'];
}

export const Sequence = Symbol.for('structure-ish.prototcol.sequence');
export const KeyedAccessors = Symbol.for('structure-ish.prototcol.get-set');
export const SetAccessors = Symbol.for('structure-ish.protocol.add');
export const EntryIterable = Symbol.for('structure-ish.protocol.entry-iterable');

function validateIsSequence(shape) {
  if (shape) {
    if (typeof shape[Symbol.iterator] !== 'function') {
      throw new Error('Object with [Sequence] property must have [Symbol.iterator]() method');
    }
    if (typeof shape.keys !== 'function') {
      throw new Error('Object with [Sequence] property must have keys() method');
    }
    if (typeof shape.values !== 'function') {
      throw new Error('Object with [Sequence] property must have values() method');
    }
    if (typeof shape.entries !== 'function') {
      throw new Error('Object with [Sequence] property must have entries() method');
    }
    if (typeof shape.forEach !== 'function') {
      throw new Error('Object with [Sequence] property must have forEach() method');
    }
  }
  return true;
}

export function isSequence(shape) {
  return (
    !!(
      shape &&
      (shape instanceof Map ||
        shape instanceof Set ||
        Array.isArray(shape) ||
        shape[Sequence] ||
        isImmutableJsCollection(shape))
    ) &&
    (isProd || validateIsSequence(shape))
  );
}

export function validateHasKeyedAccessors(shape) {
  if (shape) {
    if (typeof shape.get !== 'function') {
      throw new Error('Object with [KeyedAccessors] property must have get() method');
    }
    if (typeof shape.has !== 'function') {
      throw new Error('Object with [KeyedAccessors] property must have has() method');
    }
    if (typeof shape.size !== 'number') {
      throw new Error('Object with [KeyedAccessors] property must have a numeric size property');
    }
  }
  return true;
}

export function hasKeyedAccessors(shape) {
  debugger;
  return (
    !!(
      shape &&
      (shape[KeyedAccessors] ||
        shape instanceof Map ||
        isImmutableJsMap(shape) ||
        isImmutableJsList(shape))
    ) &&
    (isProd || validateHasKeyedAccessors(shape))
  );
}

function checkHasSetAccessors(shape) {}

export function validateHasSetAccessors(shape) {
  if (shape) {
    if (typeof shape.has !== 'function') {
      throw new Error('Object with [SetAccessors] property must have has() method');
    }
    if (typeof shape.size !== 'number') {
      throw new Error('Object with [SetAccessors] property must have a numeric size property');
    }
  }
  return true;
}

export function hasSetAccessors(shape) {
  return (
    !!(shape && (shape[SetAccessors] || shape instanceof Set || isImmutableJsSet(shape))) &&
    (isProd || validateHasSetAccessors(shape))
  );
}

function validateIsEntryIterable(shape) {
  if (shape) {
    if (typeof shape[Symbol.iterator] !== 'function') {
      throw new Error('Object with [EntryIterable] property must have [Symbol.iterator]() method');
    }
  }
  return true;
}

export function isEntryIterable(shape) {
  return (
    !!(shape && (shape[EntryIterable] || shape instanceof Map || isImmutableJsKeyed(shape))) &&
    (isProd || validateIsEntryIterable(shape))
  );
}
