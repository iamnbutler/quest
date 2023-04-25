import { create } from "zustand";

const INITIAL_MESSAGE: UIMessage = {
    message: {
        content: [
            "In the land of Atheria, once a powerful and prosperous kingdom, ruin and despair now reign.", "Magic, the kingdom's former backbone, has dwindled into a scarce and dangerous resource. The arcane arts, previously revered, are now feared and strictly regulated by a royal guild known as the Silver Hand.", "Established by the king to investigate the cause of Atheria's downfall, the guild is determined to restore the kingdom to its former glory.",
            "You are a young paladin that has recently joined the Silver Hand. You have been tasked with investigating the mysterious disappearance of a young mage named Rowan.", "You start your quest in the village of Sorrow's Reach."
        ],
        step: 1
    },
    choices: [
        {
            id: 1,
            text: "Ask around about the missing mage",
        },
        {
            id: 2,
            text: "Visit the local tavern",
        },
        {
            id: 3,
            text: "Consult the journal the guild gave you",
        },
    ],
};

export type Choice = {
    id: number;
    text: string;
};

export type MessageData = {
    content: string[];
    step: number;
};

export type UIMessage = {
    message: MessageData;
    choices: Choice[];
};

export type MessagesStore = {
    messages: UIMessage[];
    addMessage: (message: UIMessage) => void;
    currentMessage: UIMessage;
    setCurrentMessage: (message: UIMessage) => void;
};

export const useMessagesStore = create<MessagesStore>((set) => ({
    messages: [INITIAL_MESSAGE],
    addMessage: (message: UIMessage) => {
        set((state) => ({
            ...state,
            messages: [...state.messages, message],
        }));
    },
    currentMessage: INITIAL_MESSAGE,
    setCurrentMessage: (message: UIMessage) => {
        set((state) => ({
            ...state,
            currentMessage: message,
        }));
    },
}));
