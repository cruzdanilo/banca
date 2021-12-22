/** @type {import('eslint').Linter.Config} */
module.exports = {
  parserOptions: { project: 'tsconfig.tools.json' },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'no-continue': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'eslint-comments/no-unused-disable': 'error',
    '@typescript-eslint/triple-slash-reference': 'off',
  },
  overrides: [
    {
      files: ['**/*.{config,test}.ts', 'utils/**/*.ts', '**/.*rc.js'],
      extends: ['plugin:node/recommended'],
      rules: {
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': ['error', { tryExtensions: ['.ts', '.js', '.json', '.node'] }],
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules', 'dynamicImport'] }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};
