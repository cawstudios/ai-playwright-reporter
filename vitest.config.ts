import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    exclude: ['playwright-tests/**'],
    include: ['tests/**/*.test.ts'],
  },
})
