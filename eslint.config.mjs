import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier'; // [1] Prettier 충돌 방지 설정 import

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig, // [2] 반드시 다른 설정들보다 뒤에 배치하여 스타일 규칙 덮어쓰기
  {
    rules: {
      'react-hooks/static-components': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
