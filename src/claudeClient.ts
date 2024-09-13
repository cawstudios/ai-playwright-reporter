import Anthropic from '@anthropic-ai/sdk'

export async function generateMessage({
  jsonReport,
  apiKey,
  model,
}: {
  jsonReport: string
  apiKey: string
  model: Anthropic.Model
}): Promise<string> {
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not defined')
  }

  const anthropic = new Anthropic({ apiKey })

  const prompt = `As a witty software tester, summarize the following test results with a touch of humor:\n\n${jsonReport}`

  const response = await anthropic.messages.create({
    model,
    max_tokens: 200,
    temperature: 0.7,
    system:
      'You are a witty software testing report generator. Your task is to create engaging and slightly humorous test report summaries for team communication platforms.',
    messages: [{ role: 'user', content: prompt }],
  })

  if (!response || !response.content || !response.content[0] || !('text' in response.content[0])) {
    throw new Error('Invalid response from API')
  }

  return response.content[0].text.trim()
}
