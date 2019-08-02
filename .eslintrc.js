// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'no-bitwise': 'off',
    'no-control-regex': 'off',
    'no-trailing-spaces': 'off',
    'space-before-blocks': 'off',
    'space-infix-ops': 'off',
    'keyword-spacing': 'off',
    'generator-star-spacing': 'off',
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    'no-debugger': 'off'
  }
}
