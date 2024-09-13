/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SlackTeamsReporter from '../src/reporter'
import * as aiClient from '../src/aiClient'
import * as slackClient from '../src/slackClient'
import * as teamsClient from '../src/teamsClient'

vi.mock('../src/aiClient')
vi.mock('../src/slackClient')
vi.mock('../src/teamsClient')

describe('SlackTeamsReporter', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default options', () => {
    const reporter = new SlackTeamsReporter({
      apiKey: 'test-key',
      slackWebhookUrl: 'http://slack.com',
      teamsWebhookUrl: 'http://teams.com',
    })
    expect(reporter['type']).toBe('openai')
    expect(reporter['model']).toBe('gpt-4o')
    expect(reporter['apiKey']).toBe('test-key')
    expect(reporter['slackWebhookUrl']).toBe('http://slack.com')
    expect(reporter['teamsWebhookUrl']).toBe('http://teams.com')
  })

  it('should throw an error if no API key is provided', () => {
    expect(() => new SlackTeamsReporter({ apiKey: '' })).toThrow('Missing OpenAI API key')
  })

  it('should throw an error if no webhook URL is provided', () => {
    expect(() => new SlackTeamsReporter({ apiKey: 'test-key' })).toThrow('Missing Slack or Teams webhook URL')
  })

  it('should record test results', () => {
    const reporter = new SlackTeamsReporter({ apiKey: 'test-key', slackWebhookUrl: 'http://slack.com' })
    reporter.onTestEnd({ title: 'Test 1' } as any, { status: 'passed' } as any)
    expect(reporter['testResults']).toHaveLength(1)
  })

  it('should generate and send reports on end', async () => {
    vi.spyOn(aiClient, 'generateMessage').mockResolvedValue('AI generated message')
    vi.spyOn(slackClient, 'sendSlackMessage').mockResolvedValue()
    vi.spyOn(teamsClient, 'sendTeamsMessage').mockResolvedValue()

    const reporter = new SlackTeamsReporter({
      apiKey: 'test-key',
      slackWebhookUrl: 'http://slack.com',
      teamsWebhookUrl: 'http://teams.com',
    })

    await reporter.onEnd({ duration: 1000 } as any)

    expect(aiClient.generateMessage).toHaveBeenCalledTimes(2)
    expect(slackClient.sendSlackMessage).toHaveBeenCalledWith('AI generated message')
    expect(teamsClient.sendTeamsMessage).toHaveBeenCalledWith('AI generated message')
  })
})
