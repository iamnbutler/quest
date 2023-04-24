import { create } from "zustand";

const INITIAL_MESSAGE: MessageData = {
    content: `You walk with your friends Layla, Elias, and Seraphina through the streets of the village on your way to the smith. The sun is high in the sky, and the air is warm and pleasant.

Layla's eyes glimmer with excitement as she mentions her plans for the day. "I've heard rumors of an old abandoned manor on the edge of town. I've had my eye on it for a while. I'm sure there is a wealth of knowledge hidden within its walls. Maybe literally. I'm planning to explore it today, and I'd love for you all to join me."`,
    step: 1
}

export interface MessageData {
    content: string;
    step: number;
}

export interface MessagesStore {
    messages: MessageData[];
    addMessage: (message: MessageData) => void;
    currentMessage: MessageData;
    setCurrentMessage: (message: MessageData) => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
    messages: [INITIAL_MESSAGE],
    addMessage: (message: MessageData) => {
        set((state) => ({
            ...state,
            messages: [...state.messages, message]
        }));
    },
    currentMessage: INITIAL_MESSAGE,
    setCurrentMessage: (message: MessageData) => {
        set((state) => ({
            ...state,
            currentMessage: state.messages[state.messages.length - 1]
        }));
    }
}));
