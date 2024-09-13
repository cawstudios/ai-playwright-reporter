import axios from 'axios'

export async function sendSlackMessage(message: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error('SLACK_WEBHOOK_URL is not defined')
  }

  await axios.post(webhookUrl, { text: message })
}
