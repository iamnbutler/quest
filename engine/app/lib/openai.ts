import { ChatCompletionRequestMessage, ChatCompletionResponseMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";
import { useMessagesStore, UIMessage, Choice } from '@stores/messages';

export type ParsedChoicesResponse = {
    originalMessage: string;
    updatedMessage: string;
    choices: Choice[];
};

export const TEST_MESSAGE: ChatCompletionRequestMessage = {
    role: "user",
    content: `In the land of Atheria, once a powerful and prosperous kingdom, ruin and despair now reign. Magic, the kingdom's former backbone, has dwindled into a scarce and dangerous resource. The arcane arts, previously revered, are now feared and strictly regulated by a royal guild known as the Silver Hand. Established by the king to investigate the cause of Atheria's downfall, the guild is determined to restore the kingdom to its former glory.

    You are a young paladin that has recently joined the Silver Hand. You have been tasked with investigating the mysterious disappearance of a young mage named Rowan You start your quest in the village of Sorrow's Reach.`,
}

export const TEST_UI_MESSAGE: UIMessage = {
    message: {
        content: TEST_MESSAGE.content,
        step: 1,
    },
    choices: [
        {
            id: 1,
            text: "Ask around about the missing mage",
        },
        {
            id: 2,
            text: "Visit the local tavern",
        },
        {
            id: 3,
            text: "Consult the journal the guild gave you",
        },
    ],
}

export class Prompt {
    // Create the prompt from all the various pieces like scenario, context, party, etc.
    private buildSystemMessage(): ChatCompletionRequestMessage {
        return {
            role: "system",
            content: "Respond to the prompt the user gives you by continuing the story.",
        }
    }

    private addFormattingInstructions(): string {
        return `Based on the current situation in the story, continue the story for about 140 characeters, then provide 2-5 questions or actions the player can choose from to continue the story. List the options with numbers, followed by a colon, and then the option text.

1: Foo
2: Bar
3: Baz
...

In your reply, add a new line character at the end of each paragraph.`}

    private parsedChoices(response: ChatCompletionResponseMessage | undefined): ParsedChoicesResponse {
        if (response === undefined) {
            throw new Error("No response from OpenAI");
        }

        const message = response.content;

        const choicesRegex = new RegExp('\\d:\\s*(.*?)\\s*(?=\\n|$)', 'g');

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

    // Builds the prompt, sends it to OpenAI, and stores the response in the message store
    async buildMessages(message: ChatCompletionRequestMessage) {
        const systemMessage = this.buildSystemMessage()

        const formattingInstructions = this.addFormattingInstructions()

        const finalMessageContent = `${formattingInstructions}

            ${message.content}`

        message.content = finalMessageContent

        const messages = [
            systemMessage,
            message
        ]

        const completion = await this.getChatCompletion(messages)
        const returnMessages = completion.choices[0].message

        if (returnMessages) {
            this.storeMessage(returnMessages)
        } else {
            throw new Error("Couldn't store message, No response from OpenAI")
        }
    }

    storeMessage(message: ChatCompletionResponseMessage): void {
        const parsedMessage = this.parsedChoices(message);

        const currentMessage = useMessagesStore.getState().currentMessage;

        const messageData: UIMessage = {
            message: {
                content: parsedMessage.updatedMessage,
                step: currentMessage.message.step + 1,
            },
            choices: parsedMessage.choices,
        }

        useMessagesStore.getState().addMessage(messageData)
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
