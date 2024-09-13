import { describe, it, expect, vi } from 'vitest'
import { sendSlackMessage } from '../src/slackClient'
import axios from 'axios'

vi.mock('axios')

describe('slackClient', () => {
  it('should send a message to Slack', async () => {
    process.env.SLACK_WEBHOOK_URL = 'http://slack.com'
    vi.spyOn(axios, 'post').mockResolvedValue({})

    await sendSlackMessage('Test message')

    expect(axios.post).toHaveBeenCalledWith('http://slack.com', { text: 'Test message' })
  })

  it('should throw an error if SLACK_WEBHOOK_URL is not defined', async () => {
    delete process.env.SLACK_WEBHOOK_URL

    await expect(sendSlackMessage('Test message')).rejects.toThrow('SLACK_WEBHOOK_URL is not defined')
  })
})
