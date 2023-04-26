import { create } from "zustand";

const INITIAL_MESSAGE: UIMessage = {
    message: {
        content: [
            "You are Seraphina, a young trainee in your second year at the Mage's Guild. Your family worked hard to get you into the guild, and you are determined to make them proud on your way to becoming a Paladin. You have always excelled at the phsyical, like combat training and sports, but magic didn't come as freely.",
            "Recently you started meeting up with Layla, a fellow mage a few years ahead of you. Layla is wicked smart, absent minded, hard working and inspirational. She offered to tutor you on the side in topics like Astrology and Alchemy. She seems to have a soft spot for students who struggle with the magical.",
            `You arrive at Layla's room. You knock on the door and wait for her to answer. You hear a muffled voice from inside, "Come in!" You open the door and see Layla sitting at her desk, surrounded by books and papers. She looks up at you and smiles, "Hey Seraphina! I'm glad you could make it. I have a few things I want to go over with you today..."`,
            "After your lesson you collect your things and get ready to go. You need to decide what to do next."
        ],
        step: 1
    },
    choices: [
        {
            id: 1,
            text: "Ask Layla to go on a picnic with you in the woods nearby for lunch.",
        },
        {
            id: 2,
            text: "Go pick up a quest from the guild board to practice what you learned today.",
        },
        {
            id: 3,
            text: "Go get a quest and invite Layla to come with you.",
        },
        {
            id: 4,
            text: "Go explore the guild",
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
