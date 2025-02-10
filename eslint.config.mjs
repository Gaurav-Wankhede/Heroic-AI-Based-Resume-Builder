import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Disable specific TypeScript rules that are too strict for this project
      '@typescript-eslint/no-explicit-any': 'off',      // Allow 'any' type where needed
      '@typescript-eslint/no-unused-vars': ['warn', {   // Allow unused variables prefixed with _
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_'
      }],
      // Add any other custom rule configurations here
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

export default eslintConfig;
