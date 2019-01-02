function isImmutableStructurish(shape) {
  return shape['@@__IMMUTABLE_ITERABLE__@@'];
}

function isImmutableConcrete(shape) {
  return shape['@@__IMMUTABLE_ITERABLE__@@'] && !shape['@@__IMMUTABLE_SEQUENCE__@@'];
}

function isImmutableSequence(shape) {
  return shape['@@__IMMUTABLE_SEQUENCE__@@'];
}

function isImmutableMap(shape) {
  return shape['@@__IMMUTABLE_KEYED__@@'] && !shape['@@__IMMUTABLE_SEQUENCE__@@'];
}

function isImmutableSet(shape) {
  return (
    shape['@@__IMMUTABLE_ITERABLE__@@'] &&
    !shape['@@__IMMUTABLE_SEQUENCE__@@'] &&
    !shape['@@__IMMUTABLE_KEYED__@@'] &&
    !shape['@@__IMMUTABLE_INDEXED__@@']
  );
}

function isImmutableList(shape) {
  return shape['@@__IMMUTABLE_INDEXED__@@'] && !shape['@@__IMMUTABLE_SEQUENCE__@@'];
}

export const ConcreteStructure = Symbol('Concrete Structure');
export const Structure = Symbol('Structure');
export const Keyed = Symbol('Keyed');
export const Setish = Symbol('Set-ish');

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
    ((shape[Keyed] && shape[Structure]) || shape instanceof Map || isImmutableMap(shape))
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
    ((shape[Keyed] && shape[ConcreteStructure] && shape[Structure]) ||
      shape instanceof Map ||
      isImmutableMap(shape))
  );
}

export function isSetish(shape) {
  return !!(
    shape &&
    ((shape[Setish] && shape[ConcreteStructure] && shape[Structure]) ||
      shape instanceof Set ||
      isImmutableSet(shape))
  );
}

export function isListish(shape) {
  return !!(
    shape &&
    ((shape[ConcreteStructure] && !shape[Setish] && !shape[Keyed] && shape[Structure]) ||
      isImmutableList(shape))
  );
}
