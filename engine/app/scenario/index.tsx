'use client'
import { useState } from "react"
import Typewriter from "react-ts-typewriter"
import { BuildPromptProperties, PromptContext } from "../prompt";
import Choices from "../ui/choices";
import useMessageStore from "../stores/messages";

export interface DecisionWithContext extends Omit<PromptContext, 'choice'> {
    text: string
}

function decisionWithContext({ text, context, party_members }: DecisionWithContext) {
    if (!context) {
        throw new Error('Context is required')
    }

    const [showChoices, setShowChoices] = useState(false)

    if (!context) {
        throw new Error('Context is required')
    }

    const choices = useMessageStore(state => state.currentResponse?.choices || [])
    const emptyChoice = ''

    const promptProperties: BuildPromptProperties = {
        context,
        choice: emptyChoice,
        party_members,
    }

    return (
        <section>
            <Typewriter
                text={text}
                speed={8}
                onFinished={() => {
                    setShowChoices(true)
                }}
                cursor={showChoices ? false : true}
            />
            {showChoices && (
                <Choices promptProperties={promptProperties} choices={choices} />
            )}
        </section>
    )
}

export {
    decisionWithContext
}
