# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-14

### Added
- Initial release of the AI Playwright Reporter
- Support for OpenAI and Anthropic Claude AI models
- Integration with Slack and Microsoft Teams for report delivery
- Custom Playwright reporter implementation
- AI-generated humorous test summaries
- Configuration options for AI model selection and API keys
- GitHub Actions CI/CD pipeline for automated testing and publishing
- Comprehensive test suite using Vitest
- TypeScript support and type definitions
- ESLint and Prettier for code quality and formatting

### Features
- Generates witty and engaging test report summaries
- Sends reports to Slack and Microsoft Teams via webhooks
- Customizable AI model selection (OpenAI or Claude)
- Easy integration with existing Playwright test suites

### Dependencies
- @anthropic-ai/sdk: ^0.27.3
- axios: ^0.24.0
- dotenv: ^16.4.5
- openai: ^4.60.0

### Dev Dependencies
- @playwright/test: ^1.47.0
- TypeScript: ^5.0.0
- ESLint: ^9.10.0
- Prettier: ^3.3.3
- Vitest: ^2.1.0

### Documentation
- README.md with installation, usage, and configuration instructions
- Code comments for better understanding and maintenance

### Continuous Integration
- GitHub Actions workflow for automated testing and package publishing

### Notes
- This is the initial release of the AI Playwright Reporter. Future versions will include bug fixes, performance improvements, and additional features based on user feedback.
