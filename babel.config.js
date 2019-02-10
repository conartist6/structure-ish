module.exports = {
  plugins: [
    '@babel/plugin-transform-modules-commonjs'
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-typescript', { allExtensions: true }],
        ['@babel/preset-env', { modules: 'commonjs' }],
      ],
    },
  },
};
