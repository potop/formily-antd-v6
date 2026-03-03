import eslint from '@eslint/js'
import markdown from '@eslint/markdown'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  eslintPluginPrettier,

  // React hooks (explicit rules for portability across react-hooks versions)
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Type-aware linting for TS/TSX (enables no-deprecated)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'warn',
    },
  },

  // Root CJS config files (Node.js globals like module, require)
  {
    files: ['*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
  },

  // Global rules
  {
    settings: { react: { version: 'detect' } },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ts-comment': 'off',
      'react/display-name': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
      'prefer-const': 'warn',
      'no-empty': 'warn',
      'no-async-promise-executor': 'warn',
      'no-unsafe-finally': 'warn',
    },
  },

  // Markdown: extract fenced code blocks so they can be linted
  ...markdown.configs.processor,

  // Disable type-aware linting for code blocks extracted from markdown
  {
    files: ['**/*.md/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
    },
  },

  // Relaxed rules for code blocks inside markdown files
  {
    files: ['**/*.md/*.{jsx,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.md/*.{js,ts}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
    },
  },

  // Ignores (replaces .eslintignore)
  {
    ignores: [
      '**/node_modules/**',
      '**/lib/**',
      '**/dist/**',
      '**/build/**',
      '**/esm/**',
      'coverage/**',
      'expected/**',
      'website/**',
      'gh-pages/**',
      'weex/**',
      'build.ts',
      'packages/vue/**',
      'packages/element/**',
      'doc-site/**',
      'public/**',
      'package/**',
      '.umirc.ts',
    ],
  }
)
