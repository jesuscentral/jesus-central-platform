import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import storyblokPlugin from './.eslint/eslint-plugin-storyblok.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended',
    ],
    plugins: ['jsx-a11y', 'prettier'],
    rules: {
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
  }),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.storyblok/**',
    ],
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
]

export default eslintConfig
