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

function validateIsStructure(shape) {
  if (shape) {
    if (typeof shape[Symbol.iterator] !== 'function') {
      throw new Error('Object with [Structure] property must have [Symbol.iterator]() method');
    }
    if (typeof shape.keys !== 'function') {
      throw new Error('Object with [Structure] property must have keys() method');
    }
    if (typeof shape.values !== 'function') {
      throw new Error('Object with [Structure] property must have values() method');
    }
    if (typeof shape.entries !== 'function') {
      throw new Error('Object with [Structure] property must have entries() method');
    }
  }
  return true;
}

export function isStructure(shape) {
  return (
    !!(
      shape &&
      (shape instanceof Map ||
        shape instanceof Set ||
        Array.isArray(shape) ||
        shape[Structure] ||
        isImmutableStructure(shape))
    ) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateIsStructure(shape)
  );
}

export function validateHasKeyedMethods(shape) {
  if (shape) {
    if (typeof shape.get !== 'function') {
      throw new Error('Object with [KeyedMethods] property must have get() method');
    }
    if (typeof shape.set !== 'function') {
      throw new Error('Object with [KeyedMethods] property must have set() method');
    }
    if (typeof shape.has !== 'function') {
      throw new Error('Object with [KeyedMethods] property must have has() method');
    }
    if (typeof shape.delete !== 'function') {
      throw new Error('Object with [KeyedMethods] property must have delete() method');
    }
    if (typeof shape.size !== 'number') {
      throw new Error('Object with [KeyedMethods] property must have a numeric size property');
    }
  }
  return true;
}

export function hasKeyedMethods(shape) {
  debugger;
  return (
    !!(
      shape &&
      (shape[KeyedMethods] ||
        shape instanceof Map ||
        isImmutableMap(shape) ||
        isImmutableList(shape))
    ) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateHasKeyedMethods(shape)
  );
}

export function validateHasSetMethods(shape) {
  if (shape) {
    if (typeof shape.add !== 'function') {
      throw new Error('Object with [SetMethods] property must have add() method');
    }
    if (typeof shape.has !== 'function') {
      throw new Error('Object with [SetMethods] property must have has() method');
    }
    if (typeof shape.delete !== 'function') {
      throw new Error('Object with [SetMethods] property must have delete() method');
    }
    if (typeof shape.size !== 'number') {
      throw new Error('Object with [SetMethods] property must have a numeric size property');
    }
  }
  return true;
}

export function hasSetMethods(shape) {
  return (
    !!(shape && (shape[SetMethods] || shape instanceof Set || isImmutableSet(shape))) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateHasSetMethods(shape)
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
    !!(shape && (shape[EntryIterable] || shape instanceof Map || isImmutableKeyed(shape))) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateIsEntryIterable(shape)
  );
}

function validateIsMapish(shape) {
  validateIsStructure(shape);
  validateIsEntryIterable(shape);
  validateHasKeyedMethods(shape);
  return true;
}

export function isMapish(shape) {
  return (
    !!(
      shape &&
      ((shape[KeyedMethods] && shape[EntryIterable] && shape[Structure]) ||
        shape instanceof Map ||
        isImmutableMap(shape))
    ) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateIsMapish(shape)
  );
}

function validateIsSetish(shape) {
  validateIsStructure(shape);
  validateHasSetMethods(shape);
  return true;
}

export function isSetish(shape) {
  return (
    !!(
      shape &&
      ((shape[SetMethods] && shape[Structure]) || shape instanceof Set || isImmutableSet(shape))
    ) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateIsSetish(shape)
  );
}

function validateIsListish(shape) {
  validateIsStructure(shape);
  validateHasKeyedMethods(shape);
  return true;
}

export function isListish(shape) {
  return (
    !!(
      shape &&
      ((shape[KeyedMethods] && !shape[EntryIterable] && shape[Structure]) || isImmutableList(shape))
    ) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateIsListish(shape)
  );
}
