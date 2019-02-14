import testStructure from '..';

function constructOneTwoThree() {
  return new Map([[9, 1], [8, 2], [7, 3]]);
}

testStructure(constructOneTwoThree)
