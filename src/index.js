function isImmutableJsStructure(shape) {
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

export const Structure = Symbol.for('structure-ish.prototcol.structure');
export const KeyedMethods = Symbol.for('structure-ish.prototcol.get-set');
export const SetMethods = Symbol.for('structure-ish.protocol.add');
export const Immutable = Symbol.for('structure-ish.protocol.immutable');
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
        isImmutableJsStructure(shape))
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
        isImmutableJsMap(shape) ||
        isImmutableJsList(shape))
    ) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateHasKeyedMethods(shape)
  );
}

function checkHasSetMethods(shape) {}

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
    !!(shape && (shape[SetMethods] || shape instanceof Set || isImmutableJsSet(shape))) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateHasSetMethods(shape)
  );
}

function validateIsImmutable(shape) {
  if (shape) {
    if (!hasSetMethods(shape) && !hasKeyedMethods(shape)) {
      throw new Error(
        'Object with [Immutable] property must also have [SetMethods] or [KeyedMethods]',
      );
    }
    if (shape[SetMethods]) {
      validateHasSetMethods(shape);
    }
    if (shape[KeyedMethods]) {
      validateHasKeyedMethods(shape);
    }
  }
  return true;
}

export function isImmutable(shape) {
  return (
    !!(shape && (shape[Immutable] || isImmutableJsConcrete(shape))) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateIsImmutable(shape)
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
        isImmutableJsMap(shape))
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
      ((shape[SetMethods] && shape[Structure]) || shape instanceof Set || isImmutableJsSet(shape))
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
      ((shape[KeyedMethods] && !shape[EntryIterable] && shape[Structure]) ||
        isImmutableJsList(shape))
    ) &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    validateIsListish(shape)
  );
}
