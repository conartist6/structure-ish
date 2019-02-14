import expectMethodExists from './expect-method-exists';

export default function expectMethodsExist(structure, methodKeys) {
  for (const methodKey of methodKeys) {
    expectMethodExists(structure, methodKey);
  }
}
