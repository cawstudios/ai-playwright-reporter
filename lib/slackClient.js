"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSlackMessage = sendSlackMessage;
const axios_1 = __importDefault(require("axios"));
async function sendSlackMessage(message) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
        throw new Error('SLACK_WEBHOOK_URL is not defined');
    }
    await axios_1.default.post(webhookUrl, { text: message });
}
