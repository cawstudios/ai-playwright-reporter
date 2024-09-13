import { Model } from "@anthropic-ai/sdk/resources";
export declare function generateMessage({ jsonReport, apiKey, model, }: {
    jsonReport: string;
    apiKey: string;
    model: Model;
}): Promise<string>;
