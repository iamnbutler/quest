import { ChatCompletionRequestMessage, ChatCompletionResponseMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";

export const TEST_MESSAGE: ChatCompletionRequestMessage = {
    role: "user",
    content: "Hello, I am a chatbot. How are you?",
}

export class Prompt {
    // Create the prompt from all the various pieces like scenario, context, party, etc.
    private buildSystemMessage(): ChatCompletionRequestMessage {
        return {
            role: "system",
            content: "I am doing well, thank you.",
        }
    }

    async buildMessages(message: ChatCompletionRequestMessage): Promise<ChatCompletionResponseMessage | undefined> {
        const systemMessage = this.buildSystemMessage()

        const messages = [
            systemMessage,
            message
        ]

        const completion = await this.getChatCompletion(messages)
        const returnMessages = completion.choices[0].message

        return returnMessages
    }

    private async getChatCompletion(
        messages: ChatCompletionRequestMessage[],
    ): Promise<CreateChatCompletionResponse> {
        try {
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
        } catch (error) {
            console.error("Error in getChatCompletion:", error);

            const log = `====
            Error: ${error}
            ====`

            console.log(JSON.stringify(log, null, 2))

            throw error;
        }
    }

    async useMessages(messages: ChatCompletionResponseMessage[]) {
        const response = await this.getChatCompletion(messages)

        return response.choices[0]
    }
}
