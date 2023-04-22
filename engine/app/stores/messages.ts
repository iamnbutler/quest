import { create } from "zustand";
import { ParsedResponseMessage } from "../game/action";

export interface Store {
    responses: ParsedResponseMessage[];
    currentResponse: ParsedResponseMessage | null;
    setCurrentResponse: (response: ParsedResponseMessage) => void;
    resetCurrentResponse: () => void;
}

const useMessageStore = create<Store>((set) => ({
    responses: [],
    currentResponse: null,
    setCurrentResponse: (response: ParsedResponseMessage) => {
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
