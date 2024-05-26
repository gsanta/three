module.exports = {
  parser: '@typescript-eslint/parser',
  /* Parser with TypeScript support */
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    /* Enables JSX usage */
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'prettier/prettier',
  ],
  plugins: [
    /*** Uncommented plugins are here for clarity, DON'T remove them!!! ***/

    /* eslint-config-airbnb already defines these plugins */
    'import',
    'react',
    'react-hooks', // 'jsx-a11y',

    /* @typescript-eslint/eslint-plugin already defines this plugin */
    // '@typescript-eslint',

    /* eslint-plugin-prettier already defines this plugin */
    // 'prettier',
  ],
  rules: {
    /*** Import related rules ***/
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**/*.ts',
          '**/*.stories.tsx',
          '**/*.test.tsx',
          '**/*.test.ts',
          'client/webpack.config.js',
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
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],

    /* Force function components to be arrow-functions */
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
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
