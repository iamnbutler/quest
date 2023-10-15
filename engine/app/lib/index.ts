import * as def from './defs'

export type Lineage = keyof typeof def.lineages;
export type ClassName = keyof typeof def.class_details
export type Subclasses = { [K in ClassName]: keyof typeof def.class_details[K]['subclasses'] };
export type Subclass = Subclasses[ClassName];

export const allLineages = def.lineages;
export const randomLineage = (): Lineage => {
    const keys = Object.keys(def.lineages);
    const index = Math.floor(Math.random() * keys.length);
    return keys[index] as Lineage;
}

type CharacterClass = {
    name: ClassName,
    level: number,
}

type CharacterClasses = Array<CharacterClass>;

export type CharacterSheet = {
    name: string,
    given_names: Array<string>,
    family_name: string,
    lineage: Lineage,
    classes: CharacterClasses,
    level: number,
}

export const character_name = (givenNames: string | string[], familyName: string): string => {
    const names = Array.isArray(givenNames) ? givenNames.join(' ') : givenNames;
    return `${names} ${familyName}`;
}

/** Any fields that rely on other fields to update their values should be calculated here */
export const update_character = (character: CharacterSheet): CharacterSheet => {
    const { given_names, family_name } = character;
    const name = character_name(given_names, family_name);
    return {
        ...character,
        name,
    }
}

export const new_character_sheet = (givenNames: string | string[], family_name: string, lineage: Lineage, classes: CharacterClasses): CharacterSheet => {
    const name = character_name(givenNames, family_name);

    return {
        name,
        given_names: Array.isArray(givenNames) ? givenNames : [givenNames],
        family_name,
        lineage,
        classes,
        level: 1
    }
}
