import { Suspense } from "react";
import { Prompt, TEST_MESSAGE } from "../lib/openai";
import { Step } from "../ui/step";

async function Home() {
    const prompt = new Prompt();

    const message = await prompt.buildMessages(TEST_MESSAGE)

    if (!message) {
        throw new Error("No message");
    }

    const content = await prompt.useMessages([message]);

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Step stepContent={content} />
            </Suspense>
        </div>
    );
}

export default Home;
