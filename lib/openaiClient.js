"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = generateMessage;
const openai_1 = require("openai");
async function generateMessage({ jsonReport, apiKey, model, }) {
    var _a, _b, _c;
    const openai = new openai_1.OpenAI({
        apiKey,
    });
    const prompt = `As a witty software tester, summarize the following test results with a touch of humor:\n\n${jsonReport}`;
    const response = await openai.chat.completions.create({
        model,
        max_tokens: 150,
        temperature: 0.7,
        messages: [
            {
                role: "system",
                content: "You are a witty software testing report generator. Your task is to create engaging and slightly humorous test report summaries for team communication platforms.",
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
    return ((_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim()) || "";
}
