'use client'
import { useState } from "react";
import clsx from "clsx";
import { slugify } from "@/app/lib/slugify"
import { ThickArrowRightIcon } from "@radix-ui/react-icons";
import * as prompt from "../lib/openai";
import { ChatCompletionResponseMessage } from "openai";
import { Choice, UIMessage } from "../stores/messages";
import usePartyStore from "../stores/party";

interface ChoiceProps {
    choice: Choice;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    picked: string;
    disable: boolean;
}

interface ChoicesProps {
    choices: Choice[];
    previousMessages: UIMessage[];
}

export default function Choices(props: ChoicesProps) {
    const [choicePicked, setChoicePicked] = useState('');
    const [choicesComplete, setChoicesComplete] = useState(false);

    const { choices, previousMessages } = props;

    const Choice = ({
        choice,
        picked,
        disable,
    }: ChoiceProps) => {
        const slug = slugify(choice.text);
        const isPicked = picked === slug;

        const buttonStyle = clsx(
            isPicked
                ? "border-white/20"
                : disable
                    ? "text-white/50 cursor-not-allowed"
                    : "text-white hover:border-white/40 cursor-pointer",
            'border border-transparent px-2 py-1 text-sm',
            // Sets the text to be the same height as the icon
            'text-iconHeight',
            'flex gap-2',
            'relative group'
        )

        const choiceMessage: ChatCompletionResponseMessage = {
            role: "user",
            content: `User's choice: ${choice.text}`,
        }

        const currentParty = usePartyStore(state => state.party);

        return (
            <button type="button"
                className={buttonStyle}
                onClick={(event) => {
                    prompt.buildMessages(choiceMessage, previousMessages, currentParty);
                    setChoicePicked(slug);
                    setChoicesComplete(true);
                    event.preventDefault();
                }}
                disabled={disable}
            >
                <ThickArrowRightIcon
                    className={clsx(
                        'absolute -left-6',
                        isPicked
                            ? "text-white"
                            : disable
                                ? "text-white/0"
                                : "text-white/0 group-hover:text-white/70"
                    )}
                />
                <span>{choice.id}.</span>
                {' '}
                <span className="text-left">{choice.text}</span>
                {' '}
            </button>
        )
    }

    return (
        <ol className="my-6 p-0 -ml-2 not-prose flex flex-col">
            {choices
                && choices.map((choice, ix) => (
                    <Choice
                        key={ix}
                        choice={choice}
                        picked={choicePicked}
                        disable={choicesComplete}
                        onClick={() => { }}
                    />
                ))
            }
        </ol>
    );
}
