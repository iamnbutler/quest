import * as prompts from "../prompt";
import { ChatCompletionResponseMessage } from "openai";
import { Prompt } from "../prompt";
import useMessageStore, { Store } from "../stores/messages";

export interface ChoiceProps {
    context: string;
    choice: string;
    party_members: string;
}

interface ChoicesProps {
    context: string;
    actions: string[];
    party_members: string;
}

export interface ParsedResponseMessage {
    originalMessage: string;
    message: string;
    choices: string[];
}

class scenario {
    async getResponseMessage(prompt: Prompt) {
        const result = await this.getMessages(prompt);

        const parsedResponse = this.parseResponseMessage(result);
        useMessageStore.setState((state: Store) => ({
            ...state,
            currentResponse: parsedResponse,
            responses: [...state.responses, parsedResponse],
        }));
    }

    parseResponseMessage(message: ChatCompletionResponseMessage): ParsedResponseMessage {
        const choiceDelimiter = /$$$(.*)/s;
        const match = message.content.match(choiceDelimiter);

        if (match) {
            const blockContent = match[1];
            const lines = blockContent.split("\n");
            const nonEmptyLines = lines.filter((line) => line.trim() !== "");
            const choiceLines = nonEmptyLines.map((line) =>
                line.replace(/^\d+\.\s/, "")
            );
            return {
                originalMessage: message.content,
                message: message.content.replace(choiceDelimiter, "").trim(),
                choices: choiceLines,
            };
        } else if (message.content) {
            return {
                originalMessage: message.content,
                message: "",
                choices: [],
            };
        } else {
            console.log('Message without content')
            return {
                originalMessage: "",
                message: "",
                choices: [],
            }
        }
    }

    async getMessages(prompt: Prompt) {
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: prompt }),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw (
                    (data.error as string) ||
                    new Error(`scenario.getMessages: Request failed with status ${response.status}`)
                );
            }

            return data.result;
        } catch (error) {
            console.error(error);
            throw (error as string) || new Error("scenario.getMessages: Something went wrong");
        }
    }

    createChoice(props: ChoiceProps) {
        const { context, choice, party_members } = props;
        const prompt = prompts.createDecisionPoint({
            context,
            choice,
            party_members,
        });

        return (
            <button type="button" onClick={(event) => {
                event.preventDefault();
                this.getResponseMessage(prompt);
            }}>
                {choice}
            </button>
        );
    }

    getChoiceProps(props: ChoicesProps) {
        const { context, actions, party_members } = props;
        const choiceProps = actions.map((choice) => ({
            context,
            choice,
            party_members,
        }));

        return choiceProps;
    }

    choices(props: ChoicesProps) {
        const { context, actions, party_members } = props;
        const choices = actions.map((choice) => this.createChoice({
            context,
            choice,
            party_members,
        }));

        return choices;
    }
}

export { scenario }
