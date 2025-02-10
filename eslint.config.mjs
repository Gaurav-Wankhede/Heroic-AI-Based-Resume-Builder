import { dirname } from "path";
import { fileURLToPath } from "url";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      // Disable all TypeScript strict rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      // Make React Hook rules less strict
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'off'
    },
    // Ignore certain files and directories
    ignores: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'out/**'
    ]
  }
);
