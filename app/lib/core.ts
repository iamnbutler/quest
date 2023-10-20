export const skill = {
  athletics: "Athletics",
  acrobatics: "Acrobatics",
  sleight_of_hand: "Sleight of Hand",
  stealth: "Stealth",
  arcana: "Arcana",
  history: "History",
  investigation: "Investigation",
  nature: "Nature",
  religion: "Religion",
  animal_handling: "Animal Handling",
  insight: "Insight",
  medicine: "Medicine",
  perception: "Perception",
  survival: "Survival",
  deception: "Deception",
  intimidation: "Intimidation",
  performance: "Performance",
  persuasion: "Persuasion",
} as const;

export const ability = {
  strength: "Strength",
  dexterity: "Dexterity",
  constitution: "Constitution",
  intelligence: "Intelligence",
  wisdom: "Wisdom",
  charisma: "Charisma",
} as const;

export const skills = {
  athletics: {
    skill: skill.athletics,
    ability: ability.strength,
  },
  acrobatics: {
    skill: skill.acrobatics,
    ability: ability.dexterity,
  },
  sleight_of_hand: {
    skill: skill.sleight_of_hand,
    ability: ability.dexterity,
  },
  stealth: {
    skill: skill.stealth,
    ability: ability.dexterity,
  },
  arcana: {
    skill: skill.arcana,
    ability: ability.intelligence,
  },
  history: {
    skill: skill.history,
    ability: ability.intelligence,
  },
  investigation: {
    skill: skill.investigation,
    ability: ability.intelligence,
  },
  nature: {
    skill: skill.nature,
    ability: ability.intelligence,
  },
  religion: {
    skill: skill.religion,
    ability: ability.intelligence,
  },
  animal_handling: {
    skill: skill.animal_handling,
    ability: ability.wisdom,
  },
  insight: {
    skill: skill.insight,
    ability: ability.wisdom,
  },
  medicine: {
    skill: skill.medicine,
    ability: ability.wisdom,
  },
  perception: {
    skill: skill.perception,
    ability: ability.wisdom,
  },
  survival: {
    skill: skill.survival,
    ability: ability.wisdom,
  },
  deception: {
    skill: skill.deception,
    ability: ability.charisma,
  },
  intimidation: {
    skill: skill.intimidation,
    ability: ability.charisma,
  },
  performance: {
    skill: skill.performance,
    ability: ability.charisma,
  },
  persuasion: {
    skill: skill.persuasion,
    ability: ability.charisma,
  },
};

export type Skill = (typeof skill)[keyof typeof skill];
export type Ability = (typeof ability)[keyof typeof ability];

export type Choice = {
  id: number;
  text: string;
  skill_check?: string;
};
