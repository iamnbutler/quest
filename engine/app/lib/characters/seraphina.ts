import { CharacterSheet } from "..";

export const seraphina_character_sheet: CharacterSheet = {
    name: 'Seraphina Grey',
    given_names: ['Seraphina'],
    family_name: 'Grey',
    lineage: 'Human',
    background: 'Noble',
    level: 1,
    classes: [
        {
            name: 'Paladin',
            subclass: 'oath_of_devotion',
            level: 1,
        }
    ],
    ability_scores: {
        strength: { total: 14, relative: 2 },
        dexterity: { total: 12, relative: 1 },
        constitution: { total: 13, relative: 1 },
        intelligence: { total: 14, relative: 2 },
        wisdom: { total: 10, relative: 0 },
        charisma: { total: 15, relative: 2 },
    },
    skills: [
        {
            name: 'Athletics',
            ability: "Dexterity",
            proficient: true,
        },
        {
            name: 'Insight',
            ability: "Wisdom",
            proficient: true,
        },
        {
            name: 'History',
            ability: "Intelligence",
            proficient: true,
        },
        {
            name: 'Persuasion',
            ability: "Charisma",
            proficient: true,
        },
        {
            name: 'Perception',
            ability: "Charisma",
            proficient: true
        }
    ]
}
