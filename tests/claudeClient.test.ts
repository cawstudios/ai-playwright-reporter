import { describe, it, expect, vi } from 'vitest'
import { generateMessage } from '../src/claudeClient'
import Anthropic from '@anthropic-ai/sdk'

vi.mock('@anthropic-ai/sdk')

describe('claudeClient', () => {
  it('should generate a message using Claude', async () => {
    const mockCreate = vi.fn().mockResolvedValue({
      content: [{ text: 'Generated message' }],
    })

    vi.mocked(Anthropic).mockImplementation(
      () =>
        ({
          messages: {
            create: mockCreate,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any
    )

    const result = await generateMessage({
      jsonReport: 'Test report',
      apiKey: 'test-key',
      model: 'claude-2',
    })

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'claude-2',
        messages: expect.arrayContaining([
          expect.objectContaining({ role: 'user', content: expect.stringContaining('Test report') }),
        ]),
      })
    )
    expect(result).toBe('Generated message')
  })

  it('should throw an error if API key is not provided', async () => {
    await expect(
      generateMessage({
        jsonReport: 'Test report',
        apiKey: '',
        model: 'claude-2',
      })
    ).rejects.toThrow('ANTHROPIC_API_KEY is not defined')
  })
})
