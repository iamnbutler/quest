'use client';

import { useMessagesStore } from "./stores/messages";

export default function Debug() {
    const currentMessage = useMessagesStore((state) => state.currentMessage);
    const messages = useMessagesStore((state) => state.messages);

    return (
        (
            <section className="mono text-xs text-red-500 w-[540px] border-red-500/50 border overflow-hidden">
                <div className="overflow-x-scroll flex flex-col gap-4">
                    <div>Messages: {messages.length}</div>
                    <pre><code>{JSON.stringify(currentMessage, null, 2)}</code></pre>
                </div>
            </section>
        )
    )
}
