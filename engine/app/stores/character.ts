import { create } from "zustand";
import { CharacterSheet, new_character_sheet } from "../lib";

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
    setCharacter: (character) => set({ character })
}));

export default useCharacterStore;
