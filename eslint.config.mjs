import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import storyblokPlugin from './.eslint/eslint-plugin-storyblok.js'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // jsx-a11y rules (plugin is already included in nextVitals)
      ...jsxA11y.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          semi: false,
          tabWidth: 2,
          singleQuote: true,
          printWidth: 80,
          endOfLine: 'auto',
          arrowParens: 'always',
          plugins: ['prettier-plugin-tailwindcss'],
        },
        {
          usePrettierrc: false,
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  },
  {
    files: ['src/features/storyblok/components/**/*.tsx'],
    plugins: {
      storyblok: storyblokPlugin,
    },
    rules: {
      'storyblok/storyblok-component-registered': 'error',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Additional ignores
    'node_modules/**',
    '.storyblok/**',
  ]),
])

export default eslintConfig
