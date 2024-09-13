import { defineConfig } from '@playwright/test'
import { SlackTeamsReporterOptions } from './src/reporter'
export default defineConfig({
  testDir: 'playwright-tests',
  reporter: [
    ['list'],
    [
      './src/index',
      {
        type: 'openai',
        model: 'gpt-4o',
      } as SlackTeamsReporterOptions,
    ],
  ],
})
