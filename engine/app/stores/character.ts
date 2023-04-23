import { create } from "zustand";

const INITIAL_PARTY_MEMBERS = `
- Player
    - Apprentice to Master Rowan
    - Friends: Elias, Layla, Seraphina
    - Learns combat with Seraphina, Gareth
    - Bond with Gareth like family`;

export interface CharacterStore {
    party: string;
    addToParty: (character: string) => void;
}

const useCharacterStore = create<CharacterStore>((set) => ({
    party: INITIAL_PARTY_MEMBERS,
    addToParty: (character: string) => {
        set((state) => ({
            ...state,
            party: `${state.party}
            ${character}`
        }));
    }
}));

export default useCharacterStore;
