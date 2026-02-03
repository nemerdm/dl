module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // === Protokół S21: Zakaz console.log w produkcji ===
    'no-console': 'error',
    
    // === Protokół S34: ES Modules ===
    'no-var': 'error',
    'prefer-const': 'error',
    
    // === Best Practices ===
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    
    // === Code Style ===
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'comma-dangle': ['error', 'only-multiline'],
  },
};
