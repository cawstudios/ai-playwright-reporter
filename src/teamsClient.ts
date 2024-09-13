import axios from 'axios';

export async function sendTeamsMessage(message: string): Promise<void> {
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error('TEAMS_WEBHOOK_URL is not defined');
  }

  const teamsMessage = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    text: message,
  };

  await axios.post(webhookUrl, teamsMessage);
}