import { ChatModel } from "openai/resources";
export declare function generateMessage({ jsonReport, apiKey, model, }: {
    jsonReport: string;
    apiKey: string;
    model: ChatModel;
}): Promise<string>;
