import { generateMessage as generateOpenAIMessage } from './openaiClient'
import { generateMessage as generateClaudeMessage } from './claudeClient'
import { ChatModel } from 'openai/resources/index.mjs'

import { Model } from '@anthropic-ai/sdk/resources/index.mjs'

export async function generateMessage({
  jsonReport,
  type,
  apiKey,
  model,
}: {
  jsonReport: string
  type: 'openai' | 'claude'
  apiKey: string
  model: Model | ChatModel
}): Promise<string> {
  if (type === 'claude') {
    return await generateClaudeMessage({ jsonReport, apiKey, model })
  } else {
    return await generateOpenAIMessage({
      jsonReport,
      apiKey,
      model: model as ChatModel,
    })
  }
}
