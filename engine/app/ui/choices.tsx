'use client'
import { useState } from "react";
import { BuildPromptProperties, createDecisionPoint } from "../prompt";
import clsx from "clsx";
import { scenario } from "../game/action";
import { slugify } from "@/app/lib/slugify"
import { ThickArrowRightIcon } from "@radix-ui/react-icons";

interface ChoiceProps {
    promptProperties: BuildPromptProperties;
    choice: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    picked: string;
    disable: boolean;
}

interface ChoicesProps {
    promptProperties: BuildPromptProperties;
    choices: string[];
}

export default function Choices(props: ChoicesProps) {
    const Scenario = new scenario()
    const [choicePicked, setChoicePicked] = useState('');
    const [choicesComplete, setChoicesComplete] = useState(false);

    const { promptProperties, choices } = props;

    const Choice = ({
        promptProperties,
        choice,
        picked,
        disable,
    }: ChoiceProps) => {
        const slug = slugify(choice);
        const isPicked = picked === slug;

        const buttonStyle = clsx(
            isPicked
                ? "border-white/80"
                : disable
                    ? "text-white/50 cursor-not-allowed"
                    : "text-white hover:border-white/40 cursor-pointer",
            'border border-transparent px-2 py-1 text-sm',
            // Sets the text to be the same height as the icon
            'text-iconHeight',
            'flex items-center gap-2'
        )

        const updateChoice = choice
        promptProperties.choice = updateChoice
        const prompt = createDecisionPoint(promptProperties)

        if (isPicked) {
            Scenario.createNewStep()
        }

        return (
            <button type="button"
                className={buttonStyle}
                onClick={(event) => {
                    event.preventDefault();
                    Scenario.getResponseMessage(prompt);
                    setChoicePicked(slug);
                    setChoicesComplete(true);
                }}
                disabled={disable}
            >
                <ThickArrowRightIcon
                    className={clsx(
                        isPicked ? "text-white" : "text-white/10"
                    )}
                />
                <span>{choice}</span>
            </button>
        )
    }

    return (
        <ol className="my-4 p-0 -ml-2 not-prose flex flex-col">
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
