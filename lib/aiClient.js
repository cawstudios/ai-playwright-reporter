"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = generateMessage;
const openaiClient_1 = require("./openaiClient");
const claudeClient_1 = require("./claudeClient");
async function generateMessage({ jsonReport, type, apiKey, model, }) {
    if (type === "claude") {
        return await (0, claudeClient_1.generateMessage)({ jsonReport, apiKey, model });
    }
    else {
        return await (0, openaiClient_1.generateMessage)({
            jsonReport,
            apiKey,
            model: model,
        });
    }
}
