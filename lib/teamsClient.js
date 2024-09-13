"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTeamsMessage = sendTeamsMessage;
const axios_1 = __importDefault(require("axios"));
async function sendTeamsMessage(message) {
    const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
    if (!webhookUrl) {
        throw new Error('TEAMS_WEBHOOK_URL is not defined');
    }
    const teamsMessage = {
        '@type': 'MessageCard',
        '@context': 'https://schema.org/extensions',
        text: message,
    };
    await axios_1.default.post(webhookUrl, teamsMessage);
}
