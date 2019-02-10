module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-typescript', { allExtensions: true }],
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
      ],
    },
  },
};
