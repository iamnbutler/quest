import { create } from "zustand";
import { ParsedResponse } from "../scenario/scenario";

export interface MessageStore {
    responses: ParsedResponse[];
    setResponses: (responses: ParsedResponse[]) => void;
    currentResponse: ParsedResponse | null;
    setCurrentResponse: (response: ParsedResponse) => void;
    resetCurrentResponse: () => void;
}

const useMessageStore = create<MessageStore>((set) => ({
    responses: [],
    setResponses: (responses: ParsedResponse[]) => {
        set((state) => ({ ...state, responses }));
    },
    currentResponse: null,
    setCurrentResponse: (response: ParsedResponse) => {
        set((state) => ({
            ...state,
            currentResponse: response,
            responses: [...state.responses, response],
        }));
    },
    resetCurrentResponse: () => {
        set((state) => ({ ...state, currentResponse: null }));
    }
}));

export default useMessageStore;
