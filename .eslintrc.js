module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "./.eslintrc-auto-import.json",
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  rules: {
    // 忽略未使用的變數警告（開發階段常見）
    "no-unused-vars": "warn",
    // 允許 console 語句
    "no-console": "off",
    // 允許 debugger 語句
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // Vue 相關規則
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "vue/valid-define-props": "off",
    "vue/valid-define-emits": "off",
    "vue/valid-template-root": "off",
    "vue/valid-v-for": "warn",
    "vue/no-unused-vars": "warn",
  },
  overrides: [
    // TypeScript files
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "no-undef": "off", // TypeScript handles this
        "no-unused-vars": "off", // Use TypeScript version instead
      },
    },
    // Vue files with TypeScript
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        extraFileExtensions: [".vue"],
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "no-undef": "off", // TypeScript handles this
        "no-unused-vars": "off", // Use TypeScript version instead
      },
    },
    // JavaScript files
    {
      files: ["*.js", "*.mjs", "*.jsx"],
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
};
