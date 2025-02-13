module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks', 'react-memo', 'unused-imports', 'i18next'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:i18next/recommended'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'eol-last': ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-trailing-spaces': ['error'],
    semi: 'off',
    'prefer-const': ['error'],
    'no-var': 'error',
    quotes: ['error', 'single'],
    'space-in-parens': ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'no-magic-numbers': [
      'warn',
      {
        ignore: [-1, 0, 1],
        ignoreArrayIndexes: true,
        enforceConst: true,
      },
    ],
    eqeqeq: 'error',
    yoda: 'error',
    'brace-style': ['error', '1tbs'],
    'object-curly-spacing': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'semi-style': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    '@typescript-eslint/array-type': ['error', {default: 'generic'}],
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'local',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        variables: false,
        enums: false,
        typedefs: false,
        ignoreTypeReferences: false,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          colon: {
            before: false,
            after: true,
          },
        },
      },
    ],
    '@typescript-eslint/semi': ['error'],
    'no-unused-vars': [
      1,
      {
        vars: 'local',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'no-mixed-spaces-and-tabs': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'multiline-expression',
          'return',
          'multiline-const',
          'multiline-block-like',
          'switch',
          'try',
          'while',
          'iife',
          'break',
          'case',
          'default',
          'block',
          'class',
          'for',
          'function',
          'if',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'multiline-expression',
          'return',
          'multiline-const',
          'multiline-block-like',
          'switch',
          'try',
          'while',
          'iife',
          'break',
          'case',
          'default',
          'block',
          'class',
          'for',
          'function',
          'if',
        ],
        next: '*',
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'object-shorthand': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-eq-null': 'error',
    'react-memo/require-usememo': 'warn',
    'react-memo/require-memo': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'react/display-name': 'error',
    'react/jsx-key': 'error',
    'i18next/no-literal-string': ['error', {markupOnly: true, onlyAttribute: ['']}],
  },
  globals: {
    __IS_DEV__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
