import { create } from "zustand";
import { CharacterSheet, update_character, new_character_sheet } from "../lib";

interface CharacterStore {
    character: CharacterSheet;
    setCharacter: (character: CharacterSheet) => void;
}

const initialCharacter = new_character_sheet(
    "Bilbo",
    "Baggins",
    "Halfling",
    [{ name: "Fighter", level: 1 }]
)

const useCharacterStore = create<CharacterStore>()((set) => ({
    character: initialCharacter,
    setCharacter: (character) => {
        const updatedCharacter = update_character(character);
        return set({ character: updatedCharacter });
    }
}));
export default useCharacterStore;
