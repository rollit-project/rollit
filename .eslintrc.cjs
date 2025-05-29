module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['vite.config.js'],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    curly: ['error', 'all'],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
