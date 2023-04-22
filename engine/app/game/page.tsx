'use client';

import InitialScenario from "../scenario/initial";
import useMessageStore from "@stores/messages";

export default function Home() {
    const messages = useMessageStore((state) => state.responses);

    return (
        <>
            <InitialScenario />
            <p>{messages.length}</p>
        </>
    );
}
