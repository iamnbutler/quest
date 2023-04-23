'use client';

import React from 'react';
import { decisionWithContext } from "../scenario";
import useMessageStore from "@stores/messages";
import useCharacterStore from "../stores/character";
import { ParsedResponseMessage } from "./action";
import { initializeScenario } from "../scenario/initial";

interface RenderedStepProps {
    res: ParsedResponseMessage;
}

function RenderedStep({ res }: RenderedStepProps) {
    const party_members = useCharacterStore((state) => state.party);

    const step = decisionWithContext({
        text: res.message,
        context: res.originalMessage,
        party_members
    });

    return step;
};

function Home() {
    initializeScenario();
    const currentMessage = useMessageStore((state) => state.currentResponse);

    return (
        <div>
            {currentMessage && <RenderedStep res={currentMessage} />}
        </div>
    );
}

export default Home;
