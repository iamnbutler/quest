import { CharacterSheet } from "..";

export const seraphina_character_sheet: CharacterSheet = {
  name: "Seraphina Grey",
  given_names: ["Seraphina"],
  family_name: "Grey",
  lineage: "Human",
  background: "Noble",
  level: 1,
  backstory:
    "Daughter to the lesser noble house, Seraphina Grey strides down the path of the Paladin, an oath of devotion her guiding light. Her past failures cast long shadows, fueling her drive for improvement and intensifying her pursuit of honor. Strong in mind and heart, she weaves her way through the world, both a knight and a scholar, seeking to outpace her past.",
  classes: [
    {
      name: "Paladin",
      subclass: "Oath of Devotion",
      level: 1,
    },
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
      name: "Athletics",
      ability: "Dexterity",
      proficient: true,
      source: "Paladin Class",
    },
    {
      name: "Insight",
      ability: "Wisdom",
      proficient: true,
      source: "Paladin Class",
    },
    {
      name: "History",
      ability: "Intelligence",
      proficient: true,
      source: "Noble Background",
    },
    {
      name: "Persuasion",
      ability: "Wisdom",
      proficient: true,
      source: "Noble Background",
    },
    {
      name: "Perception",
      ability: "Charisma",
      proficient: true,
      source: "Human Lineage",
    },
  ],
};
