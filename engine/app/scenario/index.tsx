'use client'
import { useState } from "react"
import Typewriter from "react-ts-typewriter"
import { scenario } from "../game/action"
import { PromptContext } from "../prompt";

export interface DecisionWithContext extends Omit<PromptContext, 'choice'> {
    text: string
    actions: string[]
}

function decisionWithContext({ text, context, actions, party_members }: DecisionWithContext) {
    const Scenario = new scenario()
    const [showChoices, setShowChoices] = useState(false)

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
                <Scenario.InitialChoices context={context} actions={actions} party_members={party_members} />
            )}
        </section>
    )
}

export {
    decisionWithContext
}
