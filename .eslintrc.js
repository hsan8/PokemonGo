module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: ['airbnb/base', 'plugin:node/recommended'],
  rules: {
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: 'never'
      }
    ],
    'linebreak-style': 0,
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-new': 0,
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ]
  }
};
