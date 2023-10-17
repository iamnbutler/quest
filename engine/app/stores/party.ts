import { create } from "zustand";
import { CharacterSheet as PartyMember } from "../lib";

export type Party = PartyMember[];

export function formatCharacterAsString(character: PartyMember): string {
    let formattedClasses = character.classes
        .map((classInfo) => `${classInfo.name}(${classInfo.level})`)
        .join(", ");
    let formattedSkills = character.skills
        .map((skill) => `${skill.name}:${skill.ability}`)
        .join(", ");

    return [
        `name:${character.name}`,
        `family_name:${character.family_name}`,
        `lineage:${character.lineage}`,
        `background:${character.background}`,
        `level:${character.level}`,
        `classes:${formattedClasses}`,
        `skills:${formattedSkills}`,
    ].join(",");
}

interface PartyStore {
    party: Party;
    addPartyMember: (member: PartyMember) => void;
    removePartyMember: (member: PartyMember) => void;
    sceneParty: Party;
    addToSceneParty: (member: PartyMember) => void;
    removeFromSceneParty: (member: PartyMember) => void;
}

const initialParty: Party = [];

const usePartyStore = create<PartyStore>((set) => ({
    party: initialParty,
    addPartyMember: (member) =>
        set((state) => ({ party: [...state.party, member] })),
    removePartyMember: (member) =>
        set((state) => ({
            party: state.party.filter((m) => m.name !== member.name),
        })),
    sceneParty: initialParty,
    addToSceneParty: (member) =>
        set((state) => ({ sceneParty: [...state.sceneParty, member] })),
    removeFromSceneParty: (member) =>
        set((state) => ({
            sceneParty: state.sceneParty.filter((m) => m.name !== member.name),
        })),
}));

export default usePartyStore;
