import { vi, describe, it, expect } from 'vitest'

vi.mock('claude', () => ({
  Claude: vi.fn(),
  ClaudeClient: vi.fn(),
  ClaudeApi: vi.fn(),
  ClaudeApiClient: vi.fn(),
}))

vi.mock('../src/claudeClient', () => ({
  generateMessage: vi.fn().mockResolvedValue('Mocked response'),
}))

vi.mock('openai', () => ({
  Configuration: vi.fn(),
  OpenAIApi: vi.fn(() => ({
    createCompletion: vi.fn().mockResolvedValue({
      data: {
        choices: [{ text: 'Mocked response' }],
      },
    }),
  })),
}))

vi.mock('../src/openaiClient', async () => {
  const actual = (await vi.importActual('../src/openaiClient')) as Record<string, unknown>
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateMessage: vi.fn().mockImplementation((actual as any).generateMessage),
  }
})

vi.mock('dotenv', () => ({
  config: vi.fn().mockResolvedValue({
    OPENAI_API_KEY: 'test-key',
    CLAUDE_API_KEY: 'test-key',
    CLAUDE_API_ENDPOINT: 'https://api.anthropic.com/v1/complete',
    OPENAI_API_ENDPOINT: 'https://api.openai.com/v1/completions',
  }),
}))

describe('openaiClient', () => {
  it('should generate a message with OpenAI', async () => {
    const { generateMessage } = await import('../src/openaiClient')
    const result = await generateMessage({
      jsonReport: 'Test prompt',
      apiKey: 'test-key',
      model: 'gpt-4o',
    })
    expect(result).toBe('Mocked response')
  })

  it('should generate a message with Claude', async () => {
    const { generateMessage } = await import('../src/claudeClient')
    const result = await generateMessage({
      jsonReport: 'Test prompt',
      apiKey: 'test-key',
      model: 'claude-3-opus',
    })
    expect(result).toBe('Mocked response')
  })
})
