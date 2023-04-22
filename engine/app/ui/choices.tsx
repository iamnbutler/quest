'use client'
import { useState } from "react";
import { BuildPromptProperties, createDecisionPoint } from "../prompt";
import clsx from "clsx";
import { scenario } from "../game/action";

interface ChoiceProps {
    promptProperties: BuildPromptProperties;
    choice: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    picked: boolean;
    disable: boolean;
}

interface ChoicesProps {
    promptProperties: BuildPromptProperties;
    choices: string[];
}

export default function Choices(props: ChoicesProps) {
    const Scenario = new scenario()
    const [choicePicked, setChoicePicked] = useState(false);
    const [choicesComplete, setChoicesComplete] = useState(false);

    const { promptProperties, choices } = props;

    const Choice = ({
        promptProperties,
        choice,
        picked,
        disable,
    }: ChoiceProps) => {
        const buttonStyle = clsx(
            picked
                ? "text-white"
                : disable
                    ? "text-white/70"
                    : "text-white/30",
            'border border-transparent px-4 py-1 text-sm',
            'hover:border-white/20'
        )

        const updateChoice = choice
        promptProperties.choice = updateChoice
        const prompt = createDecisionPoint(promptProperties)

        return (
            <button type="button"
                className={buttonStyle}
                onClick={(event) => {
                    event.preventDefault();
                    Scenario.getResponseMessage(prompt);
                    setChoicePicked(true);
                    setChoicesComplete(true);
                }}
                disabled={disable}
            >
                {choice}
            </button>
        )
    }

    return (
        <ol>
            {choices.map((choice, ix) => (
                <Choice
                    key={ix}
                    promptProperties={promptProperties}
                    choice={choice}
                    picked={choicePicked}
                    disable={choicesComplete}
                    onClick={() => { }}
                />
            ))}
        </ol>
    );
}
