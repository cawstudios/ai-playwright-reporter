import { ChatModel } from "openai/resources";
import { Model } from "@anthropic-ai/sdk/resources";
export declare function generateMessage({ jsonReport, type, apiKey, model, }: {
    jsonReport: string;
    type: "openai" | "claude";
    apiKey: string;
    model: Model | ChatModel;
}): Promise<string>;
