import { OpenAI } from "openai";
import { ChatModel } from "openai/resources";

export async function generateMessage({
  jsonReport,
  apiKey,
  model,
}: {
  jsonReport: string;
  apiKey: string;
  model: ChatModel;
}): Promise<string> {
  const openai = new OpenAI({
    apiKey,
  });

  const prompt = `As a witty software tester, summarize the following test results with a touch of humor:\n\n${jsonReport}`;

  const response = await openai.chat.completions.create({
    model,
    max_tokens: 200,
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are a witty software testing report generator. Your task is to create engaging and slightly humorous test report summaries for team communication platforms.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "text",
    },
  });

  return response.choices[0]?.message?.content?.trim() || "";
}
