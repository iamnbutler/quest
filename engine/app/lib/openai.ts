import { ChatCompletionRequestMessage, ChatCompletionResponseMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";
import { useMessagesStore, MessageData } from '@stores/messages';

export type Choice = {
    id: number;
    text: string;
};

export type ParsedChoicesResponse = {
    originalMessage: string;
    updatedMessage: string;
    choices: Choice[];
};

export type UIMessage = {
    message: MessageData;
    choices: Choice[];
};

export const TEST_MESSAGE: ChatCompletionRequestMessage = {
    role: "user",
    content: "In the land of Atheria, once a powerful and prosperous kingdom, ruin and despair now reign. Magic, the kingdom's former backbone, has dwindled into a scarce and dangerous resource. The arcane arts, previously revered, are now feared and strictly regulated by a royal guild known as the Silver Hand. Established by the king to investigate the cause of Atheria's downfall, the guild is determined to restore the kingdom to its former glory.",
}

export class Prompt {
    // Create the prompt from all the various pieces like scenario, context, party, etc.
    private buildSystemMessage(): ChatCompletionRequestMessage {
        return {
            role: "system",
            content: "Respond to the prompt the user gives you by continuing the story.",
        }
    }

    private addChoicesInstructions(): string {
        return `At the end of the prompt, add a list of choices for the user to choose from. Each choice should be on a new line and start with a number. Wrap the list of decisions in this special delimiter: :::===::: For example:
:::===:::
1. Go to the store
2. Go to the park
3. Go to the library
:::===:::`
    }

    private parsedChoices(response: ChatCompletionResponseMessage | undefined): ParsedChoicesResponse {
        if (response === undefined) {
            throw new Error("No response from OpenAI");
        }

        const message = response.content;

        const delimiter = ":::===:::";
        const choicesRegex = new RegExp(`${delimiter}([\\s\\S]*?)${delimiter}`);

        const match = message.match(choicesRegex);

        if (!match) {
            return { originalMessage: message, updatedMessage: message, choices: [] };
        }

        const originalMessage = message;
        const updatedMessage = message.replace(match[0], "").trim();
        const choicesText = match[1].trim();
        const choicesLines = choicesText.split("\n");

        const choices = choicesLines.map((line, index) => {
            const id = index + 1;
            const text = line.replace(/^\d+\.\s*/, "");
            return { id, text };
        });

        return { originalMessage, updatedMessage, choices };
    }

    async buildMessages(message: ChatCompletionRequestMessage): Promise<ChatCompletionResponseMessage | undefined> {
        const systemMessage = this.buildSystemMessage()

        const choicesInstructions = this.addChoicesInstructions()

        const finalMessageContent = `${message.content}

            ${choicesInstructions}`

        message.content = finalMessageContent

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

            console.log(log)

            return chatCompletion.data
        } catch (error) {
            console.error("Error in getChatCompletion:", error);

            const log = `====
            Error: ${JSON.stringify(error, null, 2)}
            ====`

            console.log(log)

            throw error;
        }
    }

    async useMessages(messages: ChatCompletionResponseMessage[]): Promise<UIMessage> {
        const response = await this.getChatCompletion(messages)
        const message = response.choices[0].message

        const parsedMessage = this.parsedChoices(message);

        const currentMessage = useMessagesStore.getState().currentMessage;

        const messageData = {
            content: parsedMessage.updatedMessage,
            step: currentMessage.step + 1,
        }

        useMessagesStore.getState().addMessage(messageData)

        const uiMessage: UIMessage = {
            message: messageData,
            choices: parsedMessage.choices,
        }

        return uiMessage
    }
}
