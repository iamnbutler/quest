import { Step } from "../ui/step";
import { useMessagesStore } from "../stores/messages";
import { slugify } from "../lib/slugify";

function Home() {
    const messages = useMessagesStore.getState().messages;

    return (
        <div className="flex flex-col gap-4">
            {messages.map(message => (
                <Step key={slugify(message.choices[0].text)} stepContent={message} />
            ))}
        </div>
    );
}

export default Home;
