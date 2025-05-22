import js from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import next from "eslint-config-next";

export default [
  // 기본 JS 추천 규칙
  js.configs.recommended,

  // Next.js 설정
  {
    ...next,
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  },

  // Prettier 적용 (import 관련 규칙 제거됨)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // prettier conflict 방지용
  {
    rules: prettierConfig.rules,
  },
];
