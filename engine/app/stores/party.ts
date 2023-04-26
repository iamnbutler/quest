import { create } from "zustand";
import seraphina from "./party/seraphina";
import layla from "./party/layla";

type Trait = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface PersonalityTraits {
    openness: Trait;
    conscientiousness: Trait;
    extraversion: Trait;
    agreeableness: Trait;
    neuroticism: Trait;
    ambition: Trait;
    empathy: Trait;
    creativity: Trait;
    humor: Trait;
    confidence: Trait;
}

interface TalentTraits {
    combat: Trait;
    magic: Trait;
    stealth: Trait;
    thievery: Trait;
    archery: Trait;
    leadership: Trait;
    diplomacy: Trait;
    survival: Trait;
    crafting: Trait;
    knowledge: Trait;
}

type RelationshipType = "friend" | "interested" | "romantic" | "family" | "rival" | "ex-romantic";

interface Relationship {
    name: string;
    type: RelationshipType | RelationshipType[];
}

interface NPC {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    personality: string;
    appearance: string;
    notableCharacter: boolean;
}

interface NotableNPC extends NPC {
    backstory?: string;
    motivations?: string;
    flaws?: string;
    relationships?: Relationship[];
    romanceable: boolean;
}

export interface Companion extends NotableNPC {
    traits?: PersonalityTraits;
    talents?: TalentTraits;
    orientation?: Orientation | Orientation[];
    values?: string;
}

type Orientation =
    | "straight"
    | "gay"
    | "lesbian"
    | "bisexual"
    | "pansexual"
    | "asexual"
    | "demisexual"
    | "queer"
    | "questioning";

export type PartyMember = Companion | NPC | NotableNPC;

export type Party = PartyMember[];

export function formatCharacterAsString(character: PartyMember): string {
    let formattedTraits = "";
    let formattedTalents = "";
    let formattedRelationships = "";

    if ("traits" in character) {
        formattedTraits = Object.entries(character.traits ?? {})
            .map(([traitName, traitValue]) => `${traitName}:${traitValue}`)
            .join(",");
    }

    if ("talents" in character) {
        formattedTalents = Object.entries(character.talents ?? {})
            .map(([talentName, talentValue]) => `${talentName}:${talentValue}`)
            .join(",");
    }

    if ("relationships" in character) {
        formattedRelationships = character.relationships
            ?.map((relationship) => `${relationship.name}:${relationship.type}`)
            .join(",") ?? "";
    }

    const npc = character as NPC;
    const notableNpc = character as NotableNPC;
    const companion = character as Companion;

    return [
        `id:${npc.id ?? ""}`,
        `fullName:${npc.fullName ?? ""}`,
        `firstName:${npc.firstName ?? ""}`,
        `lastName:${npc.lastName ?? ""}`,
        `personality:${npc.personality ?? ""}`,
        `appearance:${npc.appearance ?? ""}`,
        `notableCharacter:${npc.notableCharacter ?? ""}`,
        `backstory:${notableNpc.backstory ?? ""}`,
        `motivations:${notableNpc.motivations ?? ""}`,
        `flaws:${notableNpc.flaws ?? ""}`,
        `relationships:${formattedRelationships}`,
        `romanceable:${notableNpc.romanceable ?? ""}`,
        `traits:${formattedTraits}`,
        `talents:${formattedTalents}`,
        `orientation:${companion.orientation ?? ""}`,
        `values:${companion.values ?? ""}`,
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

const initialParty: Party = [
    seraphina, layla
];

const usePartyStore = create<PartyStore>((set) => ({
    party: initialParty,
    addPartyMember: (member) =>
        set((state) => ({ party: [...state.party, member] })),
    removePartyMember: (member) =>
        set((state) => ({
            party: state.party.filter((m) => m.id !== member.id),
        })),
    sceneParty: initialParty,
    addToSceneParty: (member) =>
        set((state) => ({ sceneParty: [...state.sceneParty, member] })),
    removeFromSceneParty: (member) =>
        set((state) => ({
            sceneParty: state.sceneParty.filter((m) => m.id !== member.id),
        })),
}));

export default usePartyStore;
