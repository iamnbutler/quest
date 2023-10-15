'use client';
import { Step } from "../ui/step";
import { useMessagesStore } from "../stores/messages";
import { Suspense } from "react";

function Home() {
    const messages = useMessagesStore((state) => state.messages);
    return (
        <div className="flex flex-col gap-4">
            {messages.map((message, ix) => (
                <Suspense fallback={<div>Loading...</div>} key={`${ix}-step`}>
                    <Step index={ix} stepContent={message} />
                </Suspense>))}
        </div>
    );
}

export default Home;

// <Typewriter
//   onFinished={() => setShowContinue(true)}
//   speed={10}
//   text="In the land of Atheria, once a powerful and prosperous kingdom, ruin and despair now reign. Magic, the kingdom's former backbone, has dwindled into a scarce and dangerous resource. The arcane arts, previously revered, are now feared and strictly regulated by a royal guild known as the Silver Hand. Established by the king to investigate the cause of Atheria's downfall, the guild is determined to restore the kingdom to its former glory."
// />
