/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: { node: false },
  settings: { 'import/resolver': 'webpack' },
  parserOptions: { project: 'tsconfig.ecs.json' },
  overrides: [
    {
      files: ['**/.*rc.js'],
      parserOptions: { project: ['tsconfig.ecs.json', 'tsconfig.tools.json'] },
    },
  ],
};
