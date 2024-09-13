"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = generateMessage;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
async function generateMessage({ jsonReport, apiKey, model, }) {
    if (!apiKey) {
        throw new Error("ANTHROPIC_API_KEY is not defined");
    }
    const anthropic = new sdk_1.default({ apiKey });
    const prompt = `As a witty software tester, summarize the following test results with a touch of humor:\n\n${jsonReport}`;
    const response = await anthropic.messages.create({
        model,
        max_tokens: 150,
        temperature: 0.7,
        system: "You are a witty software testing report generator. Your task is to create engaging and slightly humorous test report summaries for team communication platforms.",
        messages: [{ role: "user", content: prompt }],
    });
    return "text" in response.content[0] ? response.content[0].text.trim() : "";
}
