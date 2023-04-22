import { useState } from "react";
import * as prompts from "../prompt";
import { ChatCompletionResponseMessage } from "openai";
import { Prompt } from "../prompt";

interface ActionsProps {
    context: string;
    actions: string[];
    party_members: string;
}

interface ParsedResponseMessage {
    originalMessage: string;
    matchedLines: string[];
}

class scenario {
    private parseResponseMessage(message: ChatCompletionResponseMessage): ParsedResponseMessage {
        const blockPattern = /$$$(.*)/s;
        const match = message.content.match(blockPattern);

        if (match) {
            const blockContent = match[1];
            const lines = blockContent.split('\n');
            const nonEmptyLines = lines.filter(line => line.trim() !== '');
            const filteredLines = nonEmptyLines.map(line => line.replace(/^\d+\.\s/, ''));
            return {
                originalMessage: message.content.replace(blockPattern, '').trim(),
                matchedLines: filteredLines
            };
        } else {
            return {
                originalMessage: message.content,
                matchedLines: []
            };
        }
    }

    async getResponseMessage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, prompt: Prompt) {
        const [result, setResult] = useState<ChatCompletionResponseMessage | undefined>();
        event.preventDefault();

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw (
                    (data.error as string) ||
                    new Error(`Request failed with status ${response.status}`)
                );
            }

            setResult(data.result);

        } catch (error) {
            console.error(error);
            throw (error as string) || new Error("Something went wrong");
        }

        return result;
    }

    InitialChoices({ context, actions, party_members }: ActionsProps) {
        const prompt = (choice: string) => prompts.createDecisionPoint({
            context,
            choice,
            party_members,
        });

        const choices = actions.map((choice, index) => (
            <li key={index}>
                <button type="button" onClick={(event) => this.getResponseMessage(event, prompt(choice))}>
                    {choice}
                </button>
            </li>
        ));

        return (
            <ol>
                {choices}
            </ol>
        );
    }

    choices({ context, actions, party_members }: ActionsProps) {
        const prompt = (choice: string) => prompts.createDecisionPoint({
            context,
            choice,
            party_members,
        });

        const choices = actions.map((choice, index) => (
            <li key={index}>
                <button type="button" onClick={(event) => this.getResponseMessage(event, prompt(choice))}>
                    {choice}
                </button>
            </li>
        ));

        return (
            <ol>
                {choices}
            </ol>
        );
    }

    Actions({ context, actions, party_members }: ActionsProps) {
        return (
            <>
                {this.choices({ context, actions, party_members })}
            </>
        );
    }
}

export { scenario }
