import { create } from "zustand";
import { CharacterSheet, update_character } from "../lib";
import { seraphina_character_sheet } from "../lib/characters/seraphina";

interface CharacterStore {
    character: CharacterSheet;
    setCharacter: (character: CharacterSheet) => void;
}

const useCharacterStore = create<CharacterStore>()((set) => ({
    character: seraphina_character_sheet,
    setCharacter: (character) => {
        const updatedCharacter = update_character(character);
        return set({ character: updatedCharacter });
    }
}));
export default useCharacterStore;
