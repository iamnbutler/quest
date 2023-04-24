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
                    <Step stepContent={message} />
                </Suspense>))}
        </div>
    );
}

export default Home;
