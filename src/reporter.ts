import { ChatModel } from 'openai/resources/chat/chat'
import { generateMessage } from './aiClient'
import { sendSlackMessage } from './slackClient'
import { sendTeamsMessage } from './teamsClient'
import { Reporter, TestCase, TestResult, TestError, FullResult } from '@playwright/test/reporter'
import { Model } from '@anthropic-ai/sdk/resources/index.mjs'

export interface SlackTeamsReporterOptions {
  type?: 'openai' | 'claude'
  model?: Model | ChatModel
  apiKey?: string
  slackWebhookUrl?: string
  teamsWebhookUrl?: string
}

export default class SlackTeamsReporter implements Reporter {
  private testResults: {
    title: string
    status: string
    error?: TestError
  }[] = []
  private type: 'openai' | 'claude'
  private model: Model | ChatModel
  private apiKey: string
  private slackWebhookUrl?: string
  private teamsWebhookUrl?: string

  constructor(options: SlackTeamsReporterOptions = {}) {
    this.type = options.type || 'openai'
    this.model = options.model || 'gpt-4o'
    this.apiKey = ''
    if (this.type === 'openai') {
      this.apiKey = options.apiKey || process.env.OPENAI_API_KEY || ''
    }

    if (this.type === 'claude') {
      this.apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY || ''
    }
    this.slackWebhookUrl = options.slackWebhookUrl || process.env.SLACK_WEBHOOK_URL
    this.teamsWebhookUrl = options.teamsWebhookUrl || process.env.TEAMS_WEBHOOK_URL

    if (!this.model) {
      throw new Error('Missing model')
    }

    if (!this.apiKey && this.apiKey === '') {
      throw new Error('Missing OpenAI API key')
    }

    if (!this.slackWebhookUrl && !this.teamsWebhookUrl) {
      throw new Error('Missing Slack or Teams webhook URL')
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.testResults.push({
      title: test.title,
      status: result.status,
      error: result.error,
    })
  }

  async onEnd(result: FullResult) {
    const summary = this.generateSummary(result)

    if (this.slackWebhookUrl) {
      const slackReportPrompt = this.generateReportPrompt(summary, 'Slack')
      const slackMessage = await generateMessage({
        jsonReport: slackReportPrompt,
        model: this.model,
        apiKey: this.apiKey,
        type: this.type,
      })
      await sendSlackMessage(slackMessage)
    }

    if (this.teamsWebhookUrl) {
      const teamsReportPrompt = this.generateReportPrompt(summary, 'Teams')
      const teamsMessage = await generateMessage({
        jsonReport: teamsReportPrompt,
        model: this.model,
        apiKey: this.apiKey,
        type: this.type,
      })
      await sendTeamsMessage(teamsMessage)
    }
  }

  private generateSummary(result: FullResult) {
    const totalTests = this.testResults.length
    const passedTests = this.testResults.filter((r) => r.status === 'passed').length
    const failedTests = this.testResults.filter((r) => r.status === 'failed').length
    const skippedTests = this.testResults.filter((r) => r.status === 'skipped').length
    const duration = result.duration

    return {
      totalTests,
      passedTests,
      failedTests,
      skippedTests,
      duration,
    }
  }

  private generateReportPrompt(
    summary: ReturnType<SlackTeamsReporter['generateSummary']>,
    platform: 'Slack' | 'Teams'
  ): string {
    const basePrompt = `Generate a humorous test report summary for ${platform} based on the following data:

Total Tests: ${summary.totalTests}
Passed Tests: ${summary.passedTests}
Failed Tests: ${summary.failedTests}
Skipped Tests: ${summary.skippedTests}
Duration: ${(summary.duration / 1000).toFixed(2)} seconds

Please include:
1. A witty headline related to software testing
2. Key statistics presented in a humorous way
3. Light-hearted comments on the results
4. A funny conclusion or call to action

Keep the tone professional but inject software testing humor throughout the report.`

    const slackFormatting = `
For Slack formatting:
- Use *asterisks* for bold text
- Use _underscores_ for italic text
- Use \`backticks\` for inline code
- Use \`\`\`triple backticks\`\`\` for code blocks
- Use > for blockquotes
- Use emoji shortcodes like :smile: or :bug:
- Use bullet points with • or -

Example Slack formatting:
*Bold headline*
• Statistic 1: _Interesting fact_ :chart_with_upwards_trend:
• Statistic 2: Another fact :rocket:
> Blockquote for emphasis
\`inline code\`
\`\`\`
Code block
\`\`\``

    const teamsFormatting = `
For Microsoft Teams formatting:
- Use **asterisks** for bold text
- Use *asterisks* for italic text
- Use \`backticks\` for inline code
- Use ~~tildes~~ for strikethrough
- Use --- for horizontal lines
- Use 1. 2. 3. for numbered lists
- Use - or * for bullet points
- Teams does not support native emoji shortcodes, so use Unicode emojis directly

Example Teams formatting:
**Bold headline**
1. Statistic 1: *Interesting fact* 📈
2. Statistic 2: Another fact 🚀
---
- Bullet point 1
- Bullet point 2
\`inline code\``

    return platform === 'Slack' ? basePrompt + slackFormatting : basePrompt + teamsFormatting
  }
}
