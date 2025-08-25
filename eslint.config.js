// Flat ESLint config for ESLint v9+
// Конвертация из .eslintrc.cjs с сохранением логики правил
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.eslintrc.cjs', '**/*.cjs']
  },
  js.configs.recommended,
  // Рекомендуемые настройки Vue 3 (flat)
  ...vue.configs['flat/recommended'],
  // Блок для TS и Vue файлов с правилами и парсерами
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue']
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      'unused-imports': unusedImports
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // Предпочитаем TS-правило и игнорируем переменные/аргументы с префиксом _
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index']
          ]
        }
      ],
      'unused-imports/no-unused-imports': 'error'
    }
  },
  // Отключение конфликтов с Prettier
  prettier
]


