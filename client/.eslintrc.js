module.exports = {
  parser: '@typescript-eslint/parser' /* Parser with TypeScript support */,
  parserOptions: {
    ecmaFeatures: { jsx: true } /* Enables JSX usage */,
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    jest: { version: 'detect' },
    react: { version: 'detect' },
  },
  extends: [
    /*** Uncommented extends are here for clarity, DON'T remove them!!! ***/
    /*** https://github.com/benmosher/eslint-plugin-import ***/
    /* -> Comes before eslint-config-airbnb, since it uses and overrides these rules
     * -> Uncommenting doesn't change anything */
    // 'plugin:import/errors',
    // 'plugin:import/warnings',

    /*** https://github.com/yannickcr/eslint-plugin-react  ***/
    /* -> Comes before eslint-config-airbnb, since it uses and overrides these rules
     * -> Uncommenting doesn't change anything */
    // 'plugin:react/recommended',

    /*** https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks ***/
    /* -> Comes before eslint-config-airbnb, since it uses and overrides these rules
     * -> Uncommenting doesn't change anything */
    // 'plugin:react-hooks/recommended',

    /*** https://github.com/jsx-eslint/eslint-plugin-jsx-a11y ***/
    /* -> Comes before eslint-config-airbnb, since it uses and overrides these rules
     * -> Uncommenting doesn't change anything */
    // 'plugin:jsx-a11y/recommended',

    /*** https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb ***/
    /* -> Comes before eslint-config-airbnb-typescript, since it uses and overrides these rules
     * -> Uncommenting doesn't change anything */
    // 'airbnb',

    /*** https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb ***/
    /* -> eslint-config-airbnb extension for React Hooks */
    'airbnb/hooks',

    /*** https://github.com/benmosher/eslint-plugin-import ***/
    /* -> Extension for TypeScript support */
    /* -> eslint-config-airbnb-typescript uses and overrides its rules
     * -> uncommenting doesn't change anything */
    // 'plugin:import/typescript',

    /*** https://github.com/typescript-eslint/typescript-eslint#readme ***/
    /* -> Extension for TypeScript support */
    /* -> Comes before eslint-config-airbnb-typescript, since it uses and overrides these rules */
    /* -> It contains some rules which are not overrode elsewhere, DON't comment it out */
    'plugin:@typescript-eslint/recommended',
    /* -> Additional type-checking: None of the recommended rules requires it.
     * -> Currently doesn't have too much extra cost to have it enabled ~1sec.
     * -> Can be disabled if necessary */
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',

    /*** https://github.com/iamturns/eslint-config-airbnb-typescript ***/
    /* -> Wrapper around eslint-config-airbnb with TypeScript support! */
    'airbnb-typescript',

    /*** https://github.com/jest-community/eslint-plugin-jest#readme ***/
    /* -> Extends the above rules with Jest specific ones */
    'plugin:jest/recommended',
    /* Only adds some stylistic rules (toBe(null) -> toBeNull)  */
    'plugin:jest/style', // Jest stylistic rules

    /*** https://www.npmjs.com/package/eslint-plugin-prettier ***/
    /* -> Comes before eslint-config-prettier, since it defines the recommended rules */
    'plugin:prettier/recommended',

    /*** https://github.com/prettier/eslint-config-prettier#readme ***/
    /* -> Make sure to put it last, so it gets the chance to override other configs
     * -> If you extend a config which uses a plugin, it is recommended to add "prettier/that-plugin"*/
    // 'prettier', // eslint-plugin-prettier already defines it
    'prettier/prettier', // disables conflicting rules for eslint-plugin-prettier
  ],
  plugins: [
    /*** Uncommented plugins are here for clarity, DON'T remove them!!! ***/
    /* eslint-config-airbnb already defines these plugins */
    'import',
    'react',
    'react-hooks',
    // 'jsx-a11y',
    /* @typescript-eslint/eslint-plugin already defines this plugin */
    // '@typescript-eslint',
    /* eslint-plugin-jest already defines this plugin */
    // 'jest',
    /* eslint-plugin-prettier already defines this plugin */
    // 'prettier',
  ],
  rules: {
    /*** Import related rules ***/
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.tsx',
          '**/*.test.tsx',
          '**/*.test.ts',
          './webpack.config.js',
          './app/javascript/utils/testcases.ts',
          './spec/typescript/*',
        ],
      },
    ],
    /*** Export related rules ***/
    'import/prefer-default-export': 'off',
    /*** React related rules ***/
    'react/no-unescaped-entities': 'warn',
    /* We are not using prop-types and default-props due to TypeScript */
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    /* To allow <Component {...rest}> */
    'react/jsx-props-no-spreading': 'off',
    /*** TypeScript related rules  ***/
    /* Ban React.FC and FunctionComponent to avoid double typing */
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          'React.FC':
            "Use an arrow-function with JSX.Element return type instead. If you need the children property, you have to explicitly define it on your component's prop-type interface.",
          FunctionComponent:
            "Use an arrow-function with JSX.Element return type instead. If you need the children property, you have to explicitly define it on your component's prop-type interface.",
        },
      },
    ],
    /* Allow i++ in for loop */
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    /* Force function components to be arrow-functions */
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'jest/expect-expect': 'off',
  },
  overrides: [
    {
      files: ['**/*.stories.tsx', '**/*.spec.tsx', '**/*.spec.ts'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
