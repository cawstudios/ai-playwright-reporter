import { ChatModel } from "openai/resources/chat/chat";
import { Reporter, TestCase, TestResult, FullResult } from "@playwright/test/reporter";
import { Model } from "@anthropic-ai/sdk/resources";
export interface SlackTeamsReporterOptions {
    type?: "openai" | "claude";
    model?: Model | ChatModel;
    apiKey?: string;
    slackWebhookUrl?: string;
    teamsWebhookUrl?: string;
}
export default class SlackTeamsReporter implements Reporter {
    private testResults;
    private type;
    private model;
    private apiKey;
    private slackWebhookUrl?;
    private teamsWebhookUrl?;
    constructor(options?: SlackTeamsReporterOptions);
    onTestEnd(test: TestCase, result: TestResult): void;
    onEnd(result: FullResult): Promise<void>;
    private generateSummary;
    private generateReportPrompt;
}
