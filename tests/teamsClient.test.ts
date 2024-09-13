import { describe, it, expect, vi } from 'vitest'
import { sendTeamsMessage } from '../src/teamsClient'
import axios from 'axios'

vi.mock('axios')

describe('teamsClient', () => {
  it('should send a message to Microsoft Teams', async () => {
    process.env.TEAMS_WEBHOOK_URL = 'http://teams.com'
    vi.spyOn(axios, 'post').mockResolvedValue({})

    await sendTeamsMessage('Test message')

    expect(axios.post).toHaveBeenCalledWith('http://teams.com', {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      text: 'Test message',
    })
  })

  it('should throw an error if TEAMS_WEBHOOK_URL is not defined', async () => {
    delete process.env.TEAMS_WEBHOOK_URL

    await expect(sendTeamsMessage('Test message')).rejects.toThrow('TEAMS_WEBHOOK_URL is not defined')
  })
})
