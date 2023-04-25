import {
    ChatCompletionRequestMessage,
    ChatCompletionResponseMessage,
    Configuration,
    CreateChatCompletionResponse,
    OpenAIApi,
} from "openai";
import { useMessagesStore, UIMessage, Choice } from "@stores/messages";

export type ParsedChoicesResponse = {
    originalMessage: string;
    updatedMessage: string;
    choices: Choice[];
};

export class Prompt {
    private buildSystemMessage(): ChatCompletionRequestMessage {
        return {
            role: "system",
            content: "Respond to the prompt the user gives you by continuing the story.",
        };
    }

    private addFormattingInstructions(): string {
        return `Based on the current situation in the story, continue the story for about 140 characters, then provide 2-5 questions or actions the player can choose from to continue the story. List the options with numbers, followed by a colon, and then the option text.

1: Foo
2: Bar
3: Baz
...

In your reply, add a new line character at the end of each paragraph.`;
    }

    private parsedChoices(response: ChatCompletionResponseMessage | undefined): ParsedChoicesResponse {
        if (response === undefined) {
            throw new Error("No response from OpenAI");
        }

        const message = response.content;

        const choicesRegex = new RegExp("\\d:\\s*(.*?)\\s*(?=\\n|$)", "g");

        const matches = Array.from(message.matchAll(choicesRegex));

        if (matches.length === 0) {
            return { originalMessage: message, updatedMessage: message, choices: [] };
        }

        const originalMessage = message;
        const updatedMessage = message.replace(choicesRegex, "").trim();

        const choices = matches.map((match, index) => {
            const id = index + 1;
            const text = match[1];
            return { id, text };
        });

        return { originalMessage, updatedMessage, choices };
    }

    async buildMessages(message: ChatCompletionRequestMessage) {
        const systemMessage = this.buildSystemMessage();

        const formattingInstructions = this.addFormattingInstructions();

        const finalMessageContent = `${formattingInstructions}

        ${message.content}`;

        message.content = finalMessageContent;

        const messages = [systemMessage, message];

        const completion = await this.getChatCompletion(messages);
        const returnMessages = completion.choices[0].message;

        if (returnMessages) {
            this.storeMessage(returnMessages);
        } else {
            throw new Error("Couldn't store message, No response from OpenAI");
        }
    }

    storeMessage(message: ChatCompletionResponseMessage): void {
        const parsedMessage = this.parsedChoices(message);

        const currentMessage = useMessagesStore.getState().currentMessage;

        const messageData: UIMessage = {
            message: {
                content: parsedMessage.updatedMessage.split("\n"),
                step: currentMessage.message.step + 1,
            },
            choices: parsedMessage.choices,
        };

        useMessagesStore.getState().addMessage(messageData);
    }

    private async getChatCompletion(
        messages: ChatCompletionRequestMessage[],
    ): Promise<CreateChatCompletionResponse> {
        try {
            const configuration = new Configuration({
                apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            });

            console.log(JSON.stringify(configuration, null, 2))

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
}
