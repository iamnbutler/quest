'use client'

import { character_name } from "@/app/lib"
import useCharacterStore from "@/app/stores/character"
import { ContextHeader } from "@/app/ui/context-header"

const TableRow = ({ name, value, meta }: { name: string; value: string, meta?: string }) => (
    <tr>
        <td>{name}</td>
        <td>{value} <span className="text-white/50">{meta}</span></td>
    </tr>
)

export default function Page() {
    const { character } = useCharacterStore()

    const {
        given_names,
        family_name,
        lineage,
        classes,
        level,
        skills,
        ability_scores
    } = character

    const { strength, dexterity, constitution, intelligence, wisdom, charisma } = ability_scores

    const className = classes[0].name
    const subclass = classes[0].subclass
    const characterName = character_name(given_names, family_name)

    return (
        <div className="flex flex-col gap-4">
            <ContextHeader title="Character Sheet" subtitle={""} />
            <div>
                <h3>{characterName}</h3>
                <p>{`Level ${level} ${lineage}`}</p>
                <p>{`${subclass} ${className}`}</p>
            </div>
            <div className="w-full">
                <table className="table-fixed w-full">
                    <TableRow name="Strength" value={`${strength.total}`} meta={`(${strength.relative >= 0 ? "+" : ""}${strength.relative})`} />
                    <TableRow name="Dexterity" value={`${dexterity.total}`} meta={`(${dexterity.relative >= 0 ? "+" : ""}${dexterity.relative})`} />
                    <TableRow name="Constitution" value={`${constitution.total}`} meta={`(${constitution.relative >= 0 ? "+" : ""}${constitution.relative})`} />
                    <TableRow name="Intelligence" value={`${intelligence.total}`} meta={`(${intelligence.relative >= 0 ? "+" : ""}${intelligence.relative})`} />
                    <TableRow name="Wisdom" value={`${wisdom.total}`} meta={`(${wisdom.relative >= 0 ? "+" : ""}${wisdom.relative})`} />
                    <TableRow name="Charisma" value={`${charisma.total}`} meta={`(${charisma.relative >= 0 ? "+" : ""}${charisma.relative})`} />
                </table>
            </div>
            <ContextHeader title="Skills" subtitle={""} />
            <div>
                <table className="table-fixed w-full">
                    {skills.map(skill => (
                        <TableRow
                            key={skill.name}
                            name={skill.name} value={skill.source ? "" : "N/A"} meta={skill.source ? skill.source : ""} />
                    ))}
                </table>
            </div>
        </div>
    )
}
