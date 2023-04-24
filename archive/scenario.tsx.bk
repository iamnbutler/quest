import { useState } from "react";
import { ChatCompletionResponseMessage } from "openai";
import useMessageStore, { MessageStore } from "../stores/messages";
import useStatsStore, { StatsStore } from "../stores/stats";

export interface Choice {
    text: string;
}

export interface ParsedResponse {
    originalText: string;
    text: string;
    choices: Choice[];
}

function Scenario() {
    const [stepCount, setStepCount] = useState(0);
    const [responseHistory, setResponseHistory] = useMessageStore((state: MessageStore) => [state.responses, state.setResponses]);
    const [currentResponse, setCurrentResponse] = useMessageStore((state: MessageStore) => [state.currentResponse, state.setCurrentResponse]);

    async function generateResponse(prompt: string) {
        const result = await sendPromptToServer(prompt);
        const parsedResponse = parseResponse(result);
        setCurrentResponse(parsedResponse);
        setResponseHistory([...responseHistory, parsedResponse]);
        setStepCount(stepCount + 1);
        useStatsStore.setState((state: StatsStore) => ({ ...state, steps: state.steps + 1 }));
    }

    async function sendPromptToServer(prompt: string): Promise<ChatCompletionResponseMessage> {
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
                throw (data.error as string) || new Error(`Request failed with status ${response.status}`);
            }

            return data.result;
        } catch (error) {
            console.error(error);
            throw (error as string) || new Error("Something went wrong");
        }
    }

    function parseResponse(response: ChatCompletionResponseMessage): ParsedResponse {
        const choiceDelimiter = /$$$(.*)/s;
        const match = response.content?.match(choiceDelimiter);

        if (match) {
            const blockContent = match[1];
            const lines = blockContent.split("\n");
            const nonEmptyLines = lines.filter((line) => line.trim() !== "");
            const choices = nonEmptyLines.map((line) => ({ text: line.replace(/^\d+\.\s/, "") }));
            return { originalText: response.content, text: response.content?.replace(choiceDelimiter, "").trim() || "", choices };
        } else {
            return { originalText: response.content?.trim() || "", text: response.content?.trim() || "", choices: [] };
        }
    }
}

export default Scenario;
