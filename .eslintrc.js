module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    requireConfigFile: false
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  rules: {
    // 忽略未使用的變數警告（開發階段常見）
    'no-unused-vars': 'warn',
    // 允許 console 語句
    'no-console': 'warn'
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    {
      files: ['*.js', '*.mjs'],
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    }
  ]
}