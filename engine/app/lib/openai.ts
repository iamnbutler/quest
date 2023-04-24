import { ChatCompletionRequestMessage, ChatCompletionResponseMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";

export const TEST_MESSAGE = {
    role: "user",
    content: "Hello, I am a chatbot. How are you?",
}

export class prompt {
    // Create the prompt from all the various pieces like scenario, context, party, etc.
    buildSystemMessage(): ChatCompletionRequestMessage {
        return {
            role: "system",
            content: "I am doing well, thank you.",
        }
    }

    buildMessages(message: ChatCompletionRequestMessage): ChatCompletionRequestMessage[] {
        const systemMessage = this.buildSystemMessage()

        return [
            systemMessage,
            message
        ]
    }

    private async getChatCompletion(
        messages: ChatCompletionRequestMessage[],
    ): Promise<CreateChatCompletionResponse> {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        if (!configuration.apiKey) {
            throw new Error("No OpenAI API key found");
        }

        const openai = new OpenAIApi(configuration);

        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 2000,
        });

        const log = `====
Status: ${chatCompletion.status}
Status Text: ${chatCompletion.statusText}
Config: ${JSON.stringify(chatCompletion.config, null, 2)}
Data: ${JSON.stringify(chatCompletion.data, null, 2)}
====`

        console.log(JSON.stringify(log, null, 2))

        return chatCompletion.data
    }

    async useMessages(messages: ChatCompletionResponseMessage[]) {
        const response = await this.getChatCompletion(messages)

        return response.choices[0]
    }
}
