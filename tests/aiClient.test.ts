import { describe, it, expect, vi } from 'vitest'
import { generateMessage } from '../src/aiClient'
import * as openaiClient from '../src/openaiClient'
import * as claudeClient from '../src/claudeClient'

vi.mock('../src/openaiClient')
vi.mock('../src/claudeClient')

describe('aiClient', () => {
  it('should call openaiClient for OpenAI type', async () => {
    vi.spyOn(openaiClient, 'generateMessage').mockResolvedValue('OpenAI response')

    const result = await generateMessage({
      jsonReport: 'Test report',
      type: 'openai',
      apiKey: 'test-key',
      model: 'gpt-4',
    })

    expect(openaiClient.generateMessage).toHaveBeenCalledWith({
      jsonReport: 'Test report',
      apiKey: 'test-key',
      model: 'gpt-4',
    })
    expect(result).toBe('OpenAI response')
  })

  it('should call claudeClient for Claude type', async () => {
    vi.spyOn(claudeClient, 'generateMessage').mockResolvedValue('Claude response')

    const result = await generateMessage({
      jsonReport: 'Test report',
      type: 'claude',
      apiKey: 'test-key',
      model: 'claude-2',
    })

    expect(claudeClient.generateMessage).toHaveBeenCalledWith({
      jsonReport: 'Test report',
      apiKey: 'test-key',
      model: 'claude-2',
    })
    expect(result).toBe('Claude response')
  })
})
