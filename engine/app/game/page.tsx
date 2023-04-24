'use client';

import { Suspense } from "react";
import { Step } from "../ui/step";
import { useMessagesStore } from "../stores/messages";

function Home() {
    // const prompt = new Prompt();

    // const message = await prompt.buildMessages(TEST_MESSAGE)

    // if (!message) {
    //     throw new Error("No message");
    // }

    // const content = await prompt.useMessages([message]);

    const initialStepMessage = useMessagesStore(state => state.currentMessage);

    return (
        <div className="flex flex-col gap-4">
            <Suspense fallback={<div>Loading...</div>}>
                <Step stepContent={initialStepMessage} />
            </Suspense>
        </div>
    );
}

export default Home;
