export default function expectMethodExists(structure, methodKey) {
  if (!(methodKey in structure)) {
    throw new Error(`Method ${methodKey} is required, but was not found`)
  }
}
