// Ref: https://www.dndbeyond.com/characters/95659495

import * as def from "./defs";

export type Lineage = keyof typeof def.lineages;
export type ClassName = keyof typeof def.class_details;
export type Subclasses = {
  [K in ClassName]: keyof (typeof def.class_details)[K]["subclasses"];
};
export type Subclass = Subclasses[ClassName];
export type Background = keyof typeof def.backgrounds;

const typedObjectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};

export const allLineages = typedObjectKeys(def.lineages);
export const allClasses = typedObjectKeys(def.class_details);
export const allBackgrounds = typedObjectKeys(def.backgrounds);

export const randomLineage = (): Lineage => {
  const keys = Object.keys(def.lineages);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index] as Lineage;
};

export type Skill = {
  name: string;
  ability: string;
  proficient?: boolean;
  source?: string;
};

type CharacterClass = {
  name: ClassName;
  subclass?: Subclass;
  level: number;
};

type CharacterClasses = Array<CharacterClass>;

type AbilityScore = {
  total: number;
  relative: number;
};

type AbilityScores = {
  strength: AbilityScore;
  dexterity: AbilityScore;
  constitution: AbilityScore;
  intelligence: AbilityScore;
  wisdom: AbilityScore;
  charisma: AbilityScore;
};

export type CharacterSheet = {
  name: string;
  given_names: Array<string>;
  family_name: string;
  lineage: Lineage;
  background: Background;
  classes: CharacterClasses;
  level: number;
  backstory?: string;
  ability_scores: AbilityScores;
  skills: Array<Skill>;
};

export const character_name = (
  givenNames: string | string[],
  familyName: string,
): string => {
  const names = Array.isArray(givenNames) ? givenNames.join(" ") : givenNames;
  return `${names} ${familyName}`;
};

/** Any fields that rely on other fields to update their values should be calculated here */
export const update_character = (character: CharacterSheet): CharacterSheet => {
  const { given_names, family_name } = character;
  const name = character_name(given_names, family_name);
  return {
    ...character,
    name,
  };
};

export const new_character_sheet = (
  givenNames: string | string[],
  family_name: string,
  lineage: Lineage,
  background: Background,
  classes: CharacterClasses,
): CharacterSheet => {
  const name = character_name(givenNames, family_name);

  return {
    name,
    given_names: Array.isArray(givenNames) ? givenNames : [givenNames],
    family_name,
    lineage,
    background,
    classes,
    level: 1,
    ability_scores: {
      strength: { total: 15, relative: 2 },
      dexterity: { total: 14, relative: 2 },
      constitution: { total: 13, relative: 1 },
      intelligence: { total: 12, relative: 1 },
      wisdom: { total: 10, relative: 0 },
      charisma: { total: 8, relative: -1 },
    },
    skills: [],
  };
};
