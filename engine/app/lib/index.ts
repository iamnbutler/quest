import * as def from './defs'

type Lineage = keyof typeof def.lineages;
export type ClassName = keyof typeof def.class_details
export type Subclasses = { [K in ClassName]: keyof typeof def.class_details[K]['subclasses'] };
export type Subclass = Subclasses[ClassName];

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
    class: CharacterClasses,
    level: number,
}

export const character_name = (givenNames: string | string[], familyName: string): string => {
    const names = Array.isArray(givenNames) ? givenNames.join(' ') : givenNames;
    return `${names} ${familyName}`;
}

export const new_character_sheet = (givenNames: string | string[], family_name: string, lineage: Lineage, classes: CharacterClasses): CharacterSheet => {
    const name = character_name(givenNames, family_name);

    return {
        name,
        given_names: Array.isArray(givenNames) ? givenNames : [givenNames],
        family_name,
        lineage,
        class: classes,
        level: 1
    }
}
