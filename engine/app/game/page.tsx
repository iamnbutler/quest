import { Prompt, TEST_MESSAGE } from "../lib/openai";
import { Step } from "../ui/step";

async function Home() {
    const prompt = new Prompt();

    const message = await prompt.buildMessages(TEST_MESSAGE)

    return (
        <Step message={message} />
    );
}

export default Home;
