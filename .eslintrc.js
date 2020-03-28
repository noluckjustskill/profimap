module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 8
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // '@nuxtjs',
    // 'plugin:nuxt/recommended'
    'plugin:vue/recommended'
  ],
  globals: {
    logger: 'readonly',
  },
  rules: {
    'eqeqeq': ["error"],
    'max-len': ['error', 160, {
      'ignoreUrls': true,
      'ignoreTemplateLiterals': true,
      "ignoreRegExpLiterals": true,
      "ignoreStrings": true,
      'ignorePattern': '^(\\s*import\\s)|(require\\()|(".*?")',

    }],
    'indent': ['error', 2],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true, avoidEscape: true }],
    'comma-dangle': ['error', 'only-multiline'],
    'import/first': 0,
    'semi': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'dot-location': ['error', 'property'],
    'eol-last': 'error',
    'keyword-spacing': 'error',
    'no-multi-spaces': 'error',
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-undef': 'error',
    'no-unused-expressions': 'off',
    'no-unused-vars': ['error', { args: 'none', "ignoreRestSiblings": true }],
    'no-use-before-define': ['error'],
    'nuxt/no-cjs-in-config': 'off',
    'prefer-const': ['error'],
    'no-var': ['error'],
    'space-before-blocks': 'error',
    'no-restricted-globals': 0,
    'strict': ['error', 'global'],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'indent': 'off',
        'vue/script-indent': ['error', 2, {'baseIndent': 1}],
        'vue/html-closing-bracket-newline': ['error', {
          'singleline': 'never',
          'multiline': 'always'
        }],
        'vue/mustache-interpolation-spacing': [2, 'always'],
        'vue/max-attributes-per-line': [2, {
          'singleline': 3,
          'multiline': {
            'max': 1,
            'allowFirstLine': false
          }
        }],
      }
    }
  ]
}
