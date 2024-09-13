import { describe, it, expect, vi } from 'vitest'
import { generateMessage } from '../src/openaiClient'
import { OpenAI } from 'openai'

vi.mock('openai')

describe('openaiClient', () => {
  it('should generate a message using OpenAI', async () => {
    const mockCreate = vi.fn().mockResolvedValue({
      choices: [{ message: { content: 'Generated message' } }],
    })

    vi.mocked(OpenAI).mockImplementation(
      () =>
        ({
          chat: {
            completions: {
              create: mockCreate,
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any
    )

    const result = await generateMessage({
      jsonReport: 'Test report',
      apiKey: 'test-key',
      model: 'gpt-4',
    })

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gpt-4',
        messages: expect.arrayContaining([
          expect.objectContaining({ role: 'system' }),
          expect.objectContaining({ role: 'user', content: expect.stringContaining('Test report') }),
        ]),
      })
    )
    expect(result).toBe('Generated message')
  })
})
