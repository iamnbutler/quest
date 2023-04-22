import { useState } from "react";
import * as prompts from "../prompt";
import { ChatCompletionResponseMessage } from "openai";

type Action = string;

interface ActionsProps {
    context: string;
    actions: Action[];
    party_members: string;
}

export default function Actions({
    context,
    actions,
    party_members,
}: ActionsProps) {
    const [result, setResult] = useState<ChatCompletionResponseMessage | undefined>();

    async function onSubmit(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        action: Action
    ) {
        event.preventDefault();

        const prompt = prompts.createDecisionPoint({
            context,
            choice: action,
            party_members,
        });

        console.log(JSON.stringify(prompt, null, 2));

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

            console.log(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error(error);
            throw (error as string) || new Error("Something went wrong");
        }
    }

    return (
        <>
            <ol>
                {actions.map((action, index) => (
                    <li key={index}>
                        <button type="button" onClick={(event) => onSubmit(event, action)}>
                            {action}
                        </button>
                    </li>
                ))}
            </ol>
            {result && <p>{result.content}</p>}
        </>
    );
}
