'use client'
import { useState } from "react"
import Typewriter from "react-ts-typewriter"
import { scenario } from "../game/action"
import { PromptContext } from "../prompt";
import Choices from "../ui/choices";

export interface DecisionWithContext extends Omit<PromptContext, 'choice'> {
    text: string
    actions: string[]
}

function decisionWithContext({ text, context, actions, party_members }: DecisionWithContext) {
    const Scenario = new scenario()

    if (!context) {
        throw new Error('Context is required')
    }

    const choices = Scenario.choices({ context, actions, party_members })

    // TODO: Set this to false when not debugging
    const [showChoices, setShowChoices] = useState(true)

    if (!context) {
        throw new Error('Context is required')
    }

    return (
        <section>
            <Typewriter
                text={text}
                onFinished={() => {
                    setShowChoices(true)
                }}
            />
            {showChoices && (
                <Choices
                    choices={choices}
                />)}
        </section>
    )
}

export {
    decisionWithContext
}
