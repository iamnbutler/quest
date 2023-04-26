import { create } from "zustand";

const INITIAL_MESSAGE: UIMessage = {
    message: {
        content: [
            "You are Seraphina, a young mage in your second year at the Mage's Guild. Your family worked hard to get you into the guild, and you are determined to make them proud. You have always excelled at the phsyical, like combat training and sports, but magic didn't come as freely.",
            "Recently you started meeting up with Layla, a fellow mage a few years ahead of you. She offered to tutor you on the side in topics like Astrology and Alchemy. She seems to have a soft spot for students who struggle with the magical, and you are no exception.",
            "She is a bit of a loner, but she is wicked smart, absent minded and super feminine. She ticks all your boxes immediately, and you instantly have a crush on her.",
            "You don't know if she likes women, but you build up the courage to ask her out anyway.",
        ],
        step: 1
    },
    choices: [
        {
            id: 1,
            text: "Ask Layla to go on a picnic with you in the woods",
        },
        {
            id: 2,
            text: "Suggest going on a quest together",
        },
        {
            id: 3,
            text: "Invite Layla to go to the tavern with you",
        },
        {
            id: 4,
            text: "Invite Layla to go to hot springs with you",
        },
        {
            id: 5,
            text: "Ask around the guild to learn more about Layla.",
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
