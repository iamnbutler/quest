'use client'
import { useState } from "react";
import clsx from "clsx";
import { slugify } from "@/app/lib/slugify"
import { ThickArrowLeftIcon, ThickArrowRightIcon } from "@radix-ui/react-icons";
import { Prompt } from "../lib/openai";
import { ChatCompletionResponseMessage } from "openai";
import { Choice } from "../stores/messages";

interface ChoiceProps {
    choice: Choice;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    picked: string;
    disable: boolean;
}

interface ChoicesProps {
    choices: Choice[];
}

export default function Choices(props: ChoicesProps) {
    const [choicePicked, setChoicePicked] = useState('');
    const [choicesComplete, setChoicesComplete] = useState(false);

    const prompt = new Prompt()

    const { choices } = props;

    const Choice = ({
        choice,
        picked,
        disable,
    }: ChoiceProps) => {
        const slug = slugify(choice.text);
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
            'flex items-center gap-2',
            'relative group'
        )

        const choiceMessage: ChatCompletionResponseMessage = {
            role: "user",
            content: `User's choice: ${choice}`,
        }

        return (
            <button type="button"
                className={buttonStyle}
                onClick={(event) => {
                    event.preventDefault();
                    prompt.buildMessages(choiceMessage)
                    setChoicePicked(slug);
                    setChoicesComplete(true);
                }}
                disabled={disable}
            >
                <ThickArrowRightIcon
                    className={clsx(
                        'absolute -left-6',
                        isPicked ? "text-white" : "text-white/0 group-hover:text-white/70"
                    )}
                />
                <span>{choice.id}.</span>
                {' '}
                <span>{choice.text}</span>
                {' '}
            </button>
        )
    }

    return (
        <ol className="my-4 p-0 -ml-2 not-prose flex flex-col">
            {choices.map((choice, ix) => (
                <Choice
                    key={ix}
                    choice={choice}
                    picked={choicePicked}
                    disable={choicesComplete}
                    onClick={() => { }}
                />
            ))}
        </ol>
    );
}
