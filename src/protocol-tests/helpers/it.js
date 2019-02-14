let it;

if (typeof global !== undefined && global.it) {
  it = global.it;
} else if (typeof window !== undefined && window.it) {
  it = window.it;
} else {
  it = function(name, test) {
    test()
  }
}

export default it;
